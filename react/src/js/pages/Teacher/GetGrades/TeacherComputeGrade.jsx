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

const TeacherComputeGrade = ({ updatedList, setUpdatedList }) => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  // term
  const courseTermBase = pathArray[3];
  const courseTerm = pathArray[3].toLowerCase();
  // subjects
  const courseBase = pathArray[4];
  // sections
  const courseSection = pathArray[5];
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
  // updateList is for rerendering again the getList
  const [hasError, setHasError] = useState(false);
  const [tableData, setTableData] = useState(getAnnouncement);
  const [validationErrors, setValidationErrors] = useState({});
  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "teacher") {
        await axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/teacher/grade`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            const data = response.data.scores;
            const numbers = [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            ];
            const result2 = numbers.map((num) => {
              return data.map((item) => {
                const filteredItem = item.quizresult.filter(
                  (quiz) =>
                    quiz.module_id == `${courseBase}-${num}` &&
                    item.year_and_section == courseSection &&
                    quiz.preliminaries == courseTerm
                );

                // transform form terms to preliminaties in activityresult
                const activityresult = item.activityresult.map((act) => {
                  return {
                    id: act.id,
                    student_id: act.student_id,
                    quiz_type: act.activity_type,
                    preliminaries: act.terms,
                    module_id: act.module_id,
                    percentage: JSON.parse(act.percentage),
                  };
                });
                console.log(activityresult);

                const filteredActivity = activityresult.filter(
                  (act) =>
                    act.module_id == `${courseBase}-${num}` &&
                    item.year_and_section == courseSection &&
                    act.preliminaries == courseTerm
                );
                console.log(filteredItem);
                console.log(filteredActivity);
                const combinedArr = filteredItem.concat(filteredActivity);
                console.log(combinedArr);

                return combinedArr.reduce((acc, cur) => {
                  console.log(cur);
                  console.log(acc);
                  const value = cur.id;
                  const quizType = cur.quiz_type + "id";
                  console.log(quizType);
                  const weekNo = parseInt(cur.module_id.split("-")[1], 10);
                  acc[cur.quiz_type] = cur.percentage;
                  acc.weekNo = weekNo;
                  acc[quizType] = value;
                  console.log(acc.evaluation);
                  console.log(acc.preliminaryactivity);

                  const resul = {
                    id: item.id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    year_and_section: item.year_and_section,
                    program: item.program,
                    preliminaries: cur.preliminaries,
                    preliminaryactivity:
                      acc.preliminaryactivity == undefined
                        ? ""
                        : acc.preliminaryactivity,
                    generalization:
                      acc.generalization == undefined ? "" : acc.generalization,
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
              return item.map((ite) => {
                finalItem.push(ite);
                return ite;
              });
            });

            const newArray = finalItem.filter(
              (object) => Object.keys(object).length !== 0
            );
            // NEW FUNCTION
            // Create a new object to store the combined data
            console.log(newArray);
            const newItem = newArray.reduce((acc, item) => {
              const id = item.id;
              let curr = acc.find((x) => x.id === id);
              if (!curr) {
                curr = {
                  id: id,
                  aae: ["N/A", "N/A", "N/A", "N/A", "N/A"],
                  assignment: ["N/A", "N/A", "N/A", "N/A", "N/A"],
                  evaluation: ["N/A", "N/A", "N/A", "N/A", "N/A"],
                  preliminaryactivity: ["N/A", "N/A", "N/A", "N/A", "N/A"],
                  generalization: ["N/A", "N/A", "N/A", "N/A", "N/A"],
                  prelim_examination: [""],
                  midterm_examination: [""],
                  final_examination: [""],
                  first_name: item.first_name,
                  last_name: item.last_name,
                  program: item.program,
                  year_and_section: item.year_and_section,
                  preliminaries: item.preliminaries,
                };
                acc.push(curr);
              }
              const weekNo = item.weekNo;
              if (
                weekNo >= 1 &&
                weekNo <= 5 &&
                item.preliminaries === "prelim"
              ) {
                curr.aae[weekNo - 1] = item.aae || "N/A";
                curr.assignment[weekNo - 1] = item.assignment || "N/A";
                curr.evaluation[weekNo - 1] = item.evaluation || "N/A";
                curr.preliminaryactivity[weekNo - 1] =
                  item.preliminaryactivity || "N/A";
                curr.generalization[weekNo - 1] = item.generalization || "N/A";
              } else if (weekNo == 6 && item.preliminaries === "prelim") {
                curr.prelim_examination[weekNo - 6] =
                  item.prelim_examination || "N/A";
              } else if (
                weekNo >= 7 &&
                weekNo <= 11 &&
                item.preliminaries === "midterm"
              ) {
                curr.aae[weekNo - 7] = item.aae || "N/A";
                curr.assignment[weekNo - 7] = item.assignment || "N/A";
                curr.evaluation[weekNo - 7] = item.evaluation || "N/A";
                curr.preliminaryactivity[weekNo - 7] =
                  item.preliminaryactivity || "N/A";
                curr.generalization[weekNo - 7] = item.generalization || "N/A";
              } else if (weekNo == 12 && item.preliminaries === "midterm") {
                curr.midterm_examination[weekNo - 12] =
                  item.midterm_examination || "N/A";
              } else if (
                weekNo >= 13 &&
                weekNo <= 17 &&
                item.preliminaries === "finals"
              ) {
                curr.aae[weekNo - 13] = item.aae || "N/A";
                curr.assignment[weekNo - 13] = item.assignment || "N/A";
                curr.evaluation[weekNo - 13] = item.evaluation || "N/A";
                curr.preliminaryactivity[weekNo - 13] =
                  item.preliminaryactivity || "N/A";
                curr.generalization[weekNo - 13] = item.generalization || "N/A";
              } else if (weekNo == 18 && item.preliminaries === "finals") {
                curr.final_examination[weekNo - 18] =
                  item.final_examination || "N/A";
              }
              return acc;
            }, []);
            console.log(newItem);
            const convertedItem = newItem.map((item) => {
              for (const key in item) {
                if (Array.isArray(item[key])) {
                  item[key] = item[key].join(", "); // add spaces between the values
                }
              }
              return item;
            });
            console.log(convertedItem);

            //compute the results
            const newData = convertedItem.map((item) => {
              // Split the string values by comma and iterate over them
              const assignmentValues = item.assignment.split(", ");
              const evaluationValues = item.evaluation.split(", ");
              const aaeValues = item.aae.split(", ");
              const preliminaryactivityValues =
                item.preliminaryactivity.split(", ");
              const generalizationValues = item.generalization.split(", ");

              let total = 0;
              let totalAAE = 0;
              let totalEvaluation = 0;
              let totalAssignment = 0;
              let totalPrelimAct = 0;
              let totalGeneralization = 0;

              // getting the value of the exams
              const examScores = [];

              if (item.prelim_examination !== "") {
                examScores.push(parseFloat(item.prelim_examination));
              }

              if (item.midterm_examination !== "") {
                examScores.push(parseFloat(item.midterm_examination));
              }

              if (item.final_examination !== "") {
                examScores.push(parseFloat(item.final_examination));
              }
              // Iterate over the values and add up the numbers
              assignmentValues.forEach((value) => {
                if (!isNaN(parseFloat(value))) {
                  totalAssignment += parseFloat(value) / 5;
                }
              });

              evaluationValues.forEach((value) => {
                if (!isNaN(parseFloat(value))) {
                  totalEvaluation += parseFloat(value) / 5;
                }
              });

              aaeValues.forEach((value) => {
                if (!isNaN(parseFloat(value))) {
                  totalAAE += parseFloat(value) / 5;
                }
              });

              preliminaryactivityValues.forEach((value) => {
                if (!isNaN(parseFloat(value))) {
                  totalPrelimAct += parseFloat(value) / 5;
                }
              });

              generalizationValues.forEach((value) => {
                if (!isNaN(parseFloat(value))) {
                  totalGeneralization += parseFloat(value) / 5;
                }
              });

              const totalQuiz =
                ((totalAAE + totalEvaluation + totalAssignment) / 3) * 0.4;
              const totalActivity =
                ((totalPrelimAct + totalGeneralization) / 2) * 0.2;
              const totalExam = examScores[0] * 0.4;
              let totalGrade = (totalQuiz + totalActivity + totalExam).toFixed(
                2
              );
              let transmutedGrade = (totalGrade * 0.5 + 50).toFixed(2);
              console.log(transmutedGrade);
              // Add the total value to a new key in the object
              return {
                id: item.id,
                first_name: item.first_name,
                last_name: item.last_name,
                preliminaries: item.preliminaries,
                aae: item.aae,
                assignment: item.assignment,
                evaluation: item.evaluation,
                examination: examScores.toString(),
                generalization: item.generalization,
                preliminaryactivity: item.preliminaryactivity,
                program: item.program,
                year_and_section: item.year_and_section,
                totalGrade,
                transmutedGrade,
              };
            });

            console.log(newData);

            // END OF FUNCTION
            setTableData(newData.sort((a, b) => b.id - a.id));
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
      accessorKey: "aae",
      header: "AAE",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 200,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">{row.original.aae}</p>
      ),
    },
    {
      accessorKey: "evaluation",
      header: "Evaluation",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 200,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">{row.original.evaluation}</p>
      ),
    },
    {
      accessorKey: "assignment",
      header: "Assignment",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 250,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">{row.original.assignment}</p>
      ),
    },
    {
      accessorKey: "preliminaryactivity",
      header: "Preliminary Activity",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 200,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">
          {row.original.preliminaryactivity}
        </p>
      ),
    },
    {
      accessorKey: "generalization",
      header: "Generalization",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 250,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">{row.original.generalization}</p>
      ),
    },
    {
      accessorKey: "examination",
      header: "Examination",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">{row.original.examination}</p>
      ),
    },
    {
      accessorKey: "totalGrade",
      header: "Total Grade",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">{row.original.totalGrade}</p>
      ),
    },
    {
      accessorKey: "transmutedGrade",
      header: "Transmuted Grade",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row }) => (
        <p className="mb-0 fw-bold me-3 fs-6">{row.original.transmutedGrade}</p>
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
          Quiz Results - {courseTermBase} / {courseBase} / {courseSection}
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

export default TeacherComputeGrade;
