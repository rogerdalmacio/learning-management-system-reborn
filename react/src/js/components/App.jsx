import { Routes, Route, Navigate } from "react-router-dom";

// SuperAdmin
import SuperAdminLayout from "./layouts/authenticatedLayout/SuperAdminNavigationBar/SuperAdminLayout";
import SuperDashboard from "../pages/superAdmin/superDashboard";
// CourseManager
import CourseManagerLayout from "./layouts/authenticatedLayout/CourseManagerNavigationBar/CourseManagerLayout";
import ManagerDashboard from "../pages/courseManager/ManagerDashboard";

// Admin
import AdminLayout from "./layouts/authenticatedLayout/AdminNavigationBar/AdminLayout";

// Course Developer
import CourseDevLayout from "./layouts/authenticatedLayout/CourseDeveloperNavifationBar/CourseDevLayout";
import DevDashboard from "../pages/courseDeveloper/DevDashboard";
import CreateModules from "../pages/courseDeveloper/CreateModules/CreateModules";
import ModuleWeek from "../pages/courseDeveloper/CreateModules/ModulePerWeek/ModuleWeek";
import InputLesson from "../pages/courseDeveloper/CreateModules/InputLesson";
import InputAnalysis from "../pages/courseDeveloper/CreateModules/InputAnalysis";
import InputPrelim from "../pages/courseDeveloper/CreateModules/InputPrelimAct";
import InputGeneralization from "../pages/courseDeveloper/CreateModules/InputGeneralization";
import InputEvaluation from "../pages/courseDeveloper/CreateModules/InputEvaluation";
import InputAssignment from "../pages/courseDeveloper/CreateModules/InputAssignment";
// Student
import StudentLayout from "./layouts/authenticatedLayout/StudentNavigationBar/StudentLayout";
import Course from "../pages/student/Course";
import Dashboard from "../pages/student/Dashboard";
// Teacher
import TeacherLayout from "./layouts/authenticatedLayout/TeacherNavigationBar/TeacherLayout";
import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";
import NotRequireAuth from "./authentication/notRequireAuth";
import UnAuthorized from "./layouts/unAuthorized";
import Missing from "./layouts/Missing";

function App() {
    return (
        <Routes>
            <Route element={<NotRequireAuth />}>
                <Route path="/" element={<Login />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={"student"} />}>
                <Route element={<StudentLayout />}>
                    <Route path="/student/home" element={<Dashboard />}></Route>
                    <Route path="/student/course" element={<Course />}></Route>
                </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={"teacher"} />}>
                <Route path="/teacher/home" element={<TeacherLayout />}>
                    {/* Insert pages here */}
                </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={"CourseManager"} />}>
                <Route element={<CourseManagerLayout />}>
                    <Route
                        path="/courseManager/home"
                        element={<ManagerDashboard />}
                    />
                </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={"SuperAdmin"} />}>
                <Route element={<SuperAdminLayout />}>
                    <Route
                        path="/superAdmin/home"
                        element={<SuperDashboard />}
                    />
                </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={"admin"} />}>
                <Route path="/admin/home" element={<AdminLayout />}></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={"courseDeveloper"} />}>
                <Route element={<CourseDevLayout />}>
                    <Route path="/developer/home" element={<DevDashboard />} />
                    <Route
                        path="/developer/createModules"
                        element={<CreateModules />}
                    />
                    {/* Learning Materials Weeks */}
                    <Route
                        path="/developer/createModules/:week"
                        element={<ModuleWeek />}
                    />
                    {/* Learning Materials Content */}
                    <Route
                        path="/developer/createModules/:week/lesson"
                        element={<InputLesson />}
                    />
                    <Route
                        path="/developer/createModules/:week/analysis"
                        element={<InputAnalysis />}
                    />
                    <Route
                        path="/developer/createModules/:week/preliminaryActivity"
                        element={<InputPrelim />}
                    />
                    <Route
                        path="/developer/createModules/:week/generalization"
                        element={<InputGeneralization />}
                    />
                    <Route
                        path="/developer/createModules/:week/evaluation"
                        element={<InputEvaluation />}
                    />
                    <Route
                        path="/developer/createModules/:week/assignment"
                        element={<InputAssignment />}
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
