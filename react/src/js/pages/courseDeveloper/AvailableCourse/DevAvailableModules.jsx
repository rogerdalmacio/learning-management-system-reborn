import React from "react";
import { useParams } from "react-router-dom";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import Loading from "../../../components/layouts/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function DevAvailableModules() {
    const { course } = useGetAvailableCourse();

    const { id } = useParams();

    const GetModulesHandler = () => {
        if (course) {
            return course.map((item) => {
                if (item.course == id) {
                    return (
                        <div key={item.id}>
                            <h2>{item.course}</h2>
                            <div>
                                {item.module
                                    .slice()
                                    .sort((a, b) => {
                                        return (
                                            a.id.split("-")[1] -
                                            b.id.split("-")[1]
                                        );
                                    })
                                    .map((mod) => {
                                        const NameOfExam = () => {
                                            if (mod.week == 6) {
                                                return (
                                                    <p className="mb-0">
                                                        Preliminary Examination
                                                    </p>
                                                );
                                            } else if (mod.week == 12) {
                                                return (
                                                    <p className="mb-0">
                                                        Midterm Examination
                                                    </p>
                                                );
                                            } else if (mod.week == 18) {
                                                return (
                                                    <p className="mb-0">
                                                        Final Examination
                                                    </p>
                                                );
                                            } else {
                                                return (
                                                    <p className="mb-0">
                                                        Examination
                                                    </p>
                                                );
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
                                                            1 Lesson 2 Activity
                                                            3 Quizzes
                                                        </p>
                                                    </div>
                                                );
                                            }
                                        };
                                        return (
                                            <div key={mod.id}>
                                                <Link
                                                    to={`/developer/${item.course}/modules/week${mod.week}`}
                                                    className="text-decoration-none"
                                                >
                                                    <div className="DevWeekContainer shadow mb-3 py-3 px-2">
                                                        <h4>Week {mod.week}</h4>
                                                        {CheckContentInside()}
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                } else {
                    toast.error(
                        "The URL is not matched on the Subject being rendered"
                    );
                }
            });
        } else {
            return (
                <div className="position-relative">
                    <Loading />
                </div>
            );
        }
    };
    return <div>{GetModulesHandler()}</div>;
}

export default DevAvailableModules;
