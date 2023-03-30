import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// SuperAdmin
import SuperAdminLayout from "./layouts/authenticatedLayout/SuperAdminNavigationBar/SuperAdminLayout";
import SuperDashboard from "../pages/superAdmin/superDashboard";
import SuperEditProfile from "../pages/superAdmin/SuperEditProfile";
import SuperBulkStudentCreationAccount from "../pages/superAdmin/SuperBulkStudentCreationAccount";
import SuperBulkTeacherCreationAccount from "../pages/superAdmin/SuperBulkTeacherCreationAccount";
import SuperCreateAdminAcct from "../pages/superAdmin/SingleCreationAccount/SuperCreateAdminAcct";
import SuperCreateCourseDevAcct from "../pages/superAdmin/SingleCreationAccount/SuperCreateCourseDevAcct";
import SuperCreateStudentAcct from "../pages/superAdmin/SingleCreationAccount/SuperCreateStudentAcct";
import SuperCreateStudentAcctFilter from "../pages/superAdmin/SingleCreationAccount/SuperCreateStudentAcctFilter";
import SuperCreateTeacherAcct from "../pages/superAdmin/SingleCreationAccount/SuperCreateTeacherAcct";
import SuperCreateCourseManAcct from "../pages/superAdmin/SingleCreationAccount/SuperCreateCourseManAcct";

// CourseManager
import CourseManagerLayout from "./layouts/authenticatedLayout/CourseManagerNavigationBar/CourseManagerLayout";
import ManagerCreateCourse from "../pages/courseManager/ManagerCreateCourse";
import ManagerEditProfile from "../pages/courseManager/ManagerEditProfile";
import ManagerGetCreatedCourse from "../pages/courseManager/ManagerGetCreatedCourse";
import ManagerTagSubjToCourseDev from "../pages/courseManager/ManagerTagSubjToCourseDev";
import ManagerGetStudents from "../pages/courseManager/GetStudents/ManagerGetStudents";
import SortByYear from "../pages/courseManager/GetStudents/SortByYear";
import ManagerCreateSyllabus from "../pages/courseManager/ManagerCreateSyllabus";
import ManagerCreateSyllabusTItle from "../pages/courseManager/ManagerCreateSyllabusTItle";
import ManagerAvailableContent from "../pages/courseManager/AvailableCourse/ManagerAvailableContent";
import ManagerAvailableModules from "../pages/courseManager/AvailableCourse/ManagerAvailableModules";
import ManagerAvailableSubjects from "../pages/courseManager/AvailableCourse/ManagerAvailableSubjects";
import ManagerGetAAE from "../pages/courseManager/CreateModules/ManagerGetAAE";
import ManagerGetAssignment from "../pages/courseManager/CreateModules/ManagerGetAssignment";
import ManagerGetEvaluation from "../pages/courseManager/CreateModules/ManagetGetEvaluation";
import ManagerGetExam from "../pages/courseManager/CreateModules/ManagerGetExam";
import ManagerGetLesson from "../pages/courseManager/CreateModules/ManagerGetLesson";
import ManagerGetPrelimAct from "../pages/courseManager/CreateModules/ManagerGetPrelimAct";
import ManagerGetGeneralization from "../pages/courseManager/CreateModules/ManagerGetGeneralization";
import ManagerDashboard from "../pages/courseManager/AnnouncementDashboard/ManagerDashboard";
import ManagerDashboardSpecificAnnouncement from "../pages/courseManager/AnnouncementDashboard/ManagerDashboardSpecificAnnouncement";

