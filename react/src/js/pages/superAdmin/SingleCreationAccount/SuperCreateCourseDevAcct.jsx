import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
  Fragment,
} from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { data, states } from "../../Admin/makeData";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { isNumber } from "lodash";
import Loading from "../../../components/layouts/Loading";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

const SuperCreateCourseDevAcct = () => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
  // updateList is for rerendering again the getList
  const [updatedList, setUpdatedList] = useState(false);
  const [tableData, setTableData] = useState(getAnnouncement);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(getAnnouncement);

  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "SuperAdmin") {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/listofusers/coursedevelopers`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response);
            setGetAnnouncement(response.data.CourseDeveloper);
            setTableData(
              response.data.CourseDeveloper.sort((a, b) => b.id - a.id)
            );
          });
      }
    };
    GetAnnouncementHandler();
  }, [updatedList]);

  const handleCreateNewRow = (values) => {
    const tablesdataito = tableData.push(values);

    setTableData([...tableData]);
  };

  console.log(tableData);
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (tableData !== undefined) {
      if (!Object.keys(validationErrors).length) {
        const info = (tableData[row.index] = values);
        //send/receive api updates here, then refetch or update local table data for re-render
        let toastId;
        console.log(info.major);
        if (
          info.id == "" ||
          info.first_name == "" ||
          info.last_name == "" ||
          info.year_and_section == "" ||
          info.program == "" ||
          info.department == "" ||
          info.subjects == ""
        ) {
          toast.error("Please fill out the blank area");
        } else {
          setIsLoading(true);
          toastId = toast.info("Sending Request...");

          let majorValue;

          if (info.major === "") {
            majorValue = "";
          } else {
            majorValue = info.major;
          }
          console.log(majorValue);

          const item = {
            id: info.id,
            first_name: info.first_name,
            last_name: info.last_name,
            year_and_section: info.year_and_section,
            program: info.program,
            department: info.department,
            major: majorValue,
          };
          console.log(item);
          console.log(info.id);

          axios
            .patch(
              `${import.meta.env.VITE_API_BASE_URL}/api/core/editstudent/${
                info.id
              }`,
              item,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            )
            .then((response) => {
              console.log(response);
              if (response.status >= 200 && response.status <= 300) {
                // if (response.data.length !== 0) {
                //     toast.update(toastId, {
                //         render: `Student ID is ${response.data[0]}`,
                //         type: toast.TYPE.ERROR,
                //         autoClose: 2000,
                //     });
                // } else {
                toast.update(toastId, {
                  render: "Request Successfully",
                  type: toast.TYPE.SUCCESS,
                  autoClose: 2000,
                });
                // }
                setTableData([...tableData]);
                exitEditingMode(); //required to exit editing mode and close modal
              } else {
                throw new Error(response.status || "Something Went Wrong!");
              }
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              // if (error.response.data.message) {
              //     toast.update(toastId, {
              //         render: `${error.response.data.message}`,
              //         type: toast.TYPE.ERROR,
              //         autoClose: 2000,
              //     });
              // } else {
              toast.update(toastId, {
                render: `${error.message}`,
                type: toast.TYPE.ERROR,
                autoClose: 2000,
              });
              // }
              setIsLoading(false);
            });
        }
      }
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = (row) => {
    if (!confirm(`Are you sure you want to delete ${row.getValue("id")}`)) {
      return;
    }
    let toastId;
    axios
      .delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/core/deleteannouncement/${row.getValue("id")}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        toast.success("Successfully Deleted");
        setUpdatedList(!updatedList);
      });

    //send api delete request here, then refetch or update local table data for re-render
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Course Developer ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        type: "number",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          inputProps: {
            type: "number",
            onKeyPress: (event) => {
              const keyCode = event.which || event.keyCode;
              const keyValue = String.fromCharCode(keyCode);
              if (/[^0-9]/.test(keyValue)) {
                event.preventDefault();
              }
            },
          },
        }),
      },
      {
        accessorKey: "email",
        type: "email",
        header: "Email",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "first_name",
        header: "First Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "department",
        header: "Department",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "subjects",
        header: "Subjects",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        enableEditing: false,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        size: 80,
        enableEditing: false,
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        size: 80,
        enableEditing: false,
      },
    ]
    // [getCommonEditTextFieldProps]
  );

  return (
    <Fragment>
      <ArrowNextAndPrevious>
        <h3 className="m-0">Course Developer Creation of Account</h3>
      </ArrowNextAndPrevious>
      <div className="MaterialUiTable">
        <MaterialReactTable
          className="MaterialReactTable"
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          sortDescFirst
          columns={columns}
          data={tableData}
          editingMode="modal" //default
          enableColumnOrdering
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderTopToolbarCustomActions={() => (
            <Button
              className="smallButtonTemplate"
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create Course Developer Account
            </Button>
          )}
        />

        <CreateNewAccountModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
          setUpdatedList={setUpdatedList}
          updatedList={updatedList}
        />
      </div>
    </Fragment>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  setUpdatedList,
  updatedList,
}) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  const [hasError, setHasError] = useState(false);
  const [hasErrorNumber, setHasErrorNumber] = useState(false);
  const [idAlreadyTaken, setIdAlreadyTaken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { role, token } = useAuth();
  console.log(hasErrorNumber);
  const handleSubmit = async () => {
    //put your validation logic here
    let toastId;
    console.log(values);
    if (
      values == null ||
      values.id == "" ||
      values.first_name == "" ||
      values.last_name == "" ||
      values.department == ""
    ) {
      setHasError(true);
      toast.error("Please fill out the blank area");
    } else if (isNaN(values.id)) {
      setHasErrorNumber(true);
    } else {
      setIsLoading(true);
      onSubmit(values);
      setHasError(false);
      setHasErrorNumber(false);

      let majorValue;

      if (values.major === "") {
        majorValue = null;
      } else {
        majorValue = values.major;
      }
      console.log(majorValue);

      const userInformation = {
        id: values.id,
        first_name: values.first_name,
        last_name: values.last_name,
        department: values.department,
      };

      toastId = toast.info("Sending Request...");
      await axios
        .post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/core/createsinglecoursedeveloper`,
          userInformation,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status >= 200 && response.status <= 300) {
            // if (response.data.length !== 0) {
            //     toast.update(toastId, {
            //         render: `Student ID is ${response.data[0]}`,
            //         type: toast.TYPE.ERROR,
            //         autoClose: 2000,
            //     });
            // } else {
            toast.update(toastId, {
              render: "Request Successfully",
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
            setUpdatedList(!updatedList);
            onClose();
            // }]
            setValues({
              id: "",
              first_name: "",
              last_name: "",
              department: "",
            });
            setIdAlreadyTaken(undefined);
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.errors) {
            // to access the subject itself you can use this : error.response.data.SubjectAlreadyExists[1]
            toast.update(toastId, {
              render: error.response.data.errors.id[0],
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
            setIdAlreadyTaken(error.response.data.errors.id[0]);
          } else {
            toast.update(toastId, {
              render: `${error.message}`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          }
          setIsLoading(false);
        });
    }
  };

  const HelperHandler = (column) => {
    if (values !== undefined && values !== null) {
      if (
        (hasError && values.id == "" && column.accessorKey == "id") ||
        (hasError &&
          values.first_name == "" &&
          column.accessorKey == "first_name") ||
        (hasError &&
          values.last_name == "" &&
          column.accessorKey == "last_name") ||
        (hasError &&
          values.department == "" &&
          column.accessorKey == "department")
      ) {
        return "This field is required";
      } else if (hasErrorNumber && column.accessorKey == "id") {
        return "This field must be Number";
      } else if (idAlreadyTaken !== undefined && column.accessorKey == "id") {
        return idAlreadyTaken;
      } else {
        return <span></span>;
      }
    }
  };

  console.log(idAlreadyTaken);
  return (
    <Dialog open={open} className="DialogModalTable">
      <DialogTitle textAlign="center">
        Create Course Developer Account
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: {
                xs: "300px",
                sm: "360px",
                md: "400px",
              },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                className="myTextField"
                inputProps={{
                  inputMode: "numeric",
                }}
                helperText={HelperHandler(column)}
                disabled={
                  column.accessorKey == "created_at" ||
                  column.accessorKey == "updated_at" ||
                  column.accessorKey == "email" ||
                  column.accessorKey == "subjects"
                    ? true
                    : false
                }
                multiline
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          className="smallButtonTemplate"
          disabled={isLoading}
          color="secondary"
          onClick={handleSubmit}
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateMajor = (major) => major.length;
// const validateEmail = (email) =>
//     !!email.length &&
//     email
//         .toLowerCase()
//         .match(
//             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         );
// const validateAge = (age) => age >= 18 && age <= 50;

export default SuperCreateCourseDevAcct;
