import React, { useState, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagerCreatedCourse from "./ManagerCreatedCourse";
import axios from "axios";

function ManagerDashboard() {
    const { userInfo, token } = useAuth();

    const [addSubject, setAddSubject] = useState(false);
    const [error, setError] = useState(false);
    const [subject, setSubject] = useState({
        course: "",
        course_code: "",
        approval: 0,
        departments: userInfo.department,
        modules: 18,
    });
    console.log(subject.modules);

    console.log(subject);

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
                    "http://127.0.0.1:8000/api/coursemanager/course",
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
                    console.log(response.status);
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
                    } else if (response.data[0] == "already exist") {
                        throw new Error("Course is already exists");
                    } else {
                        console.log(response.status);
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

    const getValueOfInputHandler = (e) => {
        setSubject({ ...subject, [e.target.name]: e.target.value });
    };

    const addSubjectHandler = () => {
        if (addSubject) {
            return (
                <form
                    onSubmit={SubmitCourseHandler}
                    className="py-4 px-sm-5 py-sm-4"
                >
                    <h4>Department: {userInfo.department}</h4>
                    <label htmlFor="inputTitle">
                        <h4 className="fs-5">Enter Subject</h4>
                    </label>
                    <input
                        id="inputTitle"
                        className={`inputField mb-3 input-form form-control px-3 fs-6 fw-normal ${
                            subject.course === "" && error
                                ? "errorInput"
                                : "noErrorInput"
                        }`}
                        type="text"
                        name="course"
                        value={subject.course}
                        onChange={getValueOfInputHandler}
                    />
                    <label htmlFor="inputCode">
                        <h4 className="fs-5">Enter Subject Code</h4>
                    </label>
                    <input
                        id="inputCode"
                        className={`inputField mb-3 input-form form-control px-3 fs-6 fw-normal ${
                            subject.course_code === "" && error
                                ? "errorInput"
                                : "noErrorInput"
                        }`}
                        type="text"
                        name="course_code"
                        value={subject.course_code}
                        onChange={getValueOfInputHandler}
                    />
                    <label htmlFor="inputCode">
                        <h4 className="fs-5">Enter Number of modules</h4>
                    </label>
                    <div id="dropdown" className="dropdown mb-3">
                        <button
                            className="dropdownMenu px-3 fw-normal btn dropdown-toggle w-100 d-flex justify-content-between align-items-center dropDownBorder border-0"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {subject.modules}
                        </button>
                        <ul className="dropdown-menu w-100">
                            <li>
                                <button
                                    value={18}
                                    type="button"
                                    className={`dropdown-item`}
                                    name="modules"
                                    onClick={getValueOfInputHandler}
                                >
                                    18
                                </button>
                            </li>
                            <li>
                                <button
                                    value={20}
                                    type="button"
                                    className={`dropdown-item`}
                                    name="modules"
                                    onClick={getValueOfInputHandler}
                                >
                                    20
                                </button>
                            </li>
                            <li>
                                <button
                                    value={22}
                                    type="button"
                                    className={`dropdown-item`}
                                    name="modules"
                                    onClick={getValueOfInputHandler}
                                >
                                    22
                                </button>
                            </li>
                            <li>
                                <button
                                    value={24}
                                    type="button"
                                    className={`dropdown-item`}
                                    name="modules"
                                    onClick={getValueOfInputHandler}
                                >
                                    24
                                </button>
                            </li>
                        </ul>
                    </div>
                    <p className="me-3 my-2 fst-italic fs-6 text-danger">
                        {error && error
                            ? "*Please Fill Up The Blank Area*"
                            : ""}
                    </p>
                    <div className="d-flex justify-content-end">
                        <button className=" smallButtonTemplate text-right sumbit-button btn px-5">
                            Submit
                        </button>
                    </div>
                </form>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="">
            <div className=" row m-0 px-0  position-relative">
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
                </div>
            </div>
            {addSubjectHandler()}
            <ManagerCreatedCourse />
        </div>
    );
}

export default ManagerDashboard;
