// import { useState, createContext } from "react";

// const CreateModuleContext = createContext({});

// export const CreateModuleProvider = ({ children }) => {
//     // const [AAEquestions, setAAEQuestions] = useState([
//     //     {
//     //         id: "question1",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question2",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question3",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question4",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question5",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question6",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question7",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question8",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question9",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question10",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     // ]);

//     // const [EvalQuestions, setEvalQuestions] = useState([
//     //     {
//     //         id: "question1",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question2",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question3",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question4",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question5",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question6",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question7",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question8",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question9",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question10",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", text: "", isCorrect: "" },
//     //             { id: "option2", text: "", isCorrect: "" },
//     //             { id: "option3", text: "", isCorrect: "" },
//     //             { id: "option4", text: "", isCorrect: "" },
//     //         ],
//     //     },
//     // ]);

//     // const [AssignQuestions, setAssignQuestions] = useState([
//     //     {
//     //         id: "question1",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", isCorrect: "" },
//     //             { id: "option2", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question2",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", isCorrect: "" },
//     //             { id: "option2", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question3",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", isCorrect: "" },
//     //             { id: "option2", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question4",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", isCorrect: "" },
//     //             { id: "option2", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question5",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", isCorrect: "" },
//     //             { id: "option2", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question6",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", isCorrect: "" },
//     //             { id: "option2", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question7",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", isCorrect: "" },
//     //             { id: "option2", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question8",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", isCorrect: "" },
//     //             { id: "option2", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question9",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", isCorrect: "" },
//     //             { id: "option2", isCorrect: "" },
//     //         ],
//     //     },
//     //     {
//     //         id: "question10",
//     //         question: "",
//     //         options: [
//     //             { id: "option1", isCorrect: "" },
//     //             { id: "option2", isCorrect: "" },
//     //         ],
//     //     },
//     // ]);

//     return (
//         <CreateModuleContext.Provider
//             value={{
//                 AAEquestions,
//                 setAAEQuestions,
//                 EvalQuestions,
//                 setEvalQuestions,
//                 AssignQuestions,
//                 setAssignQuestions,
//             }}
//         >
//             {children}
//         </CreateModuleContext.Provider>
//     );
// };

// export default CreateModuleContext;
