import React, { useState, useEffect } from "react";
import Loading from "../../components/layouts/Loading";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import ManagerCreateSyllabusTItle from "./ManagerCreateSyllabusTItle";
import ArrowNextAndPrevious from "../../components/layouts/ArrowNextAndPrevious";

function ManagerCreateSyllabus() {
  const { token, role } = useAuth();

  const [course, setCourse] = useState();
  console.log(course);
  useEffect(() => {
    const GetCourseHandler = async () => {
      if (role === "CourseManager") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/coursemanager/course`,
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
            const data = response.data.Course;
            const newArray = data.map((item) => ({
              ...item,
              module: item.module.length,
            }));

            console.log(newArray);
            setCourse(newArray.sort((a, b) => b.id - a.id));
          });
      }
    };
    GetCourseHandler();
  }, []);

  const AvailableCourseHandler = () => {
    return course.map((item) => {
      const date = new Date(item.created_at);

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      const formattedDate = `${month} ${day}, ${year}`;

      return (
        <div key={item.id}>
          <Link
            to={`/courseManager/${item.course}/${item.id}/modules`}
            className="text-decoration-none"
          >
            <div className="DevCourseContainer py-3 px-2 mb-3 shadow p-3">
              <h2 className="DevCourseHeader mb-0 me-3 pe-3">{item.course}</h2>
              <div className="d-block d-sm-flex mt-2 justify-content-between align-items-center fst-italic">
                <p className="mb-0">{item.course_code}</p>
                <p className="m-0">Created at: {formattedDate}</p>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  };
  console.log(course);
  if (course) {
    return (
      <div>
        <ArrowNextAndPrevious>
          <h3 className="m-0">Create Syllabus</h3>
        </ArrowNextAndPrevious>
        <div className="mb-4">{AvailableCourseHandler()}</div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default ManagerCreateSyllabus;
