
import { useContext } from "react";
import GetAvailableCourseContext from "../../context/CourseDev/GetAvailableCourseProvider";

const useGetAvailableCourse = () => {
    return useContext(GetAvailableCourseContext);
};

export default useGetAvailableCourse;
