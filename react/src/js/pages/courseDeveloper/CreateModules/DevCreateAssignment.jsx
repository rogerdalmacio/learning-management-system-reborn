import React, { useEffect, useState } from "react";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import useCourseDevContext from "../../../hooks/CourseDev/useCourseDevContext";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function DevCreateAssignment() {
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
  } = useCourseDevContext();
  const { course } = useGetAvailableCourse();
  const { token } = useAuth();

  const [moduleId, setModuleId] = useState();
  const [term, setTerm] = useState();
  const [getQuizId, setGetQuizId] = useState();
  const [listChange, setListChange] = useState(false);
  const [hasContent, setHasContent] = useState(false);

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

  console.log(moduleId);
  const handleInputChange = (event) => {
    const { value } = event.target;
    const newValue = parseInt(value);
    console.log(newValue);

    setNumQuestions(isNaN(newValue) ? "" : newValue);
  };
  console.log(numQuestions);
  const generateDummyData = () => {
    if (numQuestions <= 100 && numQuestions >= 1) {
      const data = [];
      const NumberOfQuestion = [];
      for (let i = 1; i <= numQuestions; i++) {
        const question = {
          id: `question${i}`,
          question: "",
          options: [
            { id: "optionOne", isCorrect: "" },
            { id: "optionTwo", isCorrect: "" },
          ],
        };
        data.push(question);

        const numberOfQuestionForRadio = {
          question: `Question ${i}`,
          questionNumber: `question${i}`,
          radio: `radio${i}`,
        };

        NumberOfQuestion.push(numberOfQuestionForRadio);
      }
      setAssignQuestions(data);
      setNumberOfQuestions(NumberOfQuestion);
    } else {
      toast.error("Please Enter a number between 1-100 only");
    }
  };
  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  const weekMod = pathArray[4];
  const currentWeek = weekMod.replace("week", "Week ");
  const weekForModule = weekMod.match(/\d+/)[0];
  const contentType = pathArray[5];

  // WEEK number
  const weekNumber = id.match(/\d+/)[0];
  console.log(weekNumber);

  useEffect(() => {
    if (course) {
      return course.map((item) => {
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
        const ModuleId = officialQuiz.Quiz[0].module_id.split("-");
        if (
          ModuleId[1] == weekForModule &&
          officialQuiz.Quiz[0].quiz_type == "assignment"
        ) {
          setHasContent(true);
          const data = {
            answers: officialQuiz.Quiz[0].answers,
            questions: officialQuiz.Quiz[0].questions,
            options: officialQuiz.Quiz[0].options,
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

  const SubmitQuizHandler = async () => {
    let toastId;

    if (questionError === true || isCorrectError === true) {
      console.log("ERROR");
      toast.error("You must fill out the blank area");
      setError(true);
    } else {
      console.log(AssignQuestions);
      setError(false);

      // Questions
      const questions = AssignQuestions.reduce(
        (acc, curr) => `${acc}|${curr.question}`,
        ""
      ).slice(1);
      console.log(questions);

      // Options
      const options = AssignQuestions.map((question) => {
        return question.options.map((option) => option.id).join("|");
      }).join("|");
      console.log(options);

      // Correct Answer
      const correctAnswers = AssignQuestions.map((question) => {
        const correctOption = question.options.find(
          (option) => option.isCorrect === true
        );
        return correctOption.id;
      }).join("|");
      console.log(correctAnswers);

      let activity = {
        module_id: moduleId,
        quiz_type: "assignment",
        preliminaries: term,
        questions: questions,
        answers: correctAnswers,
        options: options,
      };

      toastId = toast.info("Sending Request...");

      await axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/coursedeveloper/quiz`,
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
            setHasChange(!hasChange);
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

  const EditQuizHandler = async () => {
    let toastId;

    if (questionError === true || isCorrectError === true) {
      console.log("ERROR");
      toast.error("You must fill out the blank area");
      setError(true);
    } else {
      console.log(AssignQuestions);
      setError(false);

      // Questions
      const questions = AssignQuestions.reduce(
        (acc, curr) => `${acc}|${curr.question}`,
        ""
      ).slice(1);
      console.log(questions);

      // Options
      const options = AssignQuestions.map((question) => {
        return question.options.map((option) => option.id).join("|");
      }).join("|");
      console.log(options);

      // Correct Answer
      const correctAnswers = AssignQuestions.map((question) => {
        const correctOption = question.options.find(
          (option) => option.isCorrect === true
        );
        return correctOption.id;
      }).join("|");
      console.log(correctAnswers);

      let activity = {
        module_id: moduleId,
        quiz_type: "assignment",
        preliminaries: term,
        questions: questions,
        answers: correctAnswers,
        options: options,
      };

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
            setHasChange(!hasChange);
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

  useEffect(() => {
    // Error Handling : filtering the questions.question if it has an empty string
    let filterQuestion = AssignQuestions.filter((item) => item.question === "");

    if (filterQuestion.length !== 0) {
      setQuestionError(true);
    } else {
      setQuestionError(false);
    }

    //Error Handling : filtering the question.options[].isCorrect if it has an empty string
    let filterIsCorrect = AssignQuestions.map((item, i) =>
      item.options.filter((opt) => opt.isCorrect === "")
    );

    let filterIsCorrectAgain = filterIsCorrect.filter((x) => x.length == 0);

    if (filterIsCorrectAgain.length !== AssignQuestions.length) {
      setIsCorrectError(true);
    } else {
      setIsCorrectError(false);
    }
  }, [AssignQuestions]);

  const InputAnalysisHandler = () => {
    if (questionError === true || isCorrectError === true) {
      console.log("ERROR");
      setError(true);
    } else {
      console.log(AssignQuestions);
      setError(false);
    }
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

  return (
    <div className="mb-4 w-100">
      <ArrowNextAndPrevious>
        <label className="fs-5 fw-semibold">Assignment {currentWeek}</label>
      </ArrowNextAndPrevious>
      <div className="p-3 inputAnalysisContainer">
        <div className={`input-group mb-3 ${hasContent ? "d-none" : "d-flex"}`}>
          <input
            className="InputChoices form-control"
            type="number"
            value={numQuestions}
            onChange={handleInputChange}
          />

          <button
            type="button"
            className="btn smallButtonTemplateForInputGroup"
            onClick={generateDummyData}
          >
            Generate
          </button>
        </div>
        {numberOfQuestionsHandler()}
        <div className="d-flex justify-content-end">
          <p className="my-auto me-3 fst-italic text-danger">
            {error && error ? "*Please fill out The Blank Area*" : ""}
          </p>
          <button
            type="button"
            className="smallButtonTemplate text-right sumbit-button btn px-5"
            onClick={hasContent ? EditQuizHandler : SubmitQuizHandler}
          >
            {hasContent ? <span>Submit Changes</span> : <span>Submit</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DevCreateAssignment;
