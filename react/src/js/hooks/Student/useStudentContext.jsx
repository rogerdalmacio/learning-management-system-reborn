import { useContext } from "react";
import StudentContext from "../../context/Student/StudContextProvider";

const StudentContextProvider = () => {
    return useContext(StudentContext);
};

export default StudentContextProvider;
