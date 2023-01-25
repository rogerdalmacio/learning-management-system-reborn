import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DevCreateExamState from "./DevCreateExamState/DevCreateExamOptionsState";
import numberOfQuestions from "./DevCreateExamState/DevCreateExamQuestionState";

function DevCreateExam() {
    const { id } = useParams();

    const ExamNewWord =
        id[0].toUpperCase() +
        id.slice(1).split("examination").join(" Examination");
    console.log(ExamNewWord); // Output: "Preliminary Examination"

    // States
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

    const SubmitQuizHandler = () => {
        if (
            questionError === true ||
            textError === true ||
            isCorrectError === true
        ) {
            console.log("ERROR");
            setError(true);
        } else {
            console.log(AAEquestions);
            setError(false);
        }
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