// Admin
import AdminLayout from "./layouts/authenticatedLayout/AdminNavigationBar/AdminLayout";
import AdminEditProfile from "../pages/Admin/AdminEditProfile";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import AdminStudentSubjectTagging from "../pages/Admin/AdminStudentSubjectTagging";
import AdminTeacherSubjectTagging from "../pages/Admin/AdminTeacherSubjectTagging";
import StudentIndividualSubjectTagging from "../pages/Admin/IndividualSubjectTagging/StudentIndividualSubjectTagging";
import TeacherIndividualSubjectTagging from "../pages/Admin/IndividualSubjectTagging/TeacherIndividualSubjectTagging";
import AdminBatchGrantExam from "../pages/Admin/ExamGranting/AdminBatchGrantExam";
import AdminSingleGrantExam from "../pages/Admin/ExamGranting/AdminSingleGrantExam";
import AdminAnnouncement from "../pages/Admin/AdminAnnouncement";
import AdminWeekGrant from "../pages/Admin/AdminWeekGrant";
import AdminAvailableContent from "../pages/Admin/AvailableCourse/AdminAvailableContent";
import AdminAvailableModules from "../pages/Admin/AvailableCourse/AdminAvailableModules";
import AdminAvailableSubjects from "../pages/Admin/AvailableCourse/AdminAvailableSubjects";
import AdminGetAAE from "../pages/Admin/CreateModules/AdminGetAAE";
import AdminGetAssignment from "../pages/Admin/CreateModules/AdminGetAssignment";
import AdminGetEvaluation from "../pages/Admin/CreateModules/AdminGetEvaluation";
import AdminGetExam from "../pages/Admin/CreateModules/AdminGetExam";
import AdminGetGeneralization from "../pages/Admin/CreateModules/AdminGetGeneralization";
import AdminGetLesson from "../pages/Admin/CreateModules/AdminGetLesson";
import AdminGetPrelimAct from "../pages/Admin/CreateModules/AdminGetPrelimAct";

// Course Developer
import CourseDevLayout from "./layouts/authenticatedLayout/CourseDeveloperNavifationBar/CourseDevLayout";
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
import DevDashboard from "../pages/courseDeveloper/AnnouncementDashboard/DevDashboard";
import DevDashboardSpecificAnnouncement from "../pages/courseDeveloper/AnnouncementDashboard/DevDashboardSpecificAnnouncement";

// Student
import StudentLayout from "./layouts/authenticatedLayout/StudentNavigationBar/StudentLayout";
import Course from "../pages/student/Course";
import Dashboard from "../pages/student/AnnouncementDashboard/Dashboard";
import DashboardSpecificAnnouncement from "../pages/student/AnnouncementDashboard/DashboardSpecificAnnouncement";
import StudPrelimActivity from "../pages/student/AvailableModules/StudPrelimActivity";
import StudGeneralization from "../pages/student/AvailableModules/StudGeneralization";
import StudLesson from "../pages/student/AvailableModules/StudLesson";
import StudAAE from "../pages/student/AvailableModules/StudAAE";
import StudQuizAAE from "../pages/student/AvailableModules/AnotherTabForQuiz/StudQuizAAE";
import StudEvaluation from "../pages/student/AvailableModules/StudEvaluation";
import StudQuizEvaluation from "../pages/student/AvailableModules/AnotherTabForQuiz/StudQuizEvaluation";
import StudAssignment from "../pages/student/AvailableModules/StudAssignment";
import StudQuizAssignment from "../pages/student/AvailableModules/AnotherTabForQuiz/StudQuizAssignment";
import StudPrelimExam from "../pages/student/AvailableModules/StudPrelimExam";
import StudQuizPrelimExam from "../pages/student/AvailableModules/AnotherTabForQuiz/StudQuizPrelimExam";
import GetActivitiesSortBySection from "../pages/Teacher/GetActivities/GetActivitiesSortBySection";
import GetActivitiesSortBySubjects from "../pages/Teacher/GetActivities/GetActivitiesSortBySubjects";

