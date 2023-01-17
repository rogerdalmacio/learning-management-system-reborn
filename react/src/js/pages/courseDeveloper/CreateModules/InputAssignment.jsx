import React, { useEffect, useState } from "react";
// import useCreateModule from "../../../hooks/CourseDev/useCreateModule";

function InputAssignment() {
    // States
    const [AssignQuestions, setAssignQuestions] = useState([
        {
            id: "question1",
            question: "",
            options: [
                { id: "option1", isCorrect: "" },
                { id: "option2", isCorrect: "" },
            ],
        },
        {
            id: "question2",
            question: "",
            options: [
                { id: "option1", isCorrect: "" },
                { id: "option2", isCorrect: "" },
            ],
        },
        {
            id: "question3",
            question: "",
            options: [
                { id: "option1", isCorrect: "" },
                { id: "option2", isCorrect: "" },
            ],
        },
        {
            id: "question4",
            question: "",
            options: [
                { id: "option1", isCorrect: "" },
                { id: "option2", isCorrect: "" },
            ],
        },
        {
            id: "question5",
            question: "",
            options: [
                { id: "option1", isCorrect: "" },
                { id: "option2", isCorrect: "" },
            ],
        },
        {
            id: "question6",
            question: "",
            options: [
                { id: "option1", isCorrect: "" },
                { id: "option2", isCorrect: "" },
            ],
        },
        {
            id: "question7",
            question: "",
            options: [
                { id: "option1", isCorrect: "" },
                { id: "option2", isCorrect: "" },
            ],
        },
        {
            id: "question8",
            question: "",
            options: [
                { id: "option1", isCorrect: "" },
                { id: "option2", isCorrect: "" },
            ],
        },
        {
            id: "question9",
            question: "",
            options: [
                { id: "option1", isCorrect: "" },
                { id: "option2", isCorrect: "" },
            ],
        },
        {
            id: "question10",
            question: "",
            options: [
                { id: "option1", isCorrect: "" },
                { id: "option2", isCorrect: "" },
            ],
        },
    ]);
    const [error, setError] = useState(false);

    const [questionError, setQuestionError] = useState();

    const [isCorrectError, setIsCorrectError] = useState();

    console.log(questionError);

    console.log(isCorrectError);

    const numberOfChoices = [
        { id: "option1", rightAnswerNo: "rightAnswer1", letter: "TRUE" },
        { id: "option2", rightAnswerNo: "rightAnswer2", letter: "FALSE" },
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
        let filterQuestion = AssignQuestions.filter(
            (item) => item.question === ""
        );

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

        if (filterIsCorrectAgain.length !== 10) {
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
                                AssignQuestions[index].question === ""
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
                    <div className="d-flex">
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
                <div className="d-flex" key={choice.id}>
                    <label
                        className="my-auto me-2 fw-semibold"
                        htmlFor={choice.letter}
                    >
                        {choice.letter}
                    </label>

                    <div
                        className={`form-check input-group-text my-0 me-3 ${
                            error &&
                            isCorrectError &&
                            AssignQuestions[index].options[i].isCorrect === ""
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
            <label className="fs-5 fw-semibold">Input Assignment : </label>
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

export default InputAssignment;
