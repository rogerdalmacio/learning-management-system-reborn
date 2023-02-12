import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

function TeacherIndividualSubjectTagging() {
    const { token } = useAuth();

    const [teacherId, setTeacherId] = useState();
    const [teacherSubject, setTeacherSubject] = useState();
    const [error, setError] = useState();

    const TeacherTagSubjSubmit = () => {
        let toastId;

        if (
            teacherId == "" ||
            teacherSubject == "" ||
            teacherId == undefined ||
            teacherSubject == undefined
        ) {
            setError(true);
            toast.error("you must fill up the blank");
        } else {
            setError(false);

            const item = {
                id: teacherId,
                subjects: teacherSubject,
            };

            toastId = toast.info("Sending Request...");

            axios
                .post(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/core/singleteachersubjecttagging`,
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
                    console.log(error);
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
            <h3 className="mb-4">Teacher - Individual Subject Tagging</h3>
            <div className="mb-3">
                <label
                    htmlFor="teacherSubjectTaggingId"
                    className="form-label fw-semibold fs-6 w-100"
                >
                    Teacher ID
                </label>
                <input
                    type="text"
                    className={`inputField input-form form-control px-3 fs-6 fw-normal ${
                        teacherId === "" || error
                            ? "errorInput"
                            : "noErrorInput"
                    }`}
                    id="teacherSubjectTaggingId"
                    onChange={(e) => setTeacherId(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    htmlFor="TeacherSubjectTaggingSubj"
                    className="form-label fw-semibold fs-6 w-100"
                >
                    Subject Code
                </label>
                <input
                    type="text"
                    className={`inputField input-form form-control px-3 fs-6 fw-normal ${
                        teacherSubject === "" || error
                            ? "errorInput"
                            : "noErrorInput"
                    }`}
                    id="TeacherSubjectTaggingSubj"
                    onChange={(e) => setTeacherSubject(e.target.value)}
                />
            </div>
            <button
                className="taggingSubjectButton buttonTemplate sumbit-button btn rounded-2 mt-3"
                onClick={TeacherTagSubjSubmit}
            >
                Submit
            </button>
        </div>
    );
}

export default TeacherIndividualSubjectTagging;
