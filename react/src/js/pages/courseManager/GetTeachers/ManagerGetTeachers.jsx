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
import { toast } from "react-toastify";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

const ManagerGetTeachers = ({}) => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
  const [updatedList, setUpdatedList] = useState(false);
  // updateList is for rerendering again the getList
  const [hasError, setHasError] = useState(false);
  const [tableData, setTableData] = useState(getAnnouncement);
  const [validationErrors, setValidationErrors] = useState({});
  console.log(tableData);

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const studentYear = pathArray[3];
  console.log(studentYear);

  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "CourseManager") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/coursemanager/teachers`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            console.log(response.data.students);

            const firstNameAndLastName = response.data.students.map(
              ({ id, first_name, email, last_name, year_and_sections }) => ({
                first_name,
                last_name,
                id,
                email,
                year_and_sections,
                password: `#${last_name.substring(0, 2)}2023`,
              })
            );
            setGetAnnouncement(firstNameAndLastName);

            setTableData(firstNameAndLastName);
          });
      }
    };
    GetAnnouncementHandler();
  }, [updatedList]);

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (tableData !== undefined) {
      if (!Object.keys(validationErrors).length) {
        const info = (tableData[row.index] = values);
        //send/receive api updates here, then refetch or update local table data for re-render
        let toastId;
        console.log(info);
        console.log(info.id);
        if (
          info.year_and_sections == "" ||
          info.year_and_sections == undefined
        ) {
          toast.error("Please fill out the black space");
          setHasError(true);
        } else if (
          info.year_and_sections.endsWith(",") ||
          info.year_and_sections.endsWith(".") ||
          info.year_and_sections.endsWith("!") ||
          info.year_and_sections == ""
        ) {
          toast.error("Please remove the comma at the end");
          setHasError(true);
        } else {
          setHasError(false);
          toastId = toast.info("Sending Request...");
          const item = {
            year_and_sections: info.year_and_sections,
          };
          console.log(item);
          axios
            .patch(
              `${
                import.meta.env.VITE_API_BASE_URL
              }/api/coursemanager/teachers/edit-year-and-sections/${info.id}`,
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
                toast.update(toastId, {
                  render: "Request Successfully",
                  type: toast.TYPE.SUCCESS,
                  autoClose: 2000,
                });
                // }
                setTableData([...tableData]);
                setUpdatedList(!updatedList);
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

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Teacher ID",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "first_name",
      header: "First Name",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "year_and_sections",
      header: "Year and Section",
      enableColumnOrdering: false,
      enableEditing: true, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "password",
      header: "Password",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
  ]);

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);
  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(tableData);
  };
  return (
    <div>
      <ArrowNextAndPrevious>
        <h3 className="m-0">List of Teachers</h3>
      </ArrowNextAndPrevious>
      <div className="MaterialUiTable">
        <MaterialReactTable
          enableRowSelection
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
          enableColumnOrdering
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <Button
                color="primary"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export All Data
              </Button>
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                //export all rows, including from the next page, (still respects filtering and sorting)
                onClick={() =>
                  handleExportRows(table.getPrePaginationRowModel().rows)
                }
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export All Rows
              </Button>
              <Button
                disabled={table.getRowModel().rows.length === 0}
                //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                onClick={() => handleExportRows(table.getRowModel().rows)}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Page Rows
              </Button>
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                //only export selected rows
                onClick={() =>
                  handleExportRows(table.getSelectedRowModel().rows)
                }
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Selected Rows
              </Button>
            </Box>
          )}
          renderRowActions={({ row, table }) => (
            <Box
              sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          editingMode="modal" //default
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
        />
      </div>
    </div>
  );
};

export default ManagerGetTeachers;
