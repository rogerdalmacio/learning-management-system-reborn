import React, { useEffect } from "react";
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
import DevInserTitle from "../pages/courseDeveloper/CreateModules/DevInserTitle";
import DevCreateGeneralization from "../pages/courseDeveloper/CreateModules/DevCreateGeneralization";
import DevCreateEvaluation from "../pages/courseDeveloper/CreateModules/DevCreateEvaluation";
import DevCreateAssignment from "../pages/courseDeveloper/CreateModules/DevCreateAssignment";
import DevCreateExam from "../pages/courseDeveloper/CreateModules/DevCreateExam";
import DevCreateLesson from "../pages/courseDeveloper/CreateModules/DevCreateLesson";

// Student
import StudentLayout from "./layouts/authenticatedLayout/StudentNavigationBar/StudentLayout";
import Course from "../pages/student/Course";
import Dashboard from "../pages/student/Dashboard";
import StudPrelimActivity from "../pages/student/AvailableModules/StudPrelimActivity";
import StudGeneralization from "../pages/student/AvailableModules/StudGeneralization";
import StudLesson from "../pages/student/AvailableModules/StudLesson";
import StudAAE from "../pages/student/AvailableModules/StudAAE";
import StudQuizAAE from "../pages/student/AvailableModules/AnotherTabForQuiz/StudQuizAAE";

// Teacher
import TeacherLayout from "./layouts/authenticatedLayout/TeacherNavigationBar/TeacherLayout";
import TeachDashboard from "../pages/Teacher/TeachDashboard";
import TeachEditProfile from "../pages/Teacher/TeachEditProfile";
import StudEditProfile from "../pages/student/StudEditProfile";
import StudAvailableSubjects from "../pages/student/AvailableCourse/StudAvailableSubjects";
import StudAvailableModules from "../pages/student/AvailableCourse/StudAvailableModules";
import StudAvailableContent from "../pages/student/AvailableCourse/StudAvailableContent";

// Others
import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";
import NotRequireAuth from "./authentication/notRequireAuth";
import UnAuthorized from "./layouts/unAuthorized";
import Missing from "./layouts/Missing";

function App() {
    useEffect(() => {
        document.cookie = `name=value;samesite=None;secure;httponly;expires=${new Date(
            Date.now() + 86400 * 1000
        ).toUTCString()}`;
    }, []);

    return (
        <Routes>
            <Route element={<NotRequireAuth />}>
                <Route path="/" element={<Login />} />
            </Route>

            {/* STUDENT */}
            <Route element={<RequireAuth allowedRoles={"student"} />}>
                <Route
                    path="/student/:id/modules/:id/aae/quiz"
                    element={<StudQuizAAE />}
                />
                <Route element={<StudentLayout />}>
                    <Route path="/student/home" element={<Dashboard />}></Route>
                    <Route
                        path="/student/editprofile"
                        element={<StudEditProfile />}
                    ></Route>
                    <Route
                        path="/student/subjects"
                        element={<StudAvailableSubjects />}
                    />
                    <Route
                        path="/student/:id/modules"
                        element={<StudAvailableModules />}
                    />
                    <Route
                        path="/student/:id/modules/:id"
                        element={<StudAvailableContent />}
                    />
                    <Route
                        path="/student/:id/modules/:id/preliminaryactivity"
                        element={<StudPrelimActivity />}
                    />
                    <Route
                        path="/student/:id/modules/:id/generalization"
                        element={<StudGeneralization />}
                    />
                    <Route
                        path="/student/:id/modules/:id/lesson"
                        element={<StudLesson />}
                    />
                    <Route
                        path="/student/:id/modules/:id/aae"
                        element={<StudAAE />}
                    />
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
                    <Route
                        path="/developer/:id/modules/:id/inserttitle"
                        element={<DevInserTitle />}
                    />
                    <Route
                        path="/developer/:id/modules/:id/generalization"
                        element={<DevCreateGeneralization />}
                    />
                    <Route
                        path="/developer/:id/modules/:id/evaluation"
                        element={<DevCreateEvaluation />}
                    />
                    <Route
                        path="/developer/:id/modules/:id/assignment"
                        element={<DevCreateAssignment />}
                    />
                    <Route
                        path="/developer/:id/modules/:id/:id"
                        element={<DevCreateExam />}
                    />
                    <Route
                        path="/developer/:id/modules/:id/lesson"
                        element={<DevCreateLesson />}
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
