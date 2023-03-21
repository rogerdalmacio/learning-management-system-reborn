import { useContext } from "react";
import CourseContentContext from "../../context/CourseContent/CourseContentProvider";

const CourseContentProvider = () => {
  return useContext(CourseContentContext);
};

export default CourseContentProvider;
