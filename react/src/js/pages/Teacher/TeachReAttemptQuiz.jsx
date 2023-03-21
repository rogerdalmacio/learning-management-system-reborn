import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button } from "@mui/material";
import { data, states } from "../Admin/makeData";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here

const TeachReAttemptQuiz = ({}) => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
  // updateList is for rerendering again the getList
  const [hasError, setHasError] = useState(false);
  const [tableData, setTableData] = useState(getAnnouncement);
  const [validationErrors, setValidationErrors] = useState({});
  const [updatedList, setUpdatedList] = useState(false);
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
            console.log(data);

            const numbers = [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            ];

            const result2 = numbers.map((num) => {
              console.log(num);
              return data.map((item) => {
                // const itemz = item.quizresult.filter((quiz) => {
                //   console.log(quiz.module_id == "MATH00-1");
                //   return quiz.module_id == "MATH00-1";
                // });

                const filteredItem = item.quizresult.filter(
                  (quiz) => quiz.module_id == `MATH00-${num}`
                );

                return filteredItem.reduce((acc, cur) => {
                  console.log(cur);
                  console.log(cur.module_id);
                  const value = cur.id;
                  const quizType = cur.quiz_type + "id";

                  const weekNo = parseInt(cur.module_id.split("-")[1], 10);
                  acc[cur.quiz_type] = cur.score;
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
                    evaluationid:
                      acc.evaluationid == undefined ? "" : acc.evaluationid,
                    aaeid: acc.aaeid == undefined ? "" : acc.aaeid,
                    assignmentid:
                      acc.assignmentid == undefined ? "" : acc.assignmentid,
                    prelim_examinationid:
                      acc.preliminaryexaminationid == undefined
                        ? ""
                        : acc.preliminaryexaminationid,
                    midterm_examinationid:
                      acc.midtermexaminationid == undefined
                        ? ""
                        : acc.midtermexaminationid,
                    final_examinationid:
                      acc.finalexaminationid == undefined
                        ? ""
                        : acc.finalexaminationid,
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

  const handleAction = (quizResultId, studID, quizType) => {
    if (
      !confirm(
        `Are you sure you want to delete studentID: ${studID}'s ${quizType}`
      )
    ) {
      return;
    }
    let toastId;
    axios
      .delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/teacher/deletequizattempt/${quizResultId}`,
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
  };

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
      header: "AAE",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row, column }) => (
        <div
          className={`${
            row.original.aae !== "" ? "d-flex align-items-center" : "d-none"
          }`}
        >
          {console.log(column.id)}

          <p className="mb-0 fw-bold me-3 fs-6">{row.original.aae}</p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() =>
              handleAction(row.original.aaeid, row.original.id, column.id)
            }
          >
            Delete
          </button>
        </div>
      ),
    },
    {
      accessorKey: "evaluation",
      header: "Evaluation",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row, column }) => (
        <div
          className={`${
            row.original.evaluation !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          {console.log(column.id)}

          <p className="mb-0 fw-bold me-3 fs-6">{row.original.evaluation}</p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() =>
              handleAction(
                row.original.evaluationid,
                row.original.id,
                column.id
              )
            }
          >
            Delete
          </button>
        </div>
      ),
    },
    {
      accessorKey: "assignment",
      header: "Assignment",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row, column }) => (
        <div
          className={`${
            row.original.assignment !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          {console.log(column.id)}

          <p className="mb-0 fw-bold me-3 fs-6">{row.original.assignment}</p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() =>
              handleAction(
                row.original.assignmentid,
                row.original.id,
                column.id
              )
            }
          >
            Delete
          </button>
        </div>
      ),
    },
    {
      accessorKey: "prelim_examination",
      header: "Preliminary Exam",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row, column }) => (
        <div
          className={`${
            row.original.prelim_examination !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          <p className="mb-0 fw-bold me-3 fs-6">
            {row.original.prelim_examination}
          </p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() =>
              handleAction(
                row.original.prelim_examinationid,
                row.original.id,
                column.id
              )
            }
          >
            Delete
          </button>
        </div>
      ),
    },
    {
      accessorKey: "midterm_examination",
      header: "Midterm Exam",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row, column }) => (
        <div
          className={`${
            row.original.midterm_examination !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          <p className="mb-0 fw-bold me-3 fs-6">
            {row.original.midterm_examination}
          </p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() =>
              handleAction(
                row.original.midterm_examinationid,
                row.original.id,
                column.id
              )
            }
          >
            Delete
          </button>
        </div>
      ),
    },
    {
      accessorKey: "final_examination",
      header: "Final Exam",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row, column }) => (
        <div
          className={`${
            row.original.final_examination !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          <p className="mb-0 fw-bold me-3 fs-6">
            {row.original.final_examination}
          </p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() =>
              handleAction(
                row.original.final_examinationid,
                row.original.id,
                column.id
              )
            }
          >
            Delete
          </button>
        </div>
      ),
    },
  ]);

  return (
    <div>
      <h3 className="mb-4">Student - Reset Quiz Attempt</h3>
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
          enableColumnOrdering
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            ></Box>
          )}
        />
      </div>
    </div>
  );
};

export default TeachReAttemptQuiz;
