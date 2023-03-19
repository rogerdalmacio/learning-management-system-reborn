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

const TeachReAttemptQuiz = ({ updatedList, setUpdatedList }) => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);

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

            const result = data.map((item) => {
              const quizresult = item.quizresult.reduce((acc, cur) => {
                const weekNo = parseInt(cur.module_id.split("-")[1], 10);
                acc[cur.quiz_type] = cur.score;
                acc.weekNo = weekNo;
                return acc;
              }, {});
              return {
                id: item.id,
                first_name: item.first_name,
                last_name: item.last_name,
                year_and_section: item.year_and_section,
                program: item.program,
                evaluation:
                  quizresult.evaluation == undefined
                    ? ""
                    : quizresult.evaluation,
                aae: quizresult.aae == undefined ? "" : quizresult.aae,
                assignment:
                  quizresult.assignment == undefined
                    ? ""
                    : quizresult.assignment,
                prelim_examination:
                  quizresult.preliminaryexamination == undefined
                    ? ""
                    : quizresult.preliminaryexamination,
                midterm_examination:
                  quizresult.midtermexamination == undefined
                    ? ""
                    : quizresult.midtermexamination,
                final_examination:
                  quizresult.finalexamination == undefined
                    ? ""
                    : quizresult.finalexamination,
                weekNo: quizresult.weekNo == undefined ? "" : quizresult.weekNo,
              };
            });

            console.log(result);

            console.log(response);
            setTableData(result.sort((a, b) => b.id - a.id));
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
      header: "AAE",
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row }) => (
        <div
          className={`${
            row.original.aae !== "" ? "d-flex align-items-center" : "d-none"
          }`}
        >
          {console.log(row.original)}
          <p className="mb-0 fw-bold me-3">{row.original.aae}</p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() => handleAction(row)}
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
      Cell: ({ row }) => (
        <div
          className={`${
            row.original.evaluation !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          <p className="mb-0 fw-bold me-3">{row.original.evaluation}</p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() => handleAction(row)}
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
      Cell: ({ row }) => (
        <div
          className={`${
            row.original.assignment !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          <p className="mb-0 fw-bold me-3">{row.original.assignment}</p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() => handleAction(row)}
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
      Cell: ({ row }) => (
        <div
          className={`${
            row.original.prelim_examination !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          <p className="mb-0 fw-bold me-3">{row.original.prelim_examination}</p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() => handleAction(row)}
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
      Cell: ({ row }) => (
        <div
          className={`${
            row.original.midterm_examination !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          <p className="mb-0 fw-bold me-3">
            {row.original.midterm_examination}
          </p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() => handleAction(row)}
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
      Cell: ({ row }) => (
        <div
          className={`${
            row.original.final_examination !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          <p className="mb-0 fw-bold me-3">{row.original.final_examination}</p>
          <button
            className="smallButtonTemplateDanger text-right sumbit-button btn py-1"
            onClick={() => handleAction(row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]);

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
        enableColumnOrdering
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
          ></Box>
        )}
      />
    </div>
  );
};

export default TeachReAttemptQuiz;
