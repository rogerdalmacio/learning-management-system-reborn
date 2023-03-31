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

const AdminRequestGrantExam = () => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);
  const [request, setRequest] = useState();
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
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/core/grantees`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response.data.students);
            console.log(response.data.students);

            // const initialRender = response.data.students.filter((data) => {
            //   return (
            //     parseInt(data.year_and_section.toString().substr(0, 1)) ==
            //     studentYear
            //   );
            // });
            // console.log(initialRender);

            // const firstNameAndLastName = initialRender.map(
            //   ({ id, first_name, last_name, year_and_section }) => ({
            //     first_name,
            //     last_name,
            //     id,
            //     year_and_section,
            //     password: `#${last_name.substring(0, 2)}2023`,
            //   })
            // );
            const data = response.data.students.map((studInfo) => {
              return studInfo.grant.find((gran) => {
                return gran;
              });
            });

            const filteredData = data.filter((item) => item !== undefined);
            console.log(filteredData);

            setGetAnnouncement(filteredData);

            setTableData(filteredData);
          });
      }
    };
    GetAnnouncementHandler();
  }, [updatedList]);

  const HandleSubmit = () => {};

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Student Id",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "preliminaries",
      header: "Term",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "granted_at",
      header: "Granted At",
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
        <h3 className="m-0">Student - Request Grant Exam</h3>
      </ArrowNextAndPrevious>
      <div>
        <div className="ms-sm-3 ">
          <div class="form-floating " style={{ maxWidth: "700px" }}>
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              value={request}
              onChange={(e) => {
                setRequest(e.target.value);
              }}
              style={{ height: "300px" }}
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

export default AdminRequestGrantExam;