// Teacher
import TeacherLayout from "./layouts/authenticatedLayout/TeacherNavigationBar/TeacherLayout";
import TeachQuizResult from "../pages/Teacher/QuizResult/TeachQuizResult";
import TeachEditProfile from "../pages/Teacher/TeachEditProfile";
import StudEditProfile from "../pages/student/StudEditProfile";
import StudAvailableSubjects from "../pages/student/AvailableCourse/StudAvailableSubjects";
import StudAvailableModules from "../pages/student/AvailableCourse/StudAvailableModules";
import StudAvailableContent from "../pages/student/AvailableCourse/StudAvailableContent";
import TeachValidateSnapshot from "../pages/Teacher/ValidateSnapshot/TeachValidateSnapshot";
import SortBySubjects from "../pages/Teacher/QuizResult/SortBySubjects";
import SortBySection from "../pages/Teacher/QuizResult/SortBySection";
import ValidateSnapSortBySubjects from "../pages/Teacher/ValidateSnapshot/ValidateSnapSortBySubjects";
import ValidateSnapSortBySection from "../pages/Teacher/ValidateSnapshot/ValidateSnapSortBySection";
import TeachReAttemptQuiz from "../pages/Teacher/ClearQuizAttempt/TeachReAttemptQuiz";
import GetStudentsActivities from "../pages/Teacher/GetActivities/GetStudentsActivities";
import GetActivitiesSortByAct from "../pages/Teacher/GetActivities/GetActivitiesSortByAct";
import TeachDashboard from "../pages/Teacher/AnnouncementDashboard/TeachDashboard";
import TeachDashboardSpecificAnnouncement from "../pages/Teacher/AnnouncementDashboard/TeachDashboardSpecificAnnouncement";

