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
  Typography,
  FormControlLabel,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { data, states } from "./makeData";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "../../components/layouts/Loading";

const AdminAnnouncement = () => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
  // updateList is for rerendering again the getList
  const [updatedList, setUpdatedList] = useState(false);
  const [tableData, setTableData] = useState(getAnnouncement);
  const [validationErrors, setValidationErrors] = useState({});

  console.log(data);
  console.log(getAnnouncement);
  console.log(tableData);
  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "admin") {
        await axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/core/announcements`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response);
            console.log(response.data.Announcement);
            if (
              response.data.Announcement !== undefined ||
              response.data.Announcement.length !== 0
            ) {
              setGetAnnouncement(response.data.Announcement);
              setTableData(
                response.data.Announcement.sort((a, b) => b.id - a.id)
              );
            }
          });
      }
    };
    GetAnnouncementHandler();
  }, [updatedList]);
  console.log(tableData);

  const handleCreateNewRow = (values) => {
    const tablesdataito = tableData.push(values);

    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (tableData !== undefined) {
      if (!Object.keys(validationErrors).length) {
        const info = (tableData[row.index] = values);
        //send/receive api updates here, then refetch or update local table data for re-render
        let toastId;

        if (
          info.title == "" ||
          info.body == "" ||
          info.status == "" ||
          info.title == undefined ||
          info.body == undefined
        ) {
          toast.error("Please fill out the blank area");
        } else {
          toastId = toast.info("Sending Request...");
          const item = {
            embed_link: info.embed_link,
            title: info.title,
            body: info.body,
            status: 1,
          };
          console.log(item);
          console.log(info.id);
          axios
            .patch(
              `${import.meta.env.VITE_API_BASE_URL}/api/core/editannouncement/${
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
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(event.target.value)
              : validateRequired(event.target.value);
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
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "title",
        color: "secondary",
        header: "Title",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "body",
        header: "Body",
        size: 140,

        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "embed_link",
        header: "Embed Link",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        size: 80,
        enableEditing: false,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //     ...getCommonEditTextFieldProps(cell),
        // }),
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        size: 80,
        enableEditing: false,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //     ...getCommonEditTextFieldProps(cell),
        // }),
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
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            className="smallButtonTemplate"
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create Announcement
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
  const { role, token } = useAuth();

  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  console.log(checkedItems);
  console.log(open);

  // clear the checkItems if the modal is close
  useEffect(() => {
    if (open == false) {
      setCheckedItems([]);
    }
  }, [open]);

  const handleChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setCheckedItems((prevState) => ({ ...prevState, [name]: checked }));
    } else {
      const { [name]: omitted, ...rest } = checkedItems;
      setCheckedItems(rest);
    }
  };
  const handleSubmit = () => {
    //put your validation logic here

    let toastId;

    if (
      values == null ||
      values.title == "" ||
      values.body == "" ||
      values.embed_link == "" ||
      values.title == null ||
      values.body == null ||
      values.embed_link == null ||
      values.title == undefined ||
      values.body == undefined ||
      checkedItems.length == 0
    ) {
      setHasError(true);
      toast.error("Please fill out the blank area");
    } else {
      setIsLoading(true);
      onSubmit(values);
      setHasError(false);

      toastId = toast.info("Sending Request...");
      console.log(values);
      const listOfUsers = Object.keys(checkedItems).filter(
        (key) => checkedItems[key]
      );
      console.log(JSON.stringify(listOfUsers));
      const item = {
        embed_link: values.embed_link,
        title: values.title,
        body: values.body,
        tags: "announcement",
        users: JSON.stringify(listOfUsers),
        status: 1,
      };
      console.log(item);

      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/core/createannouncement`,
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
            setUpdatedList(!updatedList);
            onClose();
            // }]
            setValues({
              embed_link: "",
              title: "",
              body: "",
            });
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
  };

  return (
    <Dialog open={open} className="DialogModalTable">
      <DialogTitle textAlign="center">Create New Announcement</DialogTitle>
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
                helperText={
                  (hasError &&
                    values.title == "" &&
                    column.accessorKey == "title") ||
                  (hasError &&
                    values.body == "" &&
                    column.accessorKey == "body") ||
                  (hasError &&
                    values.embed_link == "" &&
                    column.accessorKey == "embed_link")
                    ? "This field is required"
                    : ""
                }
                rows={column.accessorKey == "body" ? 5 : 1}
                disabled={
                  column.accessorKey == "id" ||
                  column.accessorKey == "created_at" ||
                  column.accessorKey == "updated_at" ||
                  column.accessorKey == "status"
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

            <div>
              <Typography
                id="sandwich-group"
                level="body2"
                fontWeight="lg"
                mb={0}
              >
                <span className="d-block fw-semibold text-secondary">
                  List of Users
                </span>
                <span
                  className={`fieldRequiredCheckBoxAnnouncement ${
                    hasError && checkedItems.length == 0 ? "d-block" : "d-none"
                  }`}
                >
                  {hasError && checkedItems.length == 0
                    ? "This field is required"
                    : ""}
                </span>
              </Typography>
              <Box role="group" aria-labelledby="sandwich-group">
                <List size="sm">
                  <ListItem className="p-0">
                    <FormControlLabel
                      className="m-0"
                      control={
                        <Checkbox name="Student" onChange={handleChange} />
                      }
                      label="Student"
                    />
                  </ListItem>
                  <ListItem className="p-0">
                    <FormControlLabel
                      className="m-0"
                      control={
                        <Checkbox name="Teacher" onChange={handleChange} />
                      }
                      label="Teacher"
                    />
                  </ListItem>
                  <ListItem className="p-0">
                    <FormControlLabel
                      className="m-0"
                      control={
                        <Checkbox
                          name="CourseDeveloper"
                          onChange={handleChange}
                        />
                      }
                      label="Course Developer"
                    />
                  </ListItem>
                  <ListItem className="p-0">
                    <FormControlLabel
                      className="m-0"
                      control={
                        <Checkbox
                          name="CourseManager"
                          onChange={handleChange}
                        /> 
                      }
                      label="Course Manager"
                    />
                  </ListItem>
                </List>
              </Box>
              <p className="fw-semibold text-secondary">Checked Users:</p>
              <ul class="list-group list-group-flush">
                {Object.keys(checkedItems).map((item) => (
                  <li class="list-group-item" key={item}>
                    {console.log(item)}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
// const validateEmail = (email) =>
//     !!email.length &&
//     email
//         .toLowerCase()
//         .match(
//             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         );
// const validateAge = (age) => age >= 18 && age <= 50;

export default AdminAnnouncement;

// import React, { Fragment, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import useAuth from "../../hooks/useAuth";
// import AdminAnnouncementModal from "./AdminAnnouncementModal";
// import AdminAnnouncementModalEdit from "./IndividualSubjectTagging/AdminAnnouncementModalEdit";

// function AdminAnnouncement() {
//     const { token, role } = useAuth();

//     const [getAnnouncement, setGetAnnouncement] = useState();

//     const [addAnnouncement, setAddAnnouncement] = useState(false);
//     const [addAnnouncementEdit, setAddAnnouncementEdit] = useState(false);
//     const [announcement, setAnnouncement] = useState({
//         id: "",
//         title: "",
//         body: "",
//         status: true,
//         embed_link: "",
//     });

//     console.log(announcement);

//     useEffect(() => {
//         const GetAnnouncementHandler = async () => {
//             if (role === "admin") {
//                 await axios
//                     .get(
//                         `${
//                             import.meta.env.VITE_API_BASE_URL
//                         }/api/core/announcements`,
//                         {
//                             headers: {
//                                 Authorization: `Bearer ${token}`,
//                                 "Content-Type": "application/json",
//                                 Accept: "application/json",
//                             },
//                         }
//                     )
//                     .then((response) => {
//                         console.log(response);
//                         setGetAnnouncement(response.data.announcements);
//                     });
//             }
//         };
//         GetAnnouncementHandler();
//     }, []);

//     const fetchGetAnnouncement = () => {
//         if (getAnnouncement !== undefined) {
//             return getAnnouncement.map((item) => {
//                 return (
//                     <Fragment>
//                         <tr scope="row">
//                             <th scope="row">{item.id}</th>
//                             <td>
//                                 <span class="text-secondary">{item.title}</span>
//                             </td>
//                             <td>
//                                 <span class="text-secondary">{item.body}</span>
//                             </td>
//                             <td>
//                                 <span class="text-secondary">
//                                     {item.embed_link}
//                                 </span>
//                             </td>
//                             <td>
//                                 <span class="text-secondary">
//                                     {item.created_at}
//                                 </span>
//                             </td>
//                             <td>
//                                 <span class="text-secondary">
//                                     {item.updated_at}
//                                 </span>
//                             </td>
//                             <td>
//                                 <div className="d-flex">
//                                     <button
//                                         className="uploadButton smallButtonTemplate sumbit-button btn rounded-2 mt-3 me-2"
//                                         type="submit"
//                                         onClick={() => {
//                                             setAddAnnouncementEdit(true);
//                                             setAnnouncement({
//                                                 ...announcement,
//                                                 id: item.id,
//                                                 title: item.title,
//                                                 body: item.body,
//                                                 embed_link: item.embed_link,
//                                             });
//                                         }}
//                                     >
//                                         Edit
//                                     </button>
//                                     {addAnnouncementEdit && (
//                                         <AdminAnnouncementModalEdit
//                                             setAddAnnouncementEdit={
//                                                 setAddAnnouncementEdit
//                                             }
//                                             addAnnouncementEdit={
//                                                 addAnnouncementEdit
//                                             }
//                                             id={announcement.id}
//                                             title={announcement.title}
//                                             body={announcement.body}
//                                             embed_link={announcement.embed_link}
//                                         />
//                                     )}
//                                     <button
//                                         className="uploadButton smallButtonTemplateDanger sumbit-button btn rounded-2 mt-3"
//                                         type="submit"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     </Fragment>
//                 );
//             });
//         }
//     };

//     return (
//         <div className="">
//             <div className=" row m-0 px-0">
//                 <h3 className="p-0">Create Announcement</h3>
//                 <div className="col-12 col-sm-7 px-0 mx-0 mx-sm-3">
//                     <button
//                         className="buttonTemplate fs-6 sumbit-button btn px-5"
//                         onClick={() => {
//                             setAddAnnouncement(true);
//                         }}
//                     >
//                         Add Announcement +
//                     </button>
//                     <AdminAnnouncementModal
//                         addAnnouncement={addAnnouncement}
//                         setAddAnnouncement={setAddAnnouncement}
//                     />
//                 </div>
//                 <div class="container table-responsive-xl mt-5">
//                     <table class="table rounded-2 overflow-hidden shadow-sm">
//                         <thead>
//                             <tr class="tableRowHeader  align-top">
//                                 <th scope="col">ID</th>
//                                 <th scope="col">Title</th>
//                                 <th scope="col">Body</th>
//                                 <th scope="col">Embeded Link</th>
//                                 <th scope="col">Created_at</th>
//                                 <th scope="col">Updated_at</th>
//                                 <th scope="col">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody class="tableBodyColor">
//                             {fetchGetAnnouncement()}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AdminAnnouncement;
