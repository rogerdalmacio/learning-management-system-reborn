import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import useAuth from "../../../hooks/useAuth";
import DevCreateExamState from "./DevCreateExamState/DevCreateExamOptionsState";
import numberOfQuestions from "./DevCreateExamState/DevCreateExamQuestionState";
import { toast } from "react-toastify";

function DevCreateExam() {
    const { id } = useParams();
    const { course } = useGetAvailableCourse();
    const { token } = useAuth();

    console.log(id);

    const ExamNewWord =
        id[0].toUpperCase() +
        id.slice(1).split("examination").join(" Examination");
    console.log(ExamNewWord); // Output: "Preliminary Examination"

    // States
    const [moduleId, setModuleId] = useState();
    const [term, setTerm] = useState();
    const [AAEquestions, setAAEQuestions] = useState(DevCreateExamState);
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

    console.log(AAEquestions);

    console.log(id);

    // Course Title
    const pathname = window.location.pathname;

    const pathArray = pathname.split("/");
    const courseBase = pathArray[2];

    const courseTitle = courseBase.replace(/%20/g, " ");

    // WEEK number
    const pathname1 = window.location.pathname;

    const pathArray1 = pathname1.split("/");
    const numberofWeek = pathArray1[4];
    const weekNumber = numberofWeek.match(/\d+/)[0];
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
    const SubmitQuizHandler = async () => {
        let toastId;

        if (
            questionError === true ||
            textError === true ||
            isCorrectError === true
        ) {
            toast.error("You must fill out the blank area");
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
                quiz_type: id,
                preliminaries: term,
                questions: questions,
                answers: correctAnswers,
                options: options,
            };

            toastId = toast.info("Sending Request...");

            await axios
                .post(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/coursedeveloper/quiz`,
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
                    if (response.status >= 200 && response.status <= 300) {
                        toast.update(toastId, {
                            render: "Request Successfully",
                            type: toast.TYPE.SUCCESS,
                            autoClose: 2000,
                        });
                    } else {
                        throw new Error(
                            response.status || "Something Went Wrong!"
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.update(toastId, {
                        render: `${error.message}`,
                        type: toast.TYPE.ERROR,
                        autoClose: 2000,
                    });
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
        let filterQuestion = AAEquestions.filter(
            (item) => item.question === ""
        );

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

        if (filterIsCorrectAgain.length !== 50) {
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
                        <label
                            className="fw-semibold mb-2"
                            htmlFor={questionNumber}
                        >
                            {numOfQuestion.question}
                        </label>
                        <input
                            id={questionNumber}
                            className={`form-control ${
                                error &&
                                questionError &&
                                AAEquestions[index].question === ""
                                    ? "errorInput"
                                    : ""
                            }`}
                            type="text"
                            name={questionNumber}
                            required
                            onChange={(e) => {
                                setQuestionHandler(e);
                            }}
                        />
                    </div>
                    <div className="row gx-4 gy-2">
                        {multipleChoiceHandler(
                            questionNumber,
                            radioNumber,
                            index
                        )}
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
                        <label
                            className="m-auto me-2 fw-semibold"
                            htmlFor={choice.letter}
                        >
                            {choice.letter}.
                        </label>
                        <div className="QuizChoicesContainer d-block d-sm-flex input-group">
                            <input
                                type="text"
                                name={choice.id}
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
                                    AAEquestions[index].options[i].isCorrect ===
                                        ""
                                        ? "errorInput"
                                        : ""
                                }`}
                            >
                                <input
                                    className={`form-check-input me-1 ms-0 mt-0`}
                                    type="radio"
                                    name={radioNumber}
                                    data-option={questionNumber}
                                    data-radio={choice.id}
                                    id={questionNumber + choice.rightAnswerNo}
                                    onChange={setQuestionHandler}
                                />
                                <label
                                    htmlFor={
                                        questionNumber + choice.rightAnswerNo
                                    }
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
            <div className="inputAnalysisContainer sm-shadow py-3 px-0 px-sm-3 px-xl-5">
                {numberOfQuestionsHandler()}
                <div className="d-flex justify-content-end">
                    <p className="my-auto me-3 fst-italic text-danger">
                        {error && error
                            ? "*Please Fill Up The Blank Area*"
                            : ""}
                    </p>
                    <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={SubmitQuizHandler}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DevCreateExam;