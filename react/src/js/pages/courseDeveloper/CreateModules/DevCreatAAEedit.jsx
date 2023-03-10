import React, { useEffect, useState } from "react";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import useStudentContext from "../../../hooks/Student/useStudentContext";
import useCourseDevContext from "../../../hooks/CourseDev/useCourseDevContext";
function DevCreateAAEedit() {
  // States

  const {
    quizid,
    quiz,
    courses,
    setWeekQuiz,
    setQuizId,
    OfficialQuizCourseDev,
    officialQuiz,
  } = useCourseDevContext();
  const { token, role } = useAuth();
  const { course } = useGetAvailableCourse();

  const [moduleId, setModuleId] = useState();
  const [term, setTerm] = useState();
  const [content, setContent] = useState();
  const [getQuizId, setGetQuizId] = useState();

  const [AAEquestions, setAAEQuestions] = useState([
    {
      id: "question1",
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
    {
      id: "question2",
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
    {
      id: "question3",
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
    {
      id: "question4",
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
    {
      id: "question5",
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
    {
      id: "question6",
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
    {
      id: "question7",
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
    {
      id: "question8",
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
    {
      id: "question9",
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
    {
      id: "question10",
      question: "",
      options: [
        { id: "option1", text: "", isCorrect: "" },
        { id: "option2", text: "", isCorrect: "" },
        { id: "option3", text: "", isCorrect: "" },
        { id: "option4", text: "", isCorrect: "" },
      ],
    },
  ]);
  const [error, setError] = useState(false);

  const [questionError, setQuestionError] = useState();
  const [textError, setTextError] = useState();
  const [isCorrectError, setIsCorrectError] = useState();
  const [getModule, setGetModule] = useState();

  const numberOfChoices = [
    { id: "option1", rightAnswerNo: "rightAnswer1", letter: "A" },
    { id: "option2", rightAnswerNo: "rightAnswer2", letter: "B" },
    { id: "option3", rightAnswerNo: "rightAnswer3", letter: "C" },
    { id: "option4", rightAnswerNo: "rightAnswer4", letter: "D" },
  ];

  const numberOfQuestions = [
    {
      id: 0,
      question: "Question 1",
      questionNumber: "question1",
      radio: "radio1",
    },
    {
      id: 1,
      question: "Question 2",
      questionNumber: "question2",
      radio: "radio2",
    },
    {
      id: 2,
      question: "Question 3",
      questionNumber: "question3",
      radio: "radio3",
    },
    {
      id: 3,
      question: "Question 4",
      questionNumber: "question4",
      radio: "radio4",
    },
    {
      id: 4,
      question: "Question 5",
      questionNumber: "question5",
      radio: "radio5",
    },
    {
      id: 5,
      question: "Question 6",
      questionNumber: "question6",
      radio: "radio6",
    },
    {
      id: 6,
      question: "Question 7",
      questionNumber: "question7",
      radio: "radio7",
    },
    {
      id: 7,
      question: "Question 8",
      questionNumber: "question8",
      radio: "radio8",
    },
    {
      id: 8,
      question: "Question 9",
      questionNumber: "question9",
      radio: "radio9",
    },
    {
      id: 9,
      question: "Question 10",
      questionNumber: "question10",
      radio: "radio10",
    },
  ];

  const { id } = useParams();

  console.log(moduleId);

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  const weekMod = pathArray[4];
  const currentWeek = weekMod.replace("week", "Week ");
  const weekForModule = weekMod.match(/\d+/)[0];
  const contentType = pathArray[5];
  console.log(contentType);

  console.log(courses);

  useEffect(() => {
    if (course) {
      return course.map((item) => {
        if (item.course == courseTitle) {
          item.module.map((mod) => {
            if (mod.week == weekNumber) {
              console.log(mod);
              setModuleId(mod.id);
            }
          });
        }
      });
    }
  });

  useEffect(() => {
    if (courses) {
      courses.map((course) => {
        if (course.course == courseTitle) {
          course.module.map((mod) => {
            if (mod.week == weekForModule) {
              setWeekQuiz(mod.id);
            }
          });
        }
      });
    }
    console.log(quiz);
    if (quiz) {
      const act = quiz.quiz
        .filter((qui) => qui.quiz_type == contentType)
        .map((content) => {
          setGetQuizId(content.id);
          setQuizId(content.id);
        });
    }

    // this will check if quizId is available
  });

  useEffect(() => {
    console.log(officialQuiz);
    if (officialQuiz !== undefined) {
      console.log(officialQuiz.Quiz);
    }

    const fetchContent = () => {
      if (officialQuiz !== undefined) {
        const initialState = {
          answers: officialQuiz.Quiz[0].answers,
          questions: officialQuiz.Quiz[0].questions,
          options: officialQuiz.Quiz[0].options,
        };
        console.log(initialState);
        const questionsArray = initialState.questions.split("|");
        const optionsArray = initialState.options.split("|");

        const AAEquestions = questionsArray.map((question, index) => {
          const optionsStartIndex = index * 4;
          const optionsEndIndex = optionsStartIndex + 4;
          const questionOptions = optionsArray.slice(
            optionsStartIndex,
            optionsEndIndex
          );
          const questionObject = {
            id: `question${index + 1}`,
            question,
            options: questionOptions.map((option, optionIndex) => ({
              id: `option${optionIndex + 1}`,
              text: option,
              isCorrect: option === initialState.answers.split("|")[index],
            })),
          };
          return questionObject;
        });
        setAAEQuestions(AAEquestions);
      }
    };
    fetchContent();
  }, [officialQuiz]);
  console.log(AAEquestions);

  console.log(content);

  // WEEK number
  const weekNumber = id.match(/\d+/)[0];
  console.log(weekNumber);

  // Term
  useEffect(() => {
    if (weekNumber > 12) {
      setTerm("finals");
    } else if (weekNumber > 6) {
      setTerm("midterm");
    } else {
      setTerm("prelim");
    }
  });

  // QUIZ SUMBITTION
  // const SubmitActivityHandler = async (e) => {
  //     e.preventDefault();
  //     let activity = {
  //         module_id: moduleId,
  //         quiz_type: "AAE",
  //         preliminaries: term,
  //         quiz_info: AAEquestions,
  //     };

  //     console.log(activity);
  //     await axios
  //         .post(
  //             `${
  //                 import.meta.env.VITE_API_BASE_URL
  //             }/api/coursedeveloper/activity`,
  //             activity,
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${token}`,
  //                     "Content-Type": "application/json",
  //                     Accept: "application/json",
  //                 },
  //             }
  //         )
  //         .then((response) => {
  //             console.log(response);
  //         });
  // };
  const EditQuizHandler = async () => {
    let toastId;

    if (
      questionError === true ||
      textError === true ||
      isCorrectError === true
    ) {
      toast.error("Please fill out the blank area");
      setError(true);
    } else {
      console.log(AAEquestions);
      setError(false);

      // Questions
      const questions = AAEquestions.reduce(
        (acc, curr) => `${acc}|${curr.question}`,
        ""
      ).slice(1);
      console.log(questions);

      // Options
      const options = AAEquestions.map((question) => {
        return question.options.map((option) => option.text).join("|");
      }).join("|");
      console.log(options);

      // Correct Answer
      const correctAnswers = AAEquestions.map((question) => {
        const correctOption = question.options.find(
          (option) => option.isCorrect === true
        );
        return correctOption.text;
      }).join("|");
      console.log(correctAnswers);

      let activity = {
        module_id: moduleId,
        quiz_type: "aae",
        preliminaries: term,
        questions: questions,
        answers: correctAnswers,
        options: options,
      };

      console.log(activity);

      toastId = toast.info("Sending Request...");

      await axios
        .patch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/coursedeveloper/quiz/${getQuizId}`,
          activity,
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
          if (response.status >= 200 && response.status <= 300) {
            toast.update(toastId, {
              render: "Request Successfully",
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.length !== 0) {
            toast.update(toastId, {
              render: `${error.response.data[0]}`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          } else {
            toast.update(toastId, {
              render: `${error.message}`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          }
        });
    }
  };

  const setQuestionHandler = (e) => {
    const { name, value } = e.target;

    const option = e.currentTarget.dataset.option;
    const radio = e.currentTarget.dataset.radio;

    let arr = [...AAEquestions];
    arr.forEach((item) => {
      if (item.id == name) {
        item.question = value;
      }
    });

    arr.forEach((item, i) => {
      if (item.id === option) {
        item.options.map((val) => {
          if (val.id == name) {
            val.text = value;
          }
        });
      }
    });

    arr.forEach((item, i) => {
      if (item.id === option) {
        item.options.map((val) => {
          if (radio && val.id == radio) {
            val.isCorrect = true;
          } else if (radio && val.id !== radio) {
            val.isCorrect = false;
          }
        });
      }
    });

    setAAEQuestions(arr);
  };

  useEffect(() => {
    // Error Handling : filtering the questions.question if it has an empty string
    let filterQuestion = AAEquestions.filter((item) => item.question === "");

    if (filterQuestion.length !== 0) {
      setQuestionError(true);
    } else {
      setQuestionError(false);
    }

    //Error Handling : filtering the question.options[].text if it has an empty string
    let filterText = AAEquestions.map((item, i) =>
      item.options.filter((opt) => opt.text === "")
    );
    let filterTextAgain = filterText.filter((x) => x.length !== 0);

    if (filterTextAgain.length !== 0) {
      setTextError(true);
    } else {
      setTextError(false);
    }

    //Error Handling : filtering the question.options[].isCorrect if it has an empty string
    let filterIsCorrect = AAEquestions.map((item, i) =>
      item.options.filter((opt) => opt.isCorrect === "")
    );

    let filterIsCorrectAgain = filterIsCorrect.filter((x) => x.length == 0);

    if (filterIsCorrectAgain.length !== 10) {
      setIsCorrectError(true);
    } else {
      setIsCorrectError(false);
    }
  }, [AAEquestions]);

  // Mapping Question for optimization
  const numberOfQuestionsHandler = () => {
    return numberOfQuestions.map((numOfQuestion, index) => {
      // for the dataset
      const questionNumber = numOfQuestion.questionNumber;
      const radioNumber = numOfQuestion.radio;
      return (
        <div className="mb-3" key={index}>
          <div className="mb-3">
            <label className="fw-semibold mb-2" htmlFor={questionNumber}>
              {numOfQuestion.question}
            </label>
            <input
              id={questionNumber}
              className={`form-control ${
                error && questionError && AAEquestions[index].question === ""
                  ? "errorInput"
                  : ""
              }`}
              type="text"
              value={AAEquestions[index].question}
              name={questionNumber}
              required
              onChange={(e) => {
                setQuestionHandler(e);
              }}
            />
          </div>
          <div className="row gx-4 gy-2">
            {multipleChoiceHandler(questionNumber, radioNumber, index)}
          </div>
        </div>
      );
    });
  };

  // Mapping Options for optimization
  const multipleChoiceHandler = (questionNumber, radioNumber, index) => {
    return numberOfChoices.map((choice, i) => {
      console.log(AAEquestions[index].options[i].isCorrect);
      return (
        <div className="col-xl-6 mb-3" key={choice.id}>
          <div className="d-flex">
            <label className="m-auto me-2 fw-semibold" htmlFor={choice.letter}>
              {choice.letter}.
            </label>
            <div className="QuizChoicesContainer d-block d-sm-flex input-group">
              <input
                type="text"
                name={choice.id}
                value={AAEquestions[index].options[i].text}
                className={`InputChoices form-control ${
                  error &&
                  textError &&
                  AAEquestions[index].options[i].text === ""
                    ? "errorInput"
                    : ""
                }`}
                data-option={questionNumber}
                onChange={setQuestionHandler}
              />
              <div
                className={`IsCorrectButton form-check input-group-text m-0 ${
                  error &&
                  isCorrectError &&
                  AAEquestions[index].options[i].isCorrect === ""
                    ? "errorInput"
                    : ""
                }`}
              >
                <input
                  className={`form-check-input me-1 ms-0 mt-0`}
                  type="radio"
                  name={radioNumber}
                  value={AAEquestions[index].options[i].isCorrect}
                  checked={AAEquestions[index].options[i].isCorrect === true}
                  data-option={questionNumber}
                  data-radio={choice.id}
                  id={questionNumber + choice.rightAnswerNo}
                  onChange={setQuestionHandler}
                />
                <label
                  htmlFor={questionNumber + choice.rightAnswerNo}
                  className="form-check-label w-100 d-flex justify-content-start"
                >
                  Right Answer
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  // Render it all here
  return (
    <div className="mb-4 w-100">
      <label className="fs-5 fw-semibold">
        Application, Analysis, and Exploration
      </label>
      <div className="inputAnalysisContainer sm-shadow py-3 px-0 px-sm-3 px-xl-5">
        {numberOfQuestionsHandler()}
        <div className="d-flex justify-content-end">
          <p className="my-auto me-3 fst-italic text-danger">
            {error && error ? "*Please fill out The Blank Area*" : ""}
          </p>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={EditQuizHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default DevCreateAAEedit;
