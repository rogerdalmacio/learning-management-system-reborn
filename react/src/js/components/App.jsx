import { Routes, Route, Navigate } from "react-router-dom";

// SuperAdmin
import SuperAdminLayout from "./layouts/authenticatedLayout/SuperAdminNavigationBar/SuperAdminLayout";
import SuperDashboard from "../pages/superAdmin/superDashboard";
import SuperEditProfile from "../pages/superAdmin/SuperEditProfile";

// CourseManager
import CourseManagerLayout from "./layouts/authenticatedLayout/CourseManagerNavigationBar/CourseManagerLayout";
import ManagerDashboard from "../pages/courseManager/ManagerDashboard";
import ManagerEditProfile from "../pages/courseManager/ManagerEditProfile";
import ManagerGetCreatedCourse from "../pages/courseManager/ManagerGetCreatedCourse";

// Admin
import AdminLayout from "./layouts/authenticatedLayout/AdminNavigationBar/AdminLayout";
import AdminEditProfile from "../pages/Admin/AdminEditProfile";
import AdminDashboard from "../pages/Admin/AdminDashboard";

// Course Developer
import CourseDevLayout from "./layouts/authenticatedLayout/CourseDeveloperNavifationBar/CourseDevLayout";
import DevDashboard from "../pages/courseDeveloper/DevDashboard";
import DevEditProfile from "../pages/courseDeveloper/DevEditProfile";
import DevAvailableCourse from "../pages/courseDeveloper/AvailableCourse/DevAvailableCourse";
import DevAvailableModules from "../pages/courseDeveloper/AvailableCourse/DevAvailableModules";
import DevAvailableContent from "../pages/courseDeveloper/AvailableCourse/DevAvailableContent";
import DevCreateAAE from "../pages/courseDeveloper/CreateModules/DevCreateAAE";
import DevCreatePrelimAct from "../pages/courseDeveloper/CreateModules/DevCreatePrelimAct";

// Student
import StudentLayout from "./layouts/authenticatedLayout/StudentNavigationBar/StudentLayout";
import Course from "../pages/student/Course";
import Dashboard from "../pages/student/Dashboard";

// Teacher
import TeacherLayout from "./layouts/authenticatedLayout/TeacherNavigationBar/TeacherLayout";
import TeachDashboard from "../pages/Teacher/TeachDashboard";
import TeachEditProfile from "../pages/Teacher/TeachEditProfile";

// Others
import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";
import NotRequireAuth from "./authentication/notRequireAuth";
import UnAuthorized from "./layouts/unAuthorized";
import Missing from "./layouts/Missing";
import StudEditProfile from "../pages/student/StudEditProfile";

function App() {
    return (
        <Routes>
            <Route element={<NotRequireAuth />}>
                <Route path="/" element={<Login />} />
            </Route>

            {/* STUDENT */}
            <Route element={<RequireAuth allowedRoles={"student"} />}>
                <Route element={<StudentLayout />}>
                    <Route path="/student/home" element={<Dashboard />}></Route>
                    <Route path="/student/course" element={<Course />}></Route>
                    <Route
                        path="/student/editprofile"
                        element={<StudEditProfile />}
                    ></Route>
                </Route>
            </Route>

            {/* TEACHER */}
            <Route element={<RequireAuth allowedRoles={"teacher"} />}>
                <Route element={<TeacherLayout />}>
                    <Route path="/teacher/home" element={<TeachDashboard />} />
                    <Route
                        path="/teacher/editprofile"
                        element={<TeachEditProfile />}
                    />
                </Route>
            </Route>

            {/* COURSE MANAGER */}
            <Route element={<RequireAuth allowedRoles={"CourseManager"} />}>
                <Route element={<CourseManagerLayout />}>
                    <Route
                        path="/courseManager/home"
                        element={<ManagerDashboard />}
                    />
                    <Route
                        path="/courseManager/editprofile"
                        element={<ManagerEditProfile />}
                    />
                    <Route
                        path="/courseManager/course"
                        element={<ManagerGetCreatedCourse />}
                    />
                </Route>
            </Route>

            {/* SUPER ADMIN */}
            <Route element={<RequireAuth allowedRoles={"SuperAdmin"} />}>
                <Route element={<SuperAdminLayout />}>
                    <Route
                        path="/superAdmin/home"
                        element={<SuperDashboard />}
                    />
                    <Route
                        path="/superAdmin/editprofile"
                        element={<SuperEditProfile />}
                    />
                </Route>
            </Route>

            {/* ADMIN */}
            <Route element={<RequireAuth allowedRoles={"admin"} />}>
                <Route element={<AdminLayout />}>
                    <Route
                        path="/admin/home"
                        element={<AdminDashboard />}
                    ></Route>
                    <Route
                        path="/admin/editProfile"
                        element={<AdminEditProfile />}
                    ></Route>
                </Route>
            </Route>

            {/* COURSE DEVELOPER */}

            <Route element={<RequireAuth allowedRoles={"courseDeveloper"} />}>
                <Route element={<CourseDevLayout />}>
                    <Route path="/developer/home" element={<DevDashboard />} />
                    <Route
                        path="/developer/editprofile"
                        element={<DevEditProfile />}
                    />
                    <Route
                        path="/developer/availableCourse"
                        element={<DevAvailableCourse />}
                    />
                    <Route
                        path="/developer/:id/modules"
                        element={<DevAvailableModules />}
                    />
                    <Route
                        path="/developer/:id/modules/:id"
                        element={<DevAvailableContent />}
                    />
                    <Route
                        path="/developer/:id/modules/:id/aae"
                        element={<DevCreateAAE />}
                    />
                    <Route
                        path="/developer/:id/modules/:id/preliminaryactivity"
                        element={<DevCreatePrelimAct />}
                    />
                </Route>
            </Route>

            {/* UnAuthorized Pages */}
            <Route path="unauthorized" element={<UnAuthorized />} />

            {/* 404 ERROR */}
            <Route path="*" element={<Missing />} />
        </Routes>
    );
}

export default App;
