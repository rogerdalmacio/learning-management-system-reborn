import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
  Fragment,
} from "react";
import MaterialReactTable from "material-react-table";
import { data, states } from "../makeData";
import useAuth from "../../../hooks/useAuth";

const UserActivityLogs = ({}) => {
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
      if (role === "admin" || role === "SuperAdmin") {
        await axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/core-shared/logs`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            const newArray = response.data.logs.map((log) => {
              const date = new Date(log.created_at);
              const options = {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZoneName: "short",
                timeZone: "UTC",
              };
              const dateString = date.toLocaleString("en-US", options);
              console.log(dateString);
              return {
                user_id: log.user_id,
                user_type: log.user_type,
                activity_log: log.activity_log,
                id: log.id,
                created_at: dateString,
              };
            });
            console.log(response.data.logs);
            console.log(newArray);

            setGetAnnouncement(newArray.sort((a, b) => b.id - a.id));

            setTableData(newArray.sort((a, b) => b.id - a.id));
          });
      }
    };
    GetAnnouncementHandler();
  }, []);
  // if (value == "Admin") {
  //   return "blue";
  // } else if (value == "Teacher") {
  //   return "red";
  // } else if (value == "Student") {
  //   return "purple";
  // } else if (value == "CourseManager") {
  //   return "green";
  // }
  const columns = useMemo(() => [
    {
      accessorKey: "user_id",
      header: "User ID",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "user_type",
      header: "User Type",
      Cell: ({ renderedCellValue }) => (
        <strong
          className={`${
            renderedCellValue === "Admin"
              ? "AdminLogColor"
              : renderedCellValue === "SuperAdmin"
              ? "SuperAdminLogColor"
              : renderedCellValue === "Student"
              ? "StudentLogColor"
              : renderedCellValue === "Teacher"
              ? "TeacherLogColor"
              : renderedCellValue === "CourseManager"
              ? "ManagerLogColor"
              : renderedCellValue === "CourseDeveloper"
              ? "DeveloperLogColor"
              : ""
          }`}
        >
          {renderedCellValue}
        </strong>
      ),
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "activity_log",
      header: "Activity Log",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "id",
      header: "Activity ID",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "created_at",
      header: "Created at",
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
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
        renderTopToolbarCustomActions={() => (
          <Fragment>
            <div className="fw-bold d-flex align-items-center py-2">
              Activity Logs
            </div>
          </Fragment>
        )}
      />
    </div>
  );
};

export default UserActivityLogs;
