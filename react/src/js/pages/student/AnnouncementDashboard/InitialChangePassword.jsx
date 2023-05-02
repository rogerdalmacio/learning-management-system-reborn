import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

function InitialChangePassword({ userInfo, token }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const togglePassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const renderQuizResult = async () => {
    const item = { password: password };

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
        if (response.status >= 200 && response.status <= 300) {
          toast.success("Password changed successfully!");

          const updatedUserData = {
            ...userInfo,
            password_updated: 1,
          };
          // Save the updated object back to local storage
          localStorage.setItem("user-info", JSON.stringify(updatedUserData));

          window.location.reload();
        } else {
          throw new Error(response.status || "Something Went Wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error.response.data.message}`);
        // }
      });
  };

  return (
    <Fragment>
      <div className="changePasswordCont shadow-lg">
        <div className="bg-white border p-4 px-sm-5 py-sm-4 border rounded">
          <label
            htmlFor="exampleInputPassword1"
            className="newPassword form-label fw-semibold fs-5 w-100"
          >
            New Password
          </label>
          <div className="passwordContainer w-100">
            <div className=" w-100 overflow-hidden mb-2">
              <input
                type={showPassword}
                className={`inputField input-form form-control px-3 fs-6 fw-normal `}
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
      <div className="changePasswordBg position-absolute top-0 start-0 z-1 w-100 h-100"></div>
    </Fragment>
  );
}

export default InitialChangePassword;
