import { createContext, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const CourseDevContext = createContext({});

export const CourseDevContextProvider = ({ children }) => {
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
  const [hasCourseChange, setHasCourseChange] = useState(false);

  // const pathname = window.location.pathname;
  // const pathArray = pathname.split("/");
  // const courseBase = pathArray[4];
  // console.log(courseBase);
  // console.log(quizResultId && quizResultId[0].id);

  useEffect(() => {
    const renderCourse = async () => {
      if (role === "courseDeveloper") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/coursedeveloper/course`,
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
            console.log(response.data);
            setCourses(response.data.course);
          });
      }
    };

    renderCourse();
  }, [hasCourseChange]);

  useEffect(() => {
    const renderModule = async () => {
      if (role === "courseDeveloper" && week) {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/coursedeveloper/module/${week}`,
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
            setModule(response.data.Module);
          });
      }
    };

    renderModule();
  }, [week, hasChange]);

  useEffect(() => {
    const renderLesson = async () => {
      console.log(weekLesson);
      if (role === "courseDeveloper" && weekLesson) {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/coursedeveloper/lesson/${weekLesson}`,
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
      if (role === "courseDeveloper" && weekQuiz) {
        console.log(weekQuiz);
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/coursedeveloper/module/${weekQuiz}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data.Module[0]);
            console.log(response.data.Module[0]);
            setQuiz(response.data.Module[0]);
          });
      }
    };

    renderQuiz();
  }, [weekQuiz, hasChange]);

  useEffect(() => {
    const renderSpecificQuiz = async () => {
      console.log(quizid);
      if (role === "courseDeveloper" && quizid) {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/coursedeveloper/quiz/${quizid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            if (quizid !== undefined) {
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
    <CourseDevContext.Provider
      value={{
        courses,
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
        hasCourseChange,
        setHasCourseChange,
      }}
    >
      {children}
    </CourseDevContext.Provider>
  );
};

export default CourseDevContext;
