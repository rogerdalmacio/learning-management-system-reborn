import React from "react";
import useAuth from "../../hooks/useAuth";

function Modal({
    addSubject,
    setAddSubject,
    error,
    setError,
    subject,
    setSubject,
    SubmitCourseHandler,
}) {
    const { userInfo, token } = useAuth();

    const getValueOfInputHandler = (e) => {
        setSubject({ ...subject, [e.target.name]: e.target.value });
    };

    if (addSubject) {
        return (
            <div
                className={`modalContentContainer ${addSubject ? "show" : ""}`}
            >
                <div
                    className={`modalContent border border-2 rounded p-4 ${
                        addSubject ? "show" : ""
                    }`}
                >
                    <div className="modalDarkBackground"></div>
                    <div className="d-flex justify-content-between align-items-center pb-2">
                        <h4 className="mb-0">Create Subject/s</h4>
                        <i
                            className="bi bi-x fs-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setAddSubject(false);
                            }}
                        ></i>
                    </div>
                    <hr className="mt-2 w-100 m-auto lineBreak shadow" />
                    <div className="mt-2">
                        <form onSubmit={SubmitCourseHandler} className="">
                            <div className="py-3">
                                <h4 className="fs-5">
                                    Department: {userInfo.department}
                                </h4>
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
                                    <h4 className="fs-5">
                                        Enter Number of modules
                                    </h4>
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
                                        ? "*Please Fill out The Blank Area*"
                                        : ""}
                                </p>
                            </div>
                            <hr className="w-100 m-auto lineBreak shadow" />
                            <div className="d-flex justify-content-end mt-3 pt-2">
                                <button className=" smallButtonTemplate text-right sumbit-button btn px-5">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default Modal;
