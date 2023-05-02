import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const SubmitHandler = () => {};
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
            <div className="form-header1 ps-2 mb-5">
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
                  type="email"
                  className={`inputField input-form form-control px-3 fs-6 fw-normal ${
                    email === "" || error ? "errorInput" : "noErrorInput"
                  }`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
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