// Others
import Login from "./authentication/Login";
import RequireAuth from "./authentication/RequireAuth";
import NotRequireAuth from "./authentication/notRequireAuth";
import UnAuthorized from "./layouts/unAuthorized";
import Missing from "./layouts/Missing";
import ClearAttemptSortBySection from "../pages/Teacher/ClearQuizAttempt/ClearAttemptSortBySection";
import ClearAttemptSortBySubjects from "../pages/Teacher/ClearQuizAttempt/ClearAttemptSortBySubjects";

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
        <Route
          path="/student/:id/modules/:id/evaluation/quiz"
          element={<StudQuizEvaluation />}
        />
        <Route
          path="/student/:id/modules/:id/assignment/quiz"
          element={<StudQuizAssignment />}
        />
        <Route
          path="/student/:id/modules/:id/:id/quiz"
          element={<StudQuizPrelimExam />}
        />
        <Route element={<StudentLayout />}>
          <Route path="/student/home" element={<Dashboard />}></Route>
          <Route
            path="/student/home/:id"
            element={<DashboardSpecificAnnouncement />}
          ></Route>

          <Route
            path="/student/editprofile"
            element={<StudEditProfile />}
          ></Route>
          <Route path="/student/subjects" element={<StudAvailableSubjects />} />
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
          <Route path="/student/:id/modules/:id/aae" element={<StudAAE />} />
          <Route
            path="/student/:id/modules/:id/evaluation"
            element={<StudEvaluation />}
          />
          <Route
            path="/student/:id/modules/:id/assignment"
            element={<StudAssignment />}
          />
          <Route
            path="/student/:id/modules/:id/:id"
            element={<StudPrelimExam />}
          />
        </Route>
      </Route>

      {/* TEACHER */}
      <Route element={<RequireAuth allowedRoles={"teacher"} />}>
        <Route element={<TeacherLayout />}>
          <Route path="/teacher/editprofile" element={<TeachEditProfile />} />
          {/* dashboard */}
          <Route path="/teacher/home" element={<TeachDashboard />} />
          <Route
            path="/teacher/home/:id"
            element={<TeachDashboardSpecificAnnouncement />}
          />
          {/* quizresult */}
          <Route path="/teacher/quizresult" element={<SortBySubjects />} />
          <Route path="/teacher/quizresult/:id" element={<SortBySection />} />
          <Route
            path="/teacher/quizresult/:id/:id"
            element={<TeachQuizResult />}
          />
          {/* validate snapshot */}
          <Route
            path="/teacher/validatesnapshot"
            element={<ValidateSnapSortBySubjects />}
          />
          <Route
            path="/teacher/validatesnapshot/:id"
            element={<ValidateSnapSortBySection />}
          />
          <Route
            path="/teacher/validatesnapshot/:id/:id"
            element={<TeachValidateSnapshot />}
          />
          {/* Clear Attempt */}
          <Route
            path="/teacher/resetquizattempt"
            element={<ClearAttemptSortBySubjects />}
          />
          <Route
            path="/teacher/resetquizattempt/:id"
            element={<ClearAttemptSortBySection />}
          />
          <Route
            path="/teacher/resetquizattempt/:id/:id"
            element={<TeachReAttemptQuiz />}
          />
          {/* Get Activities */}
          <Route
            path="/teacher/studentsActivities"
            element={<GetActivitiesSortBySubjects />}
          />
          <Route
            path="/teacher/studentsActivities/:id"
            element={<GetActivitiesSortBySection />}
          />
          <Route
            path="/teacher/studentsActivities/:id/:id"
            element={<GetActivitiesSortByAct />}
          />
          <Route
            path="/teacher/studentsActivities/:id/:id/:id"
            element={<GetStudentsActivities />}
          />
        </Route>
      </Route>

      {/* COURSE MANAGER */}
      <Route element={<RequireAuth allowedRoles={"CourseManager"} />}>
        <Route element={<CourseManagerLayout />}>
          {/* dashboard */}
          <Route path="/courseManager/home" element={<ManagerDashboard />} />
          <Route
            path="/courseManager/home/:id"
            element={<ManagerDashboardSpecificAnnouncement />}
          />
          <Route
            path="/courseManager/createCourse"
            element={<ManagerCreateCourse />}
          />
          <Route
            path="/courseManager/editprofile"
            element={<ManagerEditProfile />}
          />
          <Route
            path="/courseManager/course"
            element={<ManagerGetCreatedCourse />}
          />
          <Route
            path="/courseManager/taggingSubjectForCourseDev"
            element={<ManagerTagSubjToCourseDev />}
          />
          <Route
            path="/courseManager/listOfStudents"
            element={<SortByYear />}
          />
          <Route
            path="/courseManager/listOfStudents/:id"
            element={<ManagerGetStudents />}
          />
          <Route
            path="/courseManager/createsyllabus"
            element={<ManagerCreateSyllabus />}
          />
          <Route
            path="/courseManager/:id/:id/modules"
            element={<ManagerCreateSyllabusTItle />}
          />
          {/* courses */}
          <Route
            path="/courseManager/subjects"
            element={<ManagerAvailableSubjects />}
          />
          <Route
            path="/courseManager/:id/modules"
            element={<ManagerAvailableModules />}
          />
          <Route
            path="/courseManager/:id/modules/:id"
            element={<ManagerAvailableContent />}
          />
          {/* modules */}
          <Route
            path="/courseManager/:id/modules/:id/aae"
            element={<ManagerGetAAE />}
          />
          <Route
            path="/courseManager/:id/modules/:id/assignment"
            element={<ManagerGetAssignment />}
          />
          <Route
            path="/courseManager/:id/modules/:id/evaluation"
            element={<ManagerGetEvaluation />}
          />
          <Route
            path="/courseManager/:id/modules/:id/:id"
            element={<ManagerGetExam />}
          />
          <Route
            path="/courseManager/:id/modules/:id/lesson"
            element={<ManagerGetLesson />}
          />
          <Route
            path="/courseManager/:id/modules/:id/preliminaryactivity"
            element={<ManagerGetPrelimAct />}
          />
          <Route
            path="/courseManager/:id/modules/:id/generalization"
            element={<ManagerGetGeneralization />}
          />
        </Route>
      </Route>

      {/* SUPER ADMIN */}
      <Route element={<RequireAuth allowedRoles={"SuperAdmin"} />}>
        <Route element={<SuperAdminLayout />}>
          <Route path="/superAdmin/home" element={<SuperDashboard />} />
          <Route
            path="/superAdmin/editprofile"
            element={<SuperEditProfile />}
          />
          <Route
            path="/superAdmin/studentBulkCreationAccount"
            element={<SuperBulkStudentCreationAccount />}
          />
          <Route
            path="/superAdmin/teacherBulkCreationAccount"
            element={<SuperBulkTeacherCreationAccount />}
          />

          <Route
            path="/superAdmin/teacherCreateSingleAccount"
            element={<SuperCreateTeacherAcct />}
          />
          {/* create single student account */}
          <Route
            path="/superAdmin/studentCreateSingleAccount"
            element={<SuperCreateStudentAcctFilter />}
          />
          <Route
            path="/superAdmin/studentCreateSingleAccount/:id"
            element={<SuperCreateStudentAcct />}
          />
          <Route
            path="/superAdmin/adminCreateSingleAccount"
            element={<SuperCreateAdminAcct />}
          />
          <Route
            path="/superAdmin/courseDeveloperCreateSingleAccount"
            element={<SuperCreateCourseDevAcct />}
          />
          <Route
            path="/superAdmin/courseManagerCreateSingleAccount"
            element={<SuperCreateCourseManAcct />}
          />
        </Route>
      </Route>

      {/* ADMIN */}
      <Route element={<RequireAuth allowedRoles={"admin"} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/home" element={<AdminDashboard />} />
          <Route path="/admin/editProfile" element={<AdminEditProfile />} />
          <Route
            path="/admin/studentSubjectTagging"
            element={<AdminStudentSubjectTagging />}
          />
          <Route
            path="/admin/teacherSubjectTagging"
            element={<AdminTeacherSubjectTagging />}
          />
          <Route
            path="/admin/studentIndividualSubjectTagging"
            element={<StudentIndividualSubjectTagging />}
          />
          <Route
            path="/admin/teacherIndividualSubjectTagging"
            element={<TeacherIndividualSubjectTagging />}
          />
          <Route
            path="/admin/batchgrantexam"
            element={<AdminBatchGrantExam />}
          />
          <Route
            path="/admin/singleGrantExam"
            element={<AdminSingleGrantExam />}
          />
          <Route
            path="/admin/createAnnouncement"
            element={<AdminAnnouncement />}
          />
          <Route path="/admin/weekGrant" element={<AdminWeekGrant />} />
          {/* courses */}
          <Route path="/admin/subjects" element={<AdminAvailableSubjects />} />
          <Route
            path="/admin/:id/modules"
            element={<AdminAvailableModules />}
          />
          <Route
            path="/admin/:id/modules/:id"
            element={<AdminAvailableContent />}
          />
          {/* modules */}
          <Route path="/admin/:id/modules/:id/aae" element={<AdminGetAAE />} />
          <Route
            path="/admin/:id/modules/:id/assignment"
            element={<AdminGetAssignment />}
          />
          <Route
            path="/admin/:id/modules/:id/evaluation"
            element={<AdminGetEvaluation />}
          />
          <Route path="/admin/:id/modules/:id/:id" element={<AdminGetExam />} />
          <Route
            path="/admin/:id/modules/:id/lesson"
            element={<AdminGetLesson />}
          />
          <Route
            path="/admin/:id/modules/:id/preliminaryactivity"
            element={<AdminGetPrelimAct />}
          />
          <Route
            path="/admin/:id/modules/:id/generalization"
            element={<AdminGetGeneralization />}
          />
        </Route>
      </Route>

      {/* COURSE DEVELOPER */}

      <Route element={<RequireAuth allowedRoles={"courseDeveloper"} />}>
        <Route element={<CourseDevLayout />}>
          <Route path="/developer/home" element={<DevDashboard />} />
          <Route
            path="/developer/home/:id"
            element={<DevDashboardSpecificAnnouncement />}
          />

          <Route path="/developer/editprofile" element={<DevEditProfile />} />
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
