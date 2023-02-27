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
import { data, states } from "../Admin/makeData";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

const SuperCreateTeacherAcct = () => {
  const { role, token } = useAuth();
  const tableInstanceRef = useRef(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
  // updateList is for rerendering again the getList
  const [updatedList, setUpdatedList] = useState(false);
  const [tableData, setTableData] = useState(getAnnouncement);
  const [validationErrors, setValidationErrors] = useState({});

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
            console.log(response);
            const result = data
              .filter(({ quizresult }) =>
                quizresult.some(({ snapshot }) => snapshot === 1)
              )
              .map(
                ({
                  id,
                  first_name,
                  last_name,
                  program,
                  quizresult,
                  year_and_section,
                }) => {
                  const snapshot = quizresult.find(
                    ({ snapshot }) => snapshot === 1
                  );
                  const weekNo =
                    Number(snapshot?.module_id?.match(/\d+/)?.[0]) || null;
                  const snapshotValue = snapshot
                    ? `${snapshot.student_id}${snapshot.quiz_type}${snapshot.quiz_id}`
                    : "0";

                  return {
                    first_name,
                    id,
                    last_name,
                    year_and_section,
                    program,
                    snapshot: snapshotValue,
                    weekNo,
                  };
                }
              );

            console.log(result);

            console.log(response);
            setTableData(result.sort((a, b) => b.id - a.id));
          });
      }
    };
    GetAnnouncementHandler();
  }, [updatedList]);

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
            }/storage/quiz/evaluation/${row.getValue("snapshot")}.jpg`}
            alt={row.getValue("snapshot")}
            width="300"
            height="200"
          />
        ),
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
        accessorKey: "program",
        header: "Course",
        size: 140,

        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ]
    // [getCommonEditTextFieldProps]
  );

  const handleRejectRow = (row) => {
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

  const handleApprovedRow = (row) => {
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
        enableEditing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Tooltip arrow placement="right" title="Reject">
              <IconButton color="error" onClick={() => handleRejectRow(row)}>
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
        )}
      />
    </div>
  );
};

//example of creating a mui dialog modal for creating new rows

export default SuperCreateTeacherAcct;
