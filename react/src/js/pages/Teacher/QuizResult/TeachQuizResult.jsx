import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button } from "@mui/material";
import { data, states } from "../../Admin/makeData";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

const TeachDashboard = ({ updatedList, setUpdatedList }) => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  // subjects
  const courseBase = pathArray[3];
  // sections
  const courseSection = pathArray[4];

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
  // updateList is for rerendering again the getList
  const [hasError, setHasError] = useState(false);
  const [tableData, setTableData] = useState(getAnnouncement);
  const [validationErrors, setValidationErrors] = useState({});
  console.log(tableData);
  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "teacher") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/teacher/listofstudents`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            const data = response.data.students;
            const numbers = [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            ];
            console.log(data);
            const result2 = numbers.map((num) => {
              return data.map((item) => {
                console.log(item.year_and_section);
                const filteredItem = item.quizresult.filter(
                  (quiz) =>
                    quiz.module_id == `${courseBase}-${num}` &&
                    item.year_and_section == courseSection
                );

                console.log(filteredItem);
                return filteredItem.reduce((acc, cur) => {
                  console.log(cur.logs);
                  console.log(cur.module_id);
                  const logs = cur.logs;
                  const logsResult = parseInt(logs.match(/\d+/)[0]);

                  console.log(logs);
                  const value = cur.id;
                  const quizType = cur.quiz_type + "id";

                  const weekNo = parseInt(cur.module_id.split("-")[1], 10);
                  acc[cur.quiz_type] = `${cur.score} / ${logsResult}`;
                  acc.weekNo = weekNo;
                  acc[quizType] = value;
                  console.log(acc);

                  const resul = {
                    id: item.id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    year_and_section: item.year_and_section,
                    program: item.program,
                    evaluation:
                      acc.evaluation == undefined ? "" : acc.evaluation,
                    aae: acc.aae == undefined ? "" : acc.aae,
                    assignment:
                      acc.assignment == undefined ? "" : acc.assignment,
                    prelim_examination:
                      acc.preliminaryexamination == undefined
                        ? ""
                        : acc.preliminaryexamination,
                    midterm_examination:
                      acc.midtermexamination == undefined
                        ? ""
                        : acc.midtermexamination,
                    final_examination:
                      acc.finalexamination == undefined
                        ? ""
                        : acc.finalexamination,
                    weekNo: acc.weekNo == undefined ? "" : acc.weekNo,
                  };

                  return resul;
                }, {});
              });
            });
            let finalItem = [];
            const item = result2.map((item) => {
              console.log(item);
              return item.map((ite) => {
                console.log(ite);
                finalItem.push(ite);
                return ite;
              });
            });
            console.log(finalItem);

            const newArray = finalItem.filter(
              (object) => Object.keys(object).length !== 0
            );
            setTableData(newArray.sort((a, b) => b.id - a.id));
          });
      }
    };

    GetAnnouncementHandler();
  }, [updatedList]);

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Student ID",
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
      accessorKey: "year_and_section",
      header: "Year and Section",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
    },
    {
      accessorKey: "program",
      header: "Course",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
    },
    {
      accessorKey: "weekNo",
      header: "Week No.",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
    },
    {
      accessorKey: "aae",
      header: "AAE / Logs",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">{row.original.aae}</p>
      ),
    },
    {
      accessorKey: "evaluation",
      header: "Evaluation / Logs",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">{row.original.evaluation}</p>
      ),
    },
    {
      accessorKey: "assignment",
      header: "Assignment / Logs",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">{row.original.assignment}</p>
      ),
    },
    {
      accessorKey: "prelim_examination",
      header: "Prelim Exam / Logs",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">
          {row.original.prelim_examination}
        </p>
      ),
    },
    {
      accessorKey: "midterm_examination",
      header: "Midterm Exam / Logs",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">
          {row.original.midterm_examination}
        </p>
      ),
    },
    {
      accessorKey: "final_examination",
      header: "Final Exam / Logs",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">
          {row.original.final_examination}
        </p>
      ),
    },
  ]);

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
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
        <h3 className="m-0">
          Quiz Results - {courseBase} - {courseSection}
        </h3>
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
        />
      </div>
    </div>
  );
};

export default TeachDashboard;
