import React, { useEffect, useState } from "react";

function InputAnalysis() {
    // States
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

        if (filterIsCorrectAgain.length !== 10) {
            setIsCorrectError(true);
        } else {
            setIsCorrectError(false);
        }
    }, [AAEquestions]);

    const InputAnalysisHandler = () => {
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
                                    ? "errorBorderColor"
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
                        <div className="input-group">
                            <input
                                type="text"
                                name={choice.id}
                                className={`form-control ${
                                    error &&
                                    textError &&
                                    AAEquestions[index].options[i].text === ""
                                        ? "errorBorderColor"
                                        : ""
                                }`}
                                data-option={questionNumber}
                                onChange={setQuestionHandler}
                            />
                            <div
                                className={`form-check input-group-text m-0 ${
                                    error &&
                                    isCorrectError &&
                                    AAEquestions[index].options[i].isCorrect ===
                                        ""
                                        ? "errorBorderColor"
                                        : ""
                                }`}
                            >
                                <input
                                    className={`form-check-input me-2 ms-1 `}
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
                                    className="form-check-label"
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
            <label className="fs-5 fw-semibold">Input Analysis : </label>
            <div className="p-3 inputAnalysisContainer shadow">
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
                        onClick={InputAnalysisHandler}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InputAnalysis;
