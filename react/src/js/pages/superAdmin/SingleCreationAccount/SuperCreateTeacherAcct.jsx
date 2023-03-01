import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
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

const SuperCreateTeacherAcct = () => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
  // updateList is for rerendering again the getList
  const [updatedList, setUpdatedList] = useState(false);
  const [tableData, setTableData] = useState(getAnnouncement);
  const [validationErrors, setValidationErrors] = useState({});
  console.log(getAnnouncement);

  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "SuperAdmin") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/core/superadmin/teachers`,
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
            setGetAnnouncement(response.data.teachers);
            setTableData(response.data.teachers.sort((a, b) => b.id - a.id));
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
        console.log(info.id);
        if (
          info.first_name == "" ||
          info.last_name == "" ||
          info.program == "" ||
          info.department == ""
        ) {
          toast.error("Please fill out the blank area");
        } else {
          toastId = toast.info("Sending Request...");

          const item = {
            id: info.id,
            first_name: info.first_name,
            last_name: info.last_name,
            program: info.program,
            department: info.department,
            year_and_sections: "sdfsdf",
          };
          console.log(item);
          console.log(info.id);

          axios
            .patch(
              `${import.meta.env.VITE_API_BASE_URL}/api/core/editteacher/${
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
            });
        }
      }
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
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
        header: "Teacher ID",
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
        accessorKey: "year_and_sections",
        header: "Year and Section",
        size: 140,
        enableEditing: false, //disable editing on this column

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
        accessorKey: "program",
        header: "Program",
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
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create Teacher Account
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
      values.department == "" ||
      values.program == ""
    ) {
      setHasError(true);
      toast.error("Please fill out the blank area");
    } else if (isNaN(values.id)) {
      setHasErrorNumber(true);
    } else {
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
        program: values.program,
        year_and_sections: "",
      };

      toastId = toast.info("Sending Request...");
      await axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/core/createsingleteacher`,
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
              program: "",
            });
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
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
          } else {
            toast.update(toastId, {
              render: `${error.message}`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          }
        });
    }
  };

  const HelperHandler = (column) => {
    console.log(column);
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
          column.accessorKey == "department") ||
        (hasError && values.program == "" && column.accessorKey == "program")
      ) {
        return "This field is required";
      } else if (hasErrorNumber && column.accessorKey == "id") {
        return "This field must be Number";
      } else {
        return <span></span>;
      }
    }
  };
  return (
    <Dialog open={open} className="DialogModalTable">
      <DialogTitle textAlign="center">Create Teacher Account</DialogTitle>
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
                  column.accessorKey == "year_and_sections"
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
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;

export default SuperCreateTeacherAcct;
