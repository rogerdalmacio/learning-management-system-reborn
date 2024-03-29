import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const SubmitHandler = async (e) => {
    e.preventDefault();
    let item = { email, user_type: "Student" };
    if (email === "" || email == undefined) {
      setError(true);
    } else {
      setError(false);
      setIsLoading(true);

      await axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/reset-password-request`,
          item,
          {
            headers: {
              // "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          toast.success("We've sent you an email");
          setEmail("");

          setIsLoading(false);
        });
    }
  };
  return (
    <div className="loginContainer">
      <div className="d-lg-flex position-relative">
        <div className="d-flex logoContainer">
          <div className="polygon1 position-relative">
            <img
              className="logo"
              src="/images/newLogin/logo.png"
              alt="bcp-logo"
            />
          </div>
          <div className="polygon2"></div>
        </div>
        <div className="form-container d-flex justify-content-center w-100 p-3 p-lg-5">
          <div className="m-auto">
            <div className="form-header1 ps-2 mb-5 position-relative">
              <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <h1 className="header1 fw-bold fs-1 m-0">BCP</h1>
              <h1 className="header2 fw-bold fs-1 m-0">LEARNING MANAGEMENT</h1>
            </div>
            <form onSubmit={SubmitHandler}>
              <label className="fw-semibold fs-5 mb-2">Reset Password</label>
              <p className="fs-6 fst-italic text-secondary">
                Provide your Email. Your Email must be existing in the database.
                <br />
                We would send an email to you containing your new base password.
              </p>
              <span className="loginLineBreak my-3" />

              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-semibold fs-6 w-100"
                >
                  Email
                </label>
                <input
                  value={email}
                  type="email"
                  className={`inputField input-form form-control px-3 fs-6 fw-normal ${
                    email === "" && error ? "errorInput" : "noErrorInput"
                  }`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <p className="errorInput text-danger fst-italic">
                  {error && "Email is required"}
                </p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="buttonTemplate sumbit-button btn rounded-2 w-100 mt-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
