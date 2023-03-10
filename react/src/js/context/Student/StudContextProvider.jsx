import { createContext, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const StudentContext = createContext({});

export const StudContextProvider = ({ children }) => {
  const { token, role } = useAuth();

  const [courses, setCourses] = useState();
  const [activity, setActivity] = useState();
  const [module, setModule] = useState();
  const [week, setWeek] = useState();
  const [lesson, setLesson] = useState();
  const [weekLesson, setWeekLesson] = useState();
  const [officialQuiz, setOfficialQuiz] = useState();
  const [quiz, setQuiz] = useState();
  const [weekQuiz, setWeekQuiz] = useState();
  const [quizid, setQuizId] = useState();
  const [quizResultId, setQuizResultId] = useState();
  const [hasChange, setHasChange] = useState(false);
  // const pathname = window.location.pathname;
  // const pathArray = pathname.split("/");
  // const courseBase = pathArray[4];
  // console.log(courseBase);
  // console.log(quizResultId && quizResultId[0].id);

  useEffect(() => {
    const renderCourse = async () => {
      if (role === "student") {
        await axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/student/courses`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response.data.subjects);
            const modulesWithStatus1 = response.data.subjects.map((sub) => {
              console.log(sub);
              return {
                approval: sub.approval,
                course: sub.course,
                course_code: sub.course_code,
                created_at: sub.created_at,
                department: sub.department,
                id: sub.id,
                updated_at: sub.updated_at,
                module: sub.module.filter((module) => module.status === 1),
              };
            });

            setCourses(modulesWithStatus1);
          });
      }
    };

    renderCourse();
  }, []);

  useEffect(() => {
    const renderModule = async () => {
      console.log(week);

      if (role === "student" && week) {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/student/module/${week}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            setModule(response.data.Module);
          });
      }
    };

    renderModule();
  }, [week, hasChange]);

  useEffect(() => {
    const renderLesson = async () => {
      if (role === "student" && weekLesson) {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/student/lesson/${weekLesson}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            setLesson(response.data.Lesson);
          });
      }
    };

    renderLesson();
  }, [weekLesson]);

  useEffect(() => {
    const renderQuiz = async () => {
      console.log(weekQuiz);
      if (role === "student") {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/student/module/${weekQuiz}`,
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
            console.log(response.data.Module);
            setQuiz(response.data.Module);
          });
      }
    };

    renderQuiz();
  }, [weekQuiz]);

  useEffect(() => {
    const renderSpecificQuiz = async () => {
      if (role === "student" && quizid) {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/student/quiz/${quizid}`,
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
            setOfficialQuiz(response.data);
          });
      }
    };

    renderSpecificQuiz();
  }, [quizid]);

  useEffect(() => {
    const renderQuizResult = async () => {
      if (role === "student" && quizid) {
        const quiz_id = { quiz_id: quizid };

        await axios
          .post(
            `${import.meta.env.VITE_API_BASE_URL}/api/student/getquizresultid`,
            quiz_id,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data[0]);
            setQuizResultId(response.data[0]);
          });
      }
    };

    renderQuizResult();
  }, [quizid]);

  return (
    <StudentContext.Provider
      value={{
        courses,
        setWeek,
        setWeekLesson,
        lesson,
        module,
        activity,
        quiz,
        setWeekQuiz,
        quizid,
        setQuizId,
        officialQuiz,
        setQuizResultId,
        quizResultId,
        hasChange,
        setHasChange,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContext;
