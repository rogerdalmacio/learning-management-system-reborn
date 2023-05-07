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
import { data, states } from "../makeData";
import { toast } from "react-toastify";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import useAuth from "../../../hooks/useAuth";

const AdminRequestCMO = () => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);
  const [request, setRequest] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedList, setUpdatedList] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
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
      if (role === "admin") {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/core/registrar/list-of-request`,
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
            console.log(response.data.list);

            // const data = response.data.List.map((studInfo) => {
            //   return studInfo.grant.find((gran) => {
            //     return gran;
            //   });
            // });

            // const filteredData = data.filter((item) => item !== undefined);
            // console.log(filteredData);

            setGetAnnouncement(
              response.data.list.sort((a, b) => a.id - blur.id)
            );

            setTableData(
              response.data.list.sort((a, b) => b.inq_num - a.inq_num)
            );
          });
      }
    };
    GetAnnouncementHandler();
  }, [updatedList]);
  console.log(request);
  const HandleSubmit = () => {
    let toastId;

    if (request == "" || request == undefined) {
      setError(true);
      toast.error("Please fill out the blank area");
    } else {
      setIsLoading(true);
      setError(false);
      toastId = toast.info("Sending Request...");

      const item = { Request: request };
      console.log(item);
      axios
        .post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/core/registrar/request-student-subjects`,
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
            setRequest("");
            setUpdatedList(!updatedList);
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.message) {
            toast.update(toastId, {
              render: `${error.response.data.message}`,
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
          setIsLoading(false);
        });
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: "No",
      header: "Inquiry Number",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "Department",
      header: "Department",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "Request",
      header: "Inquiries Type",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "File",
      header: "Student List",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
      Cell: ({ row, column }) => (
        <div>
          {console.log(row.original.File)}
          <a href={`${row.original.File}`}>{row.original.File}</a>
        </div>
      ),
    },
    {
      accessorKey: "Status",
      header: "Status",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "Request_Date",
      header: "Date Request",
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
        <h3 className="m-0">Student - Request Subjects</h3>
      </ArrowNextAndPrevious>
      <div>
        <div className="d-flex justify-content-start mb-3">
          <div class="form-floating " style={{ maxWidth: "700px" }}>
            <textarea
              class="form-control m-auto"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              value={request}
              onChange={(e) => {
                setRequest(e.target.value);
              }}
              style={{ height: "200px", width: "700px" }}
            ></textarea>
            <label for="floatingTextarea">Comments</label>
            <div className="d-flex justify-content-end">
              <button
                className="taggingSubjectButton smallButtonTemplate sumbit-button btn rounded-2 mt-3"
                onClick={HandleSubmit}
                disabled={isLoading}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
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
        />
      </div>
    </div>
  );
};

export default AdminRequestCMO;
