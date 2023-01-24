import React, { useEffect, useState } from "react";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import { Link } from "react-router-dom";
import Loading from "../../../components/layouts/Loading";

function DevAvailableCourse() {
    const { course } = useGetAvailableCourse();

    const AvailableCourseHandler = () => {
        if (course) {
            return course.map((item) => {
                const count = item.module.reduce((acc, curr) => acc + 1, 0);

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
                            to={`/developer/${item.course}/modules`}
                            className="text-decoration-none"
                        >
                            <div className="DevCourseContainer py-3 px-2 mb-3 shadow p-3">
                                <h2 className="DevCourseHeader mb-0 me-3 pe-3">
                                    {item.course}
                                </h2>
                                <div className="d-block d-sm-flex mt-2 justify-content-between align-items-center fst-italic">
                                    <p className="mb-0">
                                        Contains {count} Modules
                                    </p>
                                    <p className="m-0">
                                        Created at: {formattedDate}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            });
        } else {
            return (
                <div className="position-relative">
                    <Loading />
                </div>
            );
        }
    };
    return (
        <div>
            <h2>Course/s</h2>
            <div className="ms-4">{AvailableCourseHandler()}</div>
        </div>
    );
}

export default DevAvailableCourse;
