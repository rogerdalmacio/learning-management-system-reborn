import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import useAuth from "../../../hooks/useAuth";
// import DevCreateExamState from "./DevCreateExamState/DevCreateExamOptionsState";
// import numberOfQuestions from "./DevCreateExamState/DevCreateExamQuestionState";
import { toast } from "react-toastify";
import CourseContentProvider from "../../../hooks/CourseContent/useCourseContent";

function ManagerGetExam() {
  const { id } = useParams();
  const { token } = useAuth();

  console.log(id);

  const ExamNewWord =
    id[0].toUpperCase() + id.slice(1).split("examination").join(" Examination");
  console.log(ExamNewWord); // Output: "Preliminary Examination"

  // States
  const {
    quizid,
    quiz,
    courses,
    setWeekQuiz,
    setQuizId,
    setUpdatedList,
    updateList,
    officialQuiz,
    hasChange,
    setHasChange,
  } = CourseContentProvider();

  const [moduleId, setModuleId] = useState();
  const [term, setTerm] = useState();
  const [getQuizId, setGetQuizId] = useState();
  const [listChange, setListChange] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [quizType, setQuizType] = useState();
  const [quizWeek, setQuizWeek] = useState();

  const [numQuestions, setNumQuestions] = useState(5);
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
  ]);
  const [error, setError] = useState(false);

  const [questionError, setQuestionError] = useState();
  const [textError, setTextError] = useState();
  const [isCorrectError, setIsCorrectError] = useState();

  const numberOfChoices = [
    { id: "option1", rightAnswerNo: "rightAnswer1", letter: "A" },
    { id: "option2", rightAnswerNo: "rightAnswer2", letter: "B" },
    { id: "option3", rightAnswerNo: "rightAnswer3", letter: "C" },
    { id: "option4", rightAnswerNo: "rightAnswer4", letter: "D" },
  ];
  const [numberOfQuestions, setNumberOfQuestions] = useState([
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
  ]);
  console.log(AAEquestions);

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  const weekMod = pathArray[4];
  const currentWeek = weekMod.replace("week", "Week ");
  const weekForModule = weekMod.match(/\d+/)[0];
  const contentType = pathArray[5];

  useEffect(() => {
    if (courses) {
      return courses.map((item) => {
        if (item.course == courseTitle) {
          item.module.map((mod) => {
            if (mod.week == weekNumber) {
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

    // this will check if quizId is available
  });

  useEffect(() => {
    if (quiz) {
      const act = quiz.quiz
        .filter((qui) => qui.quiz_type == contentType)
        .map((content) => {
          console.log(content);
          setQuizType(content.quiz_type);
          setQuizWeek(content.module_id.split("-")[1]);
          const part = content.module_id.split("-");
          console.log(part[1] == weekForModule);
          if (part[1] == weekForModule) {
            setUpdatedList(!updateList);
            setGetQuizId(content.id);
            setQuizId(content.id);
          } else {
            setUpdatedList(!updateList);
            setQuizId(undefined);
          }
        });
    }
    console.log(quiz);
  }, [quiz]);

  useEffect(() => {
    console.log(officialQuiz);

    const fetchContent = () => {
      if (officialQuiz !== undefined) {
        const ModuleId = officialQuiz.Quiz.module_id.split("-");
        if (ModuleId[1] == weekForModule) {
          setHasContent(true);
          const initialState = {
            answers: officialQuiz.Quiz.answers,
            questions: officialQuiz.Quiz.questions,
            options: officialQuiz.Quiz.options,
          };
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
          const NumberOfQuestion = [];
          for (let i = 1; i <= AAEquestions.length; i++) {
            const numberOfQuestionForRadio = {
              question: `Question ${i}`,
              questionNumber: `question${i}`,
              radio: `radio${i}`,
            };

            NumberOfQuestion.push(numberOfQuestionForRadio);
          }
          setAAEQuestions(AAEquestions);
          setNumberOfQuestions(NumberOfQuestion);

          setListChange(!listChange);
        }
      }
    };
    fetchContent();
  }, [officialQuiz]);
  console.log(AAEquestions);
  // WEEK number
  const pathname1 = window.location.pathname;

  const pathArray1 = pathname1.split("/");
  const numberofWeek = pathArray1[4];
  const weekNumber = numberofWeek.match(/\d+/)[0];
  console.log(weekNumber);

  useEffect(() => {
    if (courses) {
      return courses.map((item) => {
        if (item.course == courseTitle) {
          item.module.map((mod) => {
            if (mod.week == weekNumber) {
              setModuleId(mod.id);
            }
          });
        }
      });
    }
  });

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
              disabled={true}
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
      return (
        <div className="col-xl-6 mb-3" key={choice.id}>
          <div className="d-flex">
            <label className="m-auto me-2 fw-semibold" htmlFor={choice.letter}>
              {choice.letter}.
            </label>
            <div className="QuizChoicesContainer d-block d-sm-flex input-group">
              <input
                disabled={true}
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
                  disabled={true}
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
      <label className="fs-5 fw-semibold">{ExamNewWord}</label>

      {quiz !== undefined &&
      quiz !== null &&
      quiz.quiz.length !== 0 &&
      quizWeek == weekForModule &&
      quizType == `${contentType}` ? (
        <div className="inputAnalysisContainer sm-shadow py-3 px-0 px-sm-3 px-xl-5">
          {numberOfQuestionsHandler()}
        </div>
      ) : (
        <h4 className="d-flex justify-content-center fst-italic text-secondary py-5">
          No Content has been added yet.
        </h4>
      )}
    </div>
  );
}

export default ManagerGetExam;
