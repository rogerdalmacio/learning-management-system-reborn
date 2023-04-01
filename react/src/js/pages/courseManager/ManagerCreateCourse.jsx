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
import { data, states } from "../Admin/makeData";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { isNumber } from "lodash";
import Loading from "../../components/layouts/Loading";
import ArrowNextAndPrevious from "../../components/layouts/ArrowNextAndPrevious";
import useCourseContent from "../../hooks/CourseContent/useCourseContent";

const ManagerDashboard = () => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);
  const { setCourseUpdate, courseUpdate } = useCourseContent();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
  // updateList is for rerendering again the getList
  const [updatedList, setUpdatedList] = useState(false);
  const [tableData, setTableData] = useState(getAnnouncement);
  const [validationErrors, setValidationErrors] = useState({});
  console.log(getAnnouncement);

  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "CourseManager") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/coursemanager/course`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            // sdfdsfd
            console.log(response);
            const data = response.data.Course;
            const newArray = data.map((item) => ({
              ...item,
              module: item.module.length,
            }));

            console.log(newArray);
            setGetAnnouncement(newArray);
            setTableData(newArray.sort((a, b) => b.id - a.id));
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
  // const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
  //   if (tableData !== undefined) {
  //     if (!Object.keys(validationErrors).length) {
  //       const info = (tableData[row.index] = values);
  //       //send/receive api updates here, then refetch or update local table data for re-render
  //       let toastId;
  //       console.log(info.major);
  //       if (
  //         info.id == "" ||
  //         info.first_name == "" ||
  //         info.last_name == "" ||
  //         info.year_and_section == "" ||
  //         info.program == "" ||
  //         info.department == ""
  //       ) {
  //         toast.error("Please fill out the blank area");
  //       } else {
  //         toastId = toast.info("Sending Request...");

  //         let majorValue;

  //         if (info.major === "") {
  //           majorValue = "";
  //         } else {
  //           majorValue = info.major;
  //         }
  //         console.log(majorValue);

  //         const item = {
  //           id: info.id,
  //           first_name: info.first_name,
  //           last_name: info.last_name,
  //           year_and_section: info.year_and_section,
  //           program: info.program,
  //           department: info.department,
  //           major: majorValue,
  //         };
  //         console.log(item);
  //         console.log(info.id);

  //         axios
  //           .patch(
  //             `${import.meta.env.VITE_API_BASE_URL}/api/core/editstudent/${
  //               info.id
  //             }`,
  //             item,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //                 "Content-Type": "application/json",
  //                 Accept: "application/json",
  //               },
  //             }
  //           )
  //           .then((response) => {
  //             console.log(response);
  //             if (response.status >= 200 && response.status <= 300) {
  //               // if (response.data.length !== 0) {
  //               //     toast.update(toastId, {
  //               //         render: `Student ID is ${response.data[0]}`,
  //               //         type: toast.TYPE.ERROR,
  //               //         autoClose: 2000,
  //               //     });
  //               // } else {
  //               toast.update(toastId, {
  //                 render: "Request Successfully",
  //                 type: toast.TYPE.SUCCESS,
  //                 autoClose: 2000,
  //               });
  //               // }
  //               setTableData([...tableData]);
  //               exitEditingMode(); //required to exit editing mode and close modal
  //             } else {
  //               throw new Error(response.status || "Something Went Wrong!");
  //             }
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //             // if (error.response.data.message) {
  //             //     toast.update(toastId, {
  //             //         render: `${error.response.data.message}`,
  //             //         type: toast.TYPE.ERROR,
  //             //         autoClose: 2000,
  //             //     });
  //             // } else {
  //             toast.update(toastId, {
  //               render: `${error.message}`,
  //               type: toast.TYPE.ERROR,
  //               autoClose: 2000,
  //             });
  //             // }
  //           });
  //       }
  //     }
  //   }
  // };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  // const handleDeleteRow = (row) => {
  //   if (!confirm(`Are you sure you want to delete ${row.getValue("id")}`)) {
  //     return;
  //   }
  //   let toastId;
  //   axios
  //     .delete(
  //       `${
  //         import.meta.env.VITE_API_BASE_URL
  //       }/api/core/deleteannouncement/${row.getValue("id")}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       toast.success("Successfully Deleted");
  //       setUpdatedList(!updatedList);
  //     });

  //   //send api delete request here, then refetch or update local table data for re-render
  // };

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
        header: "Subject ID",
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
        accessorKey: "course",
        header: "Course",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "course_code",
        header: "Course Code",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "module",
        header: "Number of Module",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
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
    ]
    // [getCommonEditTextFieldProps]
  );

  return (
    <Fragment>
      <ArrowNextAndPrevious>
        <h3 className="m-0">Create Subject</h3>
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
          // onEditingRowSave={handleSaveRowEdits}
          // onEditingRowCancel={handleCancelRowEdits}
          renderTopToolbarCustomActions={() => (
            <Button
              className="smallButtonTemplate"
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create Subject +
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
          setCourseUpdate={setCourseUpdate}
          courseUpdate={courseUpdate}
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
  setCourseUpdate,
  courseUpdate,
}) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  const [hasError, setHasError] = useState(false);
  const [hasErrorNumber, setHasErrorNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { role, token, userInfo } = useAuth();
  console.log(hasErrorNumber);
  const handleSubmit = async () => {
    //put your validation logic here
    let toastId;
    console.log(values);
    if (
      values == null ||
      values.course == "" ||
      values.course_code == "" ||
      values.module == "" ||
      values.course === 0 ||
      values.course_code === 0
    ) {
      setHasError(true);
      toast.error("Please fill out the blank area");
    } else if (isNaN(values.module)) {
      setHasErrorNumber(true);
    } else {
      setIsLoading(true);
      onSubmit(values);
      setHasError(false);
      setHasErrorNumber(false);

      const subject = {
        course: values.course,
        course_code: values.course_code,
        approval: 0,
        department: userInfo.department,
        modules: values.module,
      };
      console.log(subject);

      toastId = toast.info("Sending Request...");
      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/coursemanager/course`,
          subject,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          if (
            response.status >= 200 &&
            response.status < 300 &&
            response.data[0] !== "already exist"
          ) {
            toast.update(toastId, {
              render: "Request Successfully",
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
            setUpdatedList(!updatedList);
            setCourseUpdate(!courseUpdate);
            onClose();

            setValues({
              course: "",
              course_code: "",
              module: "",
            });
          } else if (response.data[0] == "already exist") {
            onClose();
            throw new Error("Course is already exists");
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast.update(toastId, {
            render: `${error.message}`,
            type: toast.TYPE.ERROR,
            autoClose: 2000,
          });
          setIsLoading(false);
        });
    }
  };

  const HelperHandler = (column) => {
    console.log(column);
    if (values !== undefined && values !== null) {
      if (
        (hasError && values.course == "" && column.accessorKey == "course") ||
        (hasError &&
          values.course_code == "" &&
          column.accessorKey == "course_code") ||
        (hasError && values.module == "" && column.accessorKey == "module")
      ) {
        return "This field is required";
      } else if (hasErrorNumber && column.accessorKey == "module") {
        return "This field must be Number";
      } else {
        return <span></span>;
      }
    }
  };
  return (
    <Dialog open={open} className="DialogModalTable">
      <DialogTitle textAlign="center">Create Subject</DialogTitle>
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
                  column.accessorKey == "id" ||
                  column.accessorKey == "department" ||
                  column.accessorKey == "created_at"
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

export default ManagerDashboard;
