import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NotRequireAuth = () => {
  const { role } = useAuth();

  function HandlerUser() {
    if (!role) {
      return <Outlet />;
    } else if (role === "student") {
      return <Navigate to="student/subjects" replace />;
    } else if (role === "teacher") {
      return <Navigate to="teacher/home" replace />;
    } else if (role === "admin") {
      return <Navigate to="admin/home" replace />;
    } else if (role === "courseDeveloper") {
      return <Navigate to="developer/availableCourse" replace />;
    } else if (role === "CourseManager") {
      return <Navigate to="courseManager/listOfStudents" replace />;
    } else if (role === "SuperAdmin") {
      return <Navigate to="superAdmin/home" replace />;
    } else {
      return <Outlet />;
    }
  }

  return HandlerUser();
  // return !user?.type ? <Outlet /> : <Navigate to="student/home" replace />;
};

export default NotRequireAuth;
