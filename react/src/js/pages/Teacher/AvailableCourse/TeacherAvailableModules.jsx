import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/layouts/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CourseContentProvider from "../../../hooks/CourseContent/useCourseContent";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import useAuth from "../../../hooks/useAuth";

function TeacherAvailableModules() {
  const { courses } = CourseContentProvider();
  const { token } = useAuth();

  const { id } = useParams();
  const [courseId, setCourseId] = useState();
  const [approve, setApprove] = useState();
  console.log(id);

  useEffect(() => {
    if (courses !== undefined && courses !== null) {
      const course = courses
        .filter((item) => item.course == id)
        .map((ite) => {
          return { id: ite.id, approval: ite.approval };
        });
      console.log(course);
      setCourseId(parseInt(course[0].id));
    }
  });

  useEffect(() => {
    if (courses !== undefined && courses !== null) {
      const course = courses
        .filter((item) => item.course == id)
        .map((ite) => {
          return { id: ite.id, approval: ite.approval };
        });
      console.log(course);

      const approvalStatus = course[0].approval;
      const booleanValue = !!approvalStatus;
      console.log(booleanValue);
      setApprove(booleanValue);
    }
  }, [courseId]);

  console.log(approve);
  const handleToggle = async (e) => {
    setApprove(!approve);
    let toastId;

    const approveCourse = {
      approval: approve,
    };
    toastId = toast.info("Sending Request...");
    await axios
      .patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/coursemanager/courseapprove/${courseId}`,
        approveCourse,
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
        if (response.status >= 200 && response.status <= 300) {
          toast.update(toastId, {
            render: "Request Successfully",
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
          });
        } else {
          throw new Error(response.status || "Something Went Wrong!");
        }
      })
      .catch((error) => {
        if (error.response.data.errors) {
          // to access the subject itself you can use this : error.response.data.SubjectAlreadyExists[1]
          toast.update(toastId, {
            render: error.response.data.errors.id[0],
            type: toast.TYPE.ERROR,
            autoClose: 2000,
          });
          setIdAlreadyTaken(error.response.data.errors.id[0]);
        } else {
          toast.update(toastId, {
            render: `${error.message}`,
            type: toast.TYPE.ERROR,
            autoClose: 2000,
          });
        }
      });
  };

  console.log(approve);

  const GetModulesHandler = () => {
    if (courses) {
      return courses.map((item) => {
        if (item.course == id) {
          // setCourseId(item.id);
          return (
            <div key={item.id}>
              <ArrowNextAndPrevious>
                <h2>{item.course}</h2>
              </ArrowNextAndPrevious>
              <div>
                {item.module
                  .slice()
                  .sort((a, b) => {
                    return a.id.split("-")[1] - b.id.split("-")[1];
                  })
                  .map((mod) => {
                    const NameOfExam = () => {
                      if (mod.week == 6) {
                        return <p className="mb-0">Preliminary Examination</p>;
                      } else if (mod.week == 12) {
                        return <p className="mb-0">Midterm Examination</p>;
                      } else if (mod.week == 18) {
                        return <p className="mb-0">Final Examination</p>;
                      } else {
                        return <p className="mb-0">Examination</p>;
                      }
                    };

                    const CheckContentInside = () => {
                      if (mod.week % 6 === 0) {
                        return (
                          <div className="d-block d-sm-flex mt-2 justify-content-between align-items-center fst-italic">
                            {NameOfExam()}
                          </div>
                        );
                      } else {
                        return (
                          <div className="d-block d-sm-flex mt-2 justify-content-between align-items-center fst-italic">
                            <p className="mb-0">
                              1 Lesson 2 Activity 3 Quizzes
                            </p>
                          </div>
                        );
                      }
                    };
                    return (
                      <div key={mod.id}>
                        <Link
                          to={`/teacher/${item.course}/modules/week${mod.week}`}
                          className="text-decoration-none"
                        >
                          <div className="DevWeekContainer  shadow mb-3 py-3 px-2">
                            <h4>
                              Week {mod.week} - {mod.title}
                            </h4>
                            {CheckContentInside()}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        }
      });
    } else {
      return <Loading />;
    }
  };
  return <div>{GetModulesHandler()}</div>;
}

export default TeacherAvailableModules;
