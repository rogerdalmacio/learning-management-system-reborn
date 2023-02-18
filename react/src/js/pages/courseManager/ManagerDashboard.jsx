import React, { useState, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagerCreatedCourse from "./ManagerCreatedCourse";
import axios from "axios";
import Modal from "./Modal";

function ManagerDashboard() {
    const { userInfo, token } = useAuth();

    const [addSubject, setAddSubject] = useState(false);
    const [error, setError] = useState(false);
    const [subject, setSubject] = useState({
        course: "",
        course_code: "",
        approval: 0,
        department: userInfo.department,
        modules: 18,
    });

    const SubmitCourseHandler = (e) => {
        e.preventDefault();

        if (
            subject.course === "" ||
            subject.course === 0 ||
            subject.course_code === "" ||
            subject.course_code === 0
        ) {
            setError(true);
        } else {
            const toastId = toast.info("Sending Request...");
            const response = axios

                .post(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/coursemanager/course`,
                    subject,
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
                    if (
                        response.status >= 200 &&
                        response.status < 300 &&
                        response.data[0] !== "already exist"
                    ) {
                        toast.update(toastId, {
                            render: "Request Successfully",
                            type: toast.TYPE.SUCCESS,
                            autoClose: 2000,
                        });
                        setSubject({
                            course: "",
                            course_code: "",
                            approval: 0,
                            department: userInfo.department,
                            modules: 18,
                        });
                    } else if (response.data[0] == "already exist") {
                        throw new Error("Course is already exists");
                    } else {
                        throw new Error(
                            response.status || "Something Went Wrong!"
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.update(toastId, {
                        render: `${error.message}`,
                        type: toast.TYPE.ERROR,
                        autoClose: 2000,
                    });
                });
        }
    };

    return (
        <div className="">
            <div className=" row m-0 px-0">
                <h3 className="p-0">Create Subject/s</h3>
                <div className="col-12 col-sm-7 px-0 mx-0 mx-sm-3">
                    <button
                        className="buttonTemplate fs-6 sumbit-button btn px-5"
                        onClick={() => {
                            setAddSubject(true);
                        }}
                    >
                        Add Subject +
                    </button>
                    <Modal
                        addSubject={addSubject}
                        setAddSubject={setAddSubject}
                        error={error}
                        setError={setError}
                        subject={subject}
                        setSubject={setSubject}
                        SubmitCourseHandler={SubmitCourseHandler}
                    />
                </div>
            </div>

            <ManagerCreatedCourse />
        </div>
    );
}

export default ManagerDashboard;
