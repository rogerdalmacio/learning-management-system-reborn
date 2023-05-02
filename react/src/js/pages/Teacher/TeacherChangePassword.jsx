import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

function TeacherChangePassword() {
  const { userInfo, token } = useAuth();
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState("password");
  const [showPassword, setShowPassword] = useState("password");

  const toggleOldPassword = () => {
    if (showOldPassword === "password") {
      setShowOldPassword("text");
    } else {
      setShowOldPassword("password");
    }
  };

  const togglePassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const renderQuizResult = async () => {
    if (password == "" || oldPassword == "") {
      toast.error("Old Password or Password is required");
    } else {
      const item = { password: password, old_password: oldPassword };

      await axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/changepassword`,
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
            toast.success("Password changed successfully!");
            setPassword("");
            setOldPassword("");
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.message !== undefined) {
            toast.error(`${error.response.data.message}`);
          } else {
            toast.error(`${error.response.data}`);
          }
          // }
        });
    }
  };

  return (
    <div className="bg-white border p-4 px-sm-5 py-sm-4 border rounded">
      <div className="ChangePasswordContainer">
        <label
          htmlFor="exampleInputPassword1"
          className="newPassword form-label fw-semibold fs-5 w-100"
        >
          Old Password
        </label>
        <div className="passwordChildContainer">
          <div className="changePasswordInput w-100 overflow-hidden mb-2">
            <input
              type={showOldPassword}
              value={oldPassword}
              className={`inputField input-form form-control px-3 fs-6 fw-normal changePasswordInput`}
              //  ${
              //   password === "" || error ? "errorInput" : "noErrorInput"
              // }
              id="exampleInputPassword1"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <div className="overflow-hidden">
              <a className="changePasswordButton" onClick={toggleOldPassword}>
                {showOldPassword === "password" ? (
                  <i className="bi bi-eye-fill" />
                ) : (
                  <i className="bi bi-eye-slash-fill" />
                )}
              </a>
            </div>
          </div>
        </div>
        <label
          htmlFor="exampleInputPassword1"
          className="newPassword form-label fw-semibold fs-5 w-100"
        >
          New Password
        </label>
        <div className="passwordChildContainer">
          <div className="changePasswordInput w-100 overflow-hidden mb-2">
            <input
              type={showPassword}
              value={password}
              className={`inputField input-form form-control px-3 fs-6 fw-normal changePasswordInput`}
              //  ${
              //   password === "" || error ? "errorInput" : "noErrorInput"
              // }
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="overflow-hidden">
              <a className="changePasswordButton" onClick={togglePassword}>
                {showPassword === "password" ? (
                  <i className="bi bi-eye-fill" />
                ) : (
                  <i className="bi bi-eye-slash-fill" />
                )}
              </a>
            </div>
          </div>
          <p className="fs-6 fst-italic text-danger">
            Password should be minimum of 8 Characters
          </p>
          <div className="d-flex justify-content-end">
            <button
              // disabled={isLoading}
              className="taggingSubjectButton smallButtonTemplate sumbit-button btn rounded-2"
              onClick={renderQuizResult}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherChangePassword;
