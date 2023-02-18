import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

function SuperCreateStudentAcct() {
    const { token } = useAuth();

    const [userInfo, setUserInfo] = useState({
        id: "",
        first_name: "",
        last_name: "",
        department: "",
        year_and_section: "",
        major: "",
        program: "",
    });
    const [error, setError] = useState(false);

    const submitUserInfo = async (e) => {
        e.preventDefault();
        let toastId;

        if (
            userInfo.id == "" ||
            userInfo.first_name == "" ||
            userInfo.last_name == "" ||
            userInfo.section == "" ||
            userInfo.department == "" ||
            userInfo.year_and_section == "" ||
            userInfo.major == ""
        ) {
            setError(true);
            toast.error("Please fill out the blank area");
        } else {
            toastId = toast.info("Sending Request...");

            await axios
                .post(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/core/createsinglestudent`,
                    userInfo,
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
                    if (error.response.data.errors) {
                        // to access the subject itself you can use this : error.response.data.SubjectAlreadyExists[1]
                        toast.update(toastId, {
                            render: error.response.data.errors.id[0],
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({ ...prevState, [name]: value }));
    };
    console.log(userInfo);
    return (
        <div>
            <form onSubmit={submitUserInfo}>
                <h3 className="mb-3">Student - Create Account</h3>
                <div className="row">
                    <div className="col-6">
                        <label className="mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="Juan"
                            name="first_name"
                            value={userInfo.first_name}
                            className={`smallInputField mb-3 input-form form-control px-3 fs-6 fw-normal ${
                                userInfo.first_name === "" && error
                                    ? "errorInput"
                                    : "noErrorInput"
                            }`}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-6">
                        <label className="mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Dela Cruz"
                            name="last_name"
                            value={userInfo.last_name}
                            className={`smallInputField mb-3 input-form form-control px-3 fs-6 fw-normal ${
                                userInfo.last_name === "" && error
                                    ? "errorInput"
                                    : "noErrorInput"
                            }`}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label className="mb-2" htmlFor="studId">
                            Student ID
                        </label>
                        <input
                            id="studId"
                            placeholder="00000000"
                            type="number"
                            name="id"
                            value={userInfo.id}
                            className={`smallInputField mb-3 input-form form-control px-3 fs-6 fw-normal ${
                                userInfo.id === "" && error
                                    ? "errorInput"
                                    : "noErrorInput"
                            }`}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-6">
                        <label className="mb-2" htmlFor="department">
                            Department
                        </label>
                        <input
                            id="department"
                            type="text"
                            placeholder="CCS"
                            name="department"
                            value={userInfo.department}
                            className={`smallInputField mb-3 input-form form-control px-3 fs-6 fw-normal ${
                                userInfo.department === "" && error
                                    ? "errorInput"
                                    : "noErrorInput"
                            }`}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label className="mb-2" htmlFor="year_and_section">
                            Year and Section
                        </label>
                        <input
                            id="year_and_section"
                            type="number"
                            placeholder="0000"
                            name="year_and_section"
                            value={userInfo.year_and_section}
                            className={`smallInputField mb-3 input-form form-control px-3 fs-6 fw-normal ${
                                userInfo.year_and_section === "" && error
                                    ? "errorInput"
                                    : "noErrorInput"
                            }`}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-6">
                        <label className="mb-2" htmlFor="program">
                            Program
                        </label>
                        <input
                            id="program"
                            type="text"
                            placeholder="BSIT"
                            name="program"
                            value={userInfo.program}
                            className={`smallInputField mb-3 input-form form-control px-3 fs-6 fw-normal ${
                                userInfo.program === "" && error
                                    ? "errorInput"
                                    : "noErrorInput"
                            }`}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-6">
                        <label className="mb-2" htmlFor="major">
                            major
                        </label>
                        <input
                            id="major"
                            type="text"
                            placeholder="IM"
                            name="major"
                            value={userInfo.major}
                            className={`smallInputField mb-3 input-form form-control px-3 fs-6 fw-normal ${
                                userInfo.major === "" && error
                                    ? "errorInput"
                                    : "noErrorInput"
                            }`}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        className="uploadButton smallButtonTemplate sumbit-button btn rounded-2 mt-3"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SuperCreateStudentAcct;
