import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

function StudentIndividualSubjectTagging() {
    const { token } = useAuth();

    const [studentId, setStudentId] = useState();
    const [studentSubject, setStudentSubject] = useState();
    const [error, setError] = useState();

    const StudTagSubjSubmit = () => {
        let toastId;

        if (
            studentId == "" ||
            studentSubject == "" ||
            studentId == undefined ||
            studentSubject == undefined
        ) {
            setError(true);
            toast.error("you must fill up the blank");
        } else {
            setError(false);

            const item = {
                id: studentId,
                subjects: studentSubject,
            };

            toastId = toast.info("Sending Request...");

            axios
                .post(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/core/singlestudentsubjecttagging`,
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
                    if (response.status >= 200 && response.status <= 300) {
                        toast.update(toastId, {
                            render: "Request Successfully",
                            type: toast.TYPE.SUCCESS,
                            autoClose: 2000,
                        });
                    } else {
                        throw new Error(
                            response.status || "Something Went Wrong!"
                        );
                    }
                })
                .catch((error) => {
                    if (error.response.data.SubjectAlreadyExists) {
                        // to access the subject itself you can use this : error.response.data.SubjectAlreadyExists[1]
                        toast.update(toastId, {
                            render: `Subject is already exist`,
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
        <div>
            <h3 className="mb-4">Student - Individual Subject Tagging</h3>
            <div className="mb-3">
                <label
                    htmlFor="studentSubjectTaggingId"
                    className="form-label fw-semibold fs-6 w-100"
                >
                    Student ID
                </label>
                <input
                    type="text"
                    className={`inputField input-form form-control px-3 fs-6 fw-normal ${
                        studentId === "" || error
                            ? "errorInput"
                            : "noErrorInput"
                    }`}
                    id="studentSubjectTaggingId"
                    onChange={(e) => setStudentId(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    htmlFor="studentSubjectTaggingSubj"
                    className="form-label fw-semibold fs-6 w-100"
                >
                    Subject Code
                </label>
                <input
                    type="text"
                    className={`inputField input-form form-control px-3 fs-6 fw-normal ${
                        studentSubject === "" || error
                            ? "errorInput"
                            : "noErrorInput"
                    }`}
                    id="studentSubjectTaggingSubj"
                    onChange={(e) => setStudentSubject(e.target.value)}
                />
            </div>
            <button
                className="taggingSubjectButton buttonTemplate sumbit-button btn rounded-2 mt-3"
                onClick={StudTagSubjSubmit}
            >
                Submit
            </button>
        </div>
    );
}

export default StudentIndividualSubjectTagging;
