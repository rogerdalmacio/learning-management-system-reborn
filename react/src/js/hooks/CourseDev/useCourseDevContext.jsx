import { useContext } from "react";
import CourseDevContext from "../../context/CourseDev/CourseDevContextProvider";

const CourseDevContextProvider = () => {
  return useContext(CourseDevContext);
};

export default CourseDevContextProvider;
