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
import { Delete, Edit, Check } from "@mui/icons-material";
import { data, states } from "../../Admin/makeData";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

const SuperCreateTeacherAcct = () => {
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
  const [updatedList, setUpdatedList] = useState(false);
  const [tableData, setTableData] = useState(getAnnouncement);
  const [validationErrors, setValidationErrors] = useState({});
  const [listOfData, setListOfData] = useState();
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

            const result2 = data.map(
              ({
                id,
                first_name,
                last_name,
                program,
                quiz_type,
                quizresult,
                year_and_section,
                subjects,
                weekNo,
              }) => {
                console.log(quizresult);

                const studSubjects = subjects.split(",");
                console.log(studSubjects);
                studSubjects.map((sub) => {});
                const snapshot = quizresult.filter(
                  ({ snapshot, quiz_type, attempt, module_id }) =>
                    snapshot === 1 &&
                    attempt == "finished" &&
                    year_and_section == courseSection &&
                    module_id.split("-")[0] == courseBase
                );
                console.log(snapshot);
                return snapshot.map((snapshot) => {
                  const module_id = snapshot.module_id;
                  const weekNumber = module_id.split("-")[1];

                  const weekNo =
                    Number(snapshot?.module_id?.match(/\d+/)[0]) || null;
                  const snapshotValue = snapshot
                    ? `${snapshot.student_id}${snapshot.quiz_type}${snapshot.quiz_id}`
                    : "0";
                  console.log(weekNo);
                  return {
                    first_name,
                    id,
                    last_name,
                    quiz_type: snapshot.quiz_type,
                    year_and_section,
                    program,
                    snapshot: snapshotValue,
                    weekNo,
                    weekNumber: weekNumber,
                    quizresultId: snapshot.id,
                  };
                });
              }
            );
            const arrayOfArrays = [];
            console.log(result2.length);
            for (let i = 0; i <= result2.length - 1; i++) {
              console.log(i);
              const array = result2[i];
              console.log(array);
              arrayOfArrays.push(array);
            }

            const combinedArray = [].concat(...arrayOfArrays);
            setTableData(combinedArray.sort((a, b) => b.id - a.id));
            // console.log(result);
            console.log(result2);
          });
      }
    };
    GetAnnouncementHandler();
  }, [updatedList]);
  console.log(tableData);
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Student ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        size: 80,
      },
      {
        accessorKey: "snapshot",
        header: "Snapshot",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        size: 80,
        Cell: ({ row }) => (
          <img
            src={`${
              import.meta.env.VITE_API_BASE_URL
            }/storage/quiz/${row.getValue("snapshot")}.jpg`}
            alt={row.getValue("snapshot")}
            width="300"
            height="200"
          />
        ),
      },
      {
        accessorKey: "quiz_type",
        header: "Quiz Type",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "first_name",
        header: "First Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "year_and_section",
        header: "Year and Section",
        size: 140,
        enableEditing: false, //disable editing on this column
      },
      {
        accessorKey: "weekNumber",
        header: "Week No.",
        size: 140,
        enableEditing: false, //disable editing on this column
      },
      {
        accessorKey: "program",
        header: "Course",
        size: 80,

        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "quizresultId",
        header: "Quiz Id",
        size: 140,
        enableEditing: false, //disable editing on this column
      },
    ]
    // [getCommonEditTextFieldProps]
  );

  const handleRejectRow = (row) => {
    if (!confirm(`Are you sure you want to delete ${row.getValue("id")}`)) {
      return;
    }
    let toastId;
    let item = { student_id: row.getValue("id") };
    console.log(item);
    axios
      .patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/teacher/rejectsnapshot/${row.getValue("quizresultId")}`,
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
        toast.success("Successfully Deleted");
        setUpdatedList(!updatedList);
      });

    //send api delete request here, then refetch or update local table data for re-render
  };

  const handleApprovedRow = (row) => {
    console.log(row);
    console.log(row.getValue("weekNumber"));
    console.log(row.getValue("year_and_section"));
    console.log(row.getValue("quiz_type"));

    if (
      !confirm(
        `Are you sure you want to delete ${row.getValue("quizresultId")}`
      )
    ) {
      return;
    }
    let toastId;

    //
    let item = {
      student_id: row.getValue("id"),
      // year_and_section: row.getValue("year_and_section"),
      // quiz_type: row.getValue("quiz_type"),
      // week_number: row.getValue("weekNumber"),
    };
    axios
      .patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/teacher/checksnapshot/${row.getValue("quizresultId")}`,
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
        toast.success("Approved");
        setUpdatedList(!updatedList);
      });

    //send api delete request here, then refetch or update local table data for re-render
  };
  console.log(listOfData);

  const handleApproveAll = (row) => {
    // console.log(row);
    // console.log(row.getValue("weekNumber"));
    // console.log(row.getValue("year_and_section"));
    // console.log(row.getValue("quiz_type"));
    const weekNumber = listOfData.getValue("weekNumber");
    const yearAndSection = listOfData.getValue("year_and_section");
    const quizType = listOfData.getValue("quiz_type");
    if (
      !confirm(
        `Are you sure you want to approve all ${listOfData.getValue(
          "quiz_type"
        )}`
      )
    ) {
      return;
    }

    //
    let item = {
      year_and_sections: yearAndSection,
      quiz_type: quizType,
      week_no: weekNumber,
    };
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/teacher/batchchecksnapshot`,
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
        toast.success("Approved");
        setUpdatedList(!updatedList);
      });

    //send api delete request here, then refetch or update local table data for re-render
  };
  return (
    <div>
      <ArrowNextAndPrevious>
        <h3 className="m-0">
          Validate Snapshot - {courseBase} - {courseSection}
        </h3>
      </ArrowNextAndPrevious>
      <button onClick={() => handleApproveAll()}>Approve All</button>
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
          enableEditing
          renderRowActions={({ row, table }) => (
            <>
              {setListOfData(row)}
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <Tooltip arrow placement="right" title="Reject">
                  <IconButton
                    color="error"
                    onClick={() => handleRejectRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Approve">
                  <IconButton
                    color="success"
                    onClick={() => handleApprovedRow(row)}
                  >
                    <Check />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        />
      </div>
    </div>
  );
};

//example of creating a mui dialog modal for creating new rows

export default SuperCreateTeacherAcct;
