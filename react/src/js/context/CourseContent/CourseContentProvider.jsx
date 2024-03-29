import { createContext, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const CourseContentContext = createContext({});

export const CourseContentProvider = ({ children }) => {
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
  const [updateList, setUpdatedList] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  const [courseUpdate, setCourseUpdate] = useState(false);

  // const pathname = window.location.pathname;
  // const pathArray = pathname.split("/");
  // const courseBase = pathArray[4];
  // console.log(courseBase);
  // console.log(quizResultId && quizResultId[0].id);

  useEffect(() => {
    const renderCourse = async () => {
      if (role === "CourseManager" || role === "admin" || role === "teacher") {
        await axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/content/course`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response);
            console.log(response.data.Courses);
            setCourses(response.data.Courses);
          });
      }
    };

    renderCourse();
  }, [courseUpdate]);

  useEffect(() => {
    const renderModule = async () => {
      if (
        (week !== undefined && week !== null && role === "CourseManager") ||
        role === "teacher" ||
        role === "admin"
      ) {
        console.log(week);
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/content/module/${week}`,
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
            setModule(response.data.Modules);
          });
      }
    };

    renderModule();
  }, [week, hasChange]);

  useEffect(() => {
    const renderLesson = async () => {
      console.log(weekLesson);
      if (
        (weekLesson !== undefined &&
          weekLesson !== null &&
          role === "CourseManager") ||
        role === "teacher" ||
        role === "admin"
      ) {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/content/lesson/${weekLesson}`,
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
            setLesson(response.data.Lesson);
          });
      }
    };

    renderLesson();
  }, [weekLesson]);

  useEffect(() => {
    const renderQuiz = async () => {
      if (
        (weekQuiz !== undefined &&
          weekQuiz !== null &&
          role === "CourseManager") ||
        role === "teacher" ||
        role === "admin"
      ) {
        console.log(weekQuiz);
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/content/module/${weekQuiz}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data.Modules);
            // console.log(response.data.Module[0]);
            setQuiz(response.data.Modules);
          });
      }
    };

    renderQuiz();
  }, [weekQuiz, hasChange]);

  useEffect(() => {
    const renderSpecificQuiz = async () => {
      console.log(quizid);
      if (
        (quizid !== undefined && quizid !== null && role === "CourseManager") ||
        role === "teacher" ||
        role === "admin"
      ) {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/content/quiz/${quizid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            if (quizid !== undefined) {
              // console.log([response.data]);

              setOfficialQuiz(response.data);
            } else {
              setOfficialQuiz(undefined);
            }
          });
      }
    };

    renderSpecificQuiz();
  }, [quizid, updateList, quiz, hasChange]);
  console.log(quiz);

  // useEffect(() => {
  //   const renderQuizResult = async () => {
  //     if (role === "courseDeveloper" && quizid) {
  //       const quiz_id = { quiz_id: quizid };

  //       await axios
  //         .post(
  //           `${
  //             import.meta.env.VITE_API_BASE_URL
  //           }/api/coursedeveloper/getquizresultid`,
  //           quiz_id,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               "Content-Type": "application/json",
  //               Accept: "application/json",
  //             },
  //           }
  //         )
  //         .then((response) => {
  //           console.log(response);
  //           setQuizResultId(response.data[0]);
  //         });
  //     }
  //   };

  //   renderQuizResult();
  // }, [quizid]);
  console.log(courses);
  return (
    <CourseContentContext.Provider
      value={{
        courses,
        setCourseUpdate,
        courseUpdate,
        setWeek,
        setWeekLesson,
        updateList,
        setUpdatedList,
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
    </CourseContentContext.Provider>
  );
};

export default CourseContentContext;
