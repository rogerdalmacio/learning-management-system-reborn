import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/layouts/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CourseContentProvider from "../../../hooks/CourseContent/useCourseContent";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function ManagerAvailableModules() {
  const { courses } = CourseContentProvider();

  const { id } = useParams();

  const GetModulesHandler = () => {
    if (courses) {
      return courses.map((item) => {
        if (item.course == id) {
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
                    console.log(mod);
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
                          to={`/courseManager/${item.course}/modules/week${mod.week}`}
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

export default ManagerAvailableModules;
