import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

function AdminSingleGrantExam() {
    const { token } = useAuth();

    const [studentId, setStudentId] = useState("");
    const [preliminariesValue, setPreliminariesValue] =
        useState("Preliminary Exam");
    const [preliminariesName, setPrelimnariesName] = useState("prelim");
    const [error, setError] = useState();
    console.log(preliminariesName);
    console.log(studentId);

    const SubmitButton = () => {
        let toastId;

        if (
            studentId == "" ||
            preliminariesName == "" ||
            studentId == undefined ||
            preliminariesName == undefined
        ) {
            setError(true);
            toast.error("Please fill out the blank area");
        } else {
            setError(false);

            const item = {
                student_id: studentId,
                grant: 1,
                preliminaries: preliminariesName,
            };

            console.log(item);

            toastId = toast.info("Sending Request...");

            axios
                .post(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/core/singlegrantexam`,
                    item,
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
                        if (response.data.length !== 0) {
                            toast.update(toastId, {
                                render: `Student ID is ${response.data[0]}`,
                                type: toast.TYPE.ERROR,
                                autoClose: 2000,
                            });
                        } else {
                            toast.update(toastId, {
                                render: "Request Successfully",
                                type: toast.TYPE.SUCCESS,
                                autoClose: 2000,
                            });
                        }
                    } else {
                        throw new Error(
                            response.status || "Something Went Wrong!"
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data.message) {
                        toast.update(toastId, {
                            render: `${error.response.data.message}`,
                            type: toast.TYPE.ERROR,
                            autoClose: 2000,
                        });
                    } else {
                        toast.update(toastId, {
                            render: `${error.message}`,
                            type: toast.TYPE.ERROR,
                            autoClose: 2000,
                        });
                    }
                });
        }
    };

    return (
        <div className="w-100">
            <h3 className="mb-4">Student - Single Grant Exam</h3>
            <div className="mb-4">
                <label
                    htmlFor="studentId"
                    className="form-label fw-semibold fs-6 w-100 mb-3"
                >
                    <h5 className="mb-0">Student ID</h5>
                </label>
                <input
                    type="number"
                    className={`inputField input-form form-control px-3 fs-6 fw-normal ${
                        studentId === "" && error
                            ? "errorInput"
                            : "noErrorInput"
                    }`}
                    value={studentId}
                    id="studentId"
                    onChange={(e) => setStudentId(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="form-label fw-semibold fs-6 w-100 mb-3">
                    <h5 className="mb-0">Preliminaries</h5>
                </label>
                <div id="dropdown" className="dropdown">
                    <button
                        className="dropdownMenu px-3 fw-normal btn dropdown-toggle w-100 d-flex justify-content-between align-items-center dropDownBorder border-0"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {preliminariesValue}
                    </button>
                    <ul className="dropdown-menu w-100">
                        <li
                            className={`${
                                preliminariesValue == "Preliminary Exam"
                                    ? "d-none"
                                    : "d-block"
                            }`}
                        >
                            <button
                                value="Preliminary Exam"
                                name="prelim"
                                type="button"
                                className={`dropdown-item`}
                                onClick={(e) => {
                                    setPreliminariesValue(e.target.value);
                                    setPrelimnariesName(e.target.name);
                                }}
                            >
                                Preliminary Exam
                            </button>
                        </li>
                        <li
                            className={`${
                                preliminariesValue == "Midterm Exam"
                                    ? "d-none"
                                    : "d-block"
                            }`}
                        >
                            <button
                                value="Midterm Exam"
                                name="midterm"
                                type="button"
                                className={`dropdown-item`}
                                onClick={(e) => {
                                    setPreliminariesValue(e.target.value);
                                    setPrelimnariesName(e.target.name);
                                }}
                            >
                                Midterm Exam
                            </button>
                        </li>
                        <li
                            className={`${
                                preliminariesValue == "Finals Exam"
                                    ? "d-none"
                                    : "d-block"
                            }`}
                        >
                            <button
                                value="Finals Exam"
                                name="finals"
                                type="button"
                                className={`dropdown-item`}
                                onClick={(e) => {
                                    setPreliminariesValue(e.target.value);
                                    setPrelimnariesName(e.target.name);
                                }}
                            >
                                Finals Exam
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <button
                className="taggingSubjectButton buttonTemplate sumbit-button btn rounded-2 mt-3"
                onClick={SubmitButton}
            >
                Submit
            </button>
        </div>
    );
}

export default AdminSingleGrantExam;
