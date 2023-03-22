import React, { useEffect, useState } from "react";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import CourseContentProvider from "../../../hooks/CourseContent/useCourseContent";

function ManagetGetAssignment() {
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
  const { token } = useAuth();

  const [moduleId, setModuleId] = useState();
  const [term, setTerm] = useState();
  const [getQuizId, setGetQuizId] = useState();
  const [listChange, setListChange] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [quizType, setQuizType] = useState();
  const [quizWeek, setQuizWeek] = useState();

  const [numQuestions, setNumQuestions] = useState(5);
  const [AssignQuestions, setAssignQuestions] = useState([
    {
      id: "question1",
      question: "",
      options: [
        { id: "optionOne", isCorrect: "" },
        { id: "optionTwo", isCorrect: "" },
      ],
    },
    {
      id: "question2",
      question: "",
      options: [
        { id: "optionOne", isCorrect: "" },
        { id: "optionTwo", isCorrect: "" },
      ],
    },
  ]);
  const [error, setError] = useState(false);

  const [questionError, setQuestionError] = useState();

  const [isCorrectError, setIsCorrectError] = useState();

  console.log(questionError);

  console.log(isCorrectError);

  const numberOfChoices = [
    { id: "optionOne", rightAnswerNo: "rightAnswer1", letter: "TRUE" },
    { id: "optionTwo", rightAnswerNo: "rightAnswer2", letter: "FALSE" },
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

  console.log(AssignQuestions);

  const { id } = useParams();

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  const weekMod = pathArray[4];
  const currentWeek = weekMod.replace("week", "Week ");
  const weekForModule = weekMod.match(/\d+/)[0];
  const contentType = pathArray[5];
  console.log(weekForModule);
  // WEEK number
  const weekNumber = id.match(/\d+/)[0];
  console.log(weekNumber);

  useEffect(() => {
    if (courses) {
      return courses.map((item) => {
        if (item.courses == courseTitle) {
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
        if (
          ModuleId[1] == weekForModule &&
          officialQuiz.Quiz.quiz_type == "assignment"
        ) {
          setHasContent(true);
          const data = {
            answers: officialQuiz.Quiz.answers,
            questions: officialQuiz.Quiz.questions,
            options: officialQuiz.Quiz.options,
          };
          const answers = data.answers.split("|");
          const options = data.options.split("|");
          const questions = data.questions.split("|");

          const AssignQuestions = questions.map((question, index) => {
            const optionOneIsCorrect = answers[index] === "optionOne";
            const optionTwoIsCorrect = answers[index] === "optionTwo";
            return {
              id: `question${index + 1}`,
              question: question,
              options: [
                { id: "optionOne", isCorrect: optionOneIsCorrect },
                { id: "optionTwo", isCorrect: optionTwoIsCorrect },
              ],
            };
          });

          const NumberOfQuestion = [];
          for (let i = 1; i <= AssignQuestions.length; i++) {
            const numberOfQuestionForRadio = {
              question: `Question ${i}`,
              questionNumber: `question${i}`,
              radio: `radio${i}`,
            };

            NumberOfQuestion.push(numberOfQuestionForRadio);
          }
          setAssignQuestions(AssignQuestions);
          setNumberOfQuestions(NumberOfQuestion);

          setListChange(!listChange);
        }
      }
    };
    fetchContent();
  }, [officialQuiz]);
  console.log(AssignQuestions);

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

    let arr = [...AssignQuestions];
    arr.forEach((item) => {
      if (item.id == name) {
        item.question = value;
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

    setAssignQuestions(arr);
  };

  // Mapping Question for optimization
  const numberOfQuestionsHandler = () => {
    return numberOfQuestions.map((numOfQuestion, index) => {
      console.log(index);
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
                error && questionError && AssignQuestions[index].question === ""
                  ? "errorInput"
                  : ""
              }`}
              type="text"
              value={AssignQuestions[index].question}
              name={questionNumber}
              required
              onChange={(e) => {
                setQuestionHandler(e);
              }}
            />
          </div>
          <div className="d-block d-sm-flex">
            {multipleChoiceHandler(questionNumber, radioNumber, index)}
          </div>
        </div>
      );
    });
  };

  // Mapping Options for optimization
  const multipleChoiceHandler = (questionNumber, radioNumber, index) => {
    return numberOfChoices.map((choice, i) => {
      const choiceLetterHandler = () => {
        if (choice.letter == "TRUE") {
          return (
            <label
              className="DevTrueChoices my-auto fw-semibold"
              htmlFor={choice.letter}
            >
              {choice.letter}
            </label>
          );
        } else {
          return (
            <label className="my-auto me-2 fw-semibold" htmlFor={choice.letter}>
              {choice.letter}
            </label>
          );
        }
      };

      return (
        <div className="d-flex mb-2 mb-sm-0" key={choice.id}>
          {choiceLetterHandler()}

          <div
            className={`form-check input-group-text my-0 me-3 ${
              error &&
              isCorrectError &&
              AssignQuestions[index].options[i].isCorrect === ""
                ? "errorInput"
                : ""
            }`}
          >
            <input
              disabled={true}
              className={`form-check-input me-2 ms-1 `}
              type="radio"
              name={radioNumber}
              value={AssignQuestions[index].options[i].isCorrect}
              checked={AssignQuestions[index].options[i].isCorrect === true}
              data-option={questionNumber}
              data-radio={choice.id}
              id={questionNumber + choice.rightAnswerNo}
              onChange={setQuestionHandler}
            />
            <label
              htmlFor={questionNumber + choice.rightAnswerNo}
              className="form-check-label"
            >
              Right Answer
            </label>
          </div>
        </div>
      );
    });
  };

  // Render it all here
  console.log(quiz !== undefined && quiz.week);

  const Mappedquiz = () => {
    if (quiz !== undefined) {
      quiz.quiz.filter((quiz) => {
        console.log(quiz);
        return quiz.quiz_type == "assignment";
      });
    }
  };

  console.log(Mappedquiz);
  return (
    <div className="mb-4 w-100">
      <label className="fs-5 fw-semibold">Assignment</label>
      {quiz !== undefined &&
      quiz !== null &&
      quiz.quiz.length !== 0 &&
      quizWeek == weekForModule &&
      quizType == "assignment" ? (
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

export default ManagetGetAssignment;
