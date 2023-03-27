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

const GetStudentActivities = ({}) => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  // subjects
  const courseBase = pathArray[3];
  // sections
  const courseSection = pathArray[4];
  // sections
  const courseActivity = pathArray[5];

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
                console.log(item);
                const filteredItem = item.activityresult.filter(
                  (quiz) =>
                    quiz.module_id == `${courseBase}-${num}` &&
                    item.year_and_section == courseSection &&
                    quiz.activity_type == courseActivity
                );

                console.log(filteredItem);
                return filteredItem.reduce((acc, cur) => {
                  console.log(cur);
                  console.log(cur.module_id);

                  const weekNo = parseInt(cur.module_id.split("-")[1], 10);
                  acc[cur.activity_type] = cur.activity_type;
                  acc.weekNo = weekNo;
                  acc[
                    cur.activity_type
                  ] = `${item.id}${cur.activity_type}${cur.activity_id}`;
                  console.log(acc);
                  const resul = {
                    id: item.id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    year_and_section: item.year_and_section,
                    program: item.program,
                    activity: `${item.id}${cur.activity_type}${cur.activity_id}`,
                    weekNo: acc.weekNo == undefined ? "" : acc.weekNo,
                  };

                  return resul;
                }, {});
              });
            });

            console.log(result2);
            let finalItem = [];
            result2.map((item) => {
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
            console.log(newArray);
            setTableData(newArray.sort((a, b) => b.id - a.id));
          });
      }
    };
    GetAnnouncementHandler();
  }, [updatedList]);
  console.log(tableData);
  const handleAction = (quizResultId, studID, quizType) => {
    if (
      !confirm(
        `Are you sure you want to delete studentID: ${studID}'s ${quizType}`
      )
    ) {
      return;
    }
    let toastId;

    let item = {
      id: quizResultId,
    };

    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/teacher/deleteattempt`,
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
      accessorKey: `${courseActivity}`,
      header: `${courseActivity}`,
      enableColumnOrdering: true,
      enableEditing: false, //disable editing on this column
      enableSorting: true,
      size: 80,
      Cell: ({ row, column }) => (
        <div
          className={`${
            row.original.activity !== ""
              ? "d-flex align-items-center"
              : "d-none"
          }`}
        >
          {console.log(column.id)}
          <a
            className="text-decoration-none fs-6"
            target="_blank"
            href={`${
              import.meta.env.VITE_API_BASE_URL
            }/storage/activity/${courseActivity}/${row.original.activity}.pdf`}
          >
            {`${row.original.activity}.pdf`}
          </a>{" "}
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
  ]);

  return (
    <div>
      <ArrowNextAndPrevious>
        <h3 className="m-0">
          Student's Activities - {courseBase} - {courseSection}
        </h3>
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

export default GetStudentActivities;
