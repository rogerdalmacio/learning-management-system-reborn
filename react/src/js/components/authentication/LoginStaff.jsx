import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [type, setType] = useState("Teacher");
  const [showPassword, setShowPassword] = useState("password");
  let error;
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const results = localStorage.getItem("error-info");
  if (results) {
    error = JSON.parse(results);
  }

  const SubmitHandler = async (e) => {
    e.preventDefault();

    // await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`);

    setIsLoading(true);
    let item = { email, password, type };
    const fetchedData = await axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, item, {
        headers: {
          // "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // withCredentials: true,
        // body: JSON.stringify(item),
      })
      .then((response) => {
        console.log(response);
        const result = response.data;
        if (result.user !== undefined && result.token !== undefined) {
          localStorage.setItem("user-info", JSON.stringify(result.user));
          localStorage.setItem("type", JSON.stringify(result.type));
          localStorage.setItem("token", JSON.stringify(result.token));
        }
        setIsLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        const result = error.response.data;

        console.log(result);
        // console.log(result.errors.email.length !== 0);
        if (
          result.message ==
            "Your account is already logged in to other device." ||
          result.message == "The password field is required." ||
          result.message == "The email field is required." ||
          result[0] == "Bad Credentials"
        ) {
          localStorage.setItem(
            "error-info",
            JSON.stringify(result.message || result[0])
          );
        } else if (result.errors.email.length !== 0) {
          localStorage.setItem(
            "error-info",
            JSON.stringify("Email and Password is required")
          );
        }
        setIsLoading(false);
      });
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
            <div className="form-header1 ps-2 mb-5">
              <h1 className="header1 fw-bold fs-1 m-0">BCP</h1>
              <h1 className="header2 fw-bold fs-1 m-0">LEARNING MANAGEMENT</h1>
            </div>
            <form onSubmit={SubmitHandler}>
              <label htmlFor="dropdown" className="fw-semibold fs-6 mb-2">
                Dashboard
              </label>
              <div id="dropdown" className="dropdown">
                <button
                  className="dropdownMenu px-3 fw-normal btn dropdown-toggle w-100 d-flex justify-content-between align-items-center dropDownBorder border-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {type}
                </button>
                <ul className="dropdown-menu w-100">
                  <li>
                    <button
                      value="Teacher"
                      type="button"
                      className={`dropdown-item`}
                      onClick={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      Teacher
                    </button>
                  </li>
                  <li>
                    <button
                      value="Admin"
                      type="button"
                      className={`dropdown-item`}
                      onClick={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      Admin
                    </button>
                  </li>
                  <li>
                    <button
                      value="CourseDeveloper"
                      type="button"
                      className={`dropdown-item`}
                      onClick={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      Course Developer
                    </button>
                  </li>
                  <li>
                    <button
                      value="CourseManager"
                      type="button"
                      className={`dropdown-item`}
                      onClick={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      Course Manager
                    </button>
                  </li>
                  <li>
                    <button
                      value="SuperAdmin"
                      type="button"
                      className={`dropdown-item`}
                      onClick={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      Super Admin
                    </button>
                  </li>
                </ul>
              </div>

              <span className="loginLineBreak my-4" />
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
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label fw-semibold fs-6 w-100"
                >
                  Password
                </label>
                <div className="passwordContainer w-100">
                  <div className=" w-100 overflow-hidden">
                    <input
                      type={showPassword}
                      className={`inputField input-form form-control px-3 fs-6 fw-normal ${
                        password === "" || error ? "errorInput" : "noErrorInput"
                      }`}
                      id="exampleInputPassword1"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="overflow-hidden">
                      <a className="passwordButton" onClick={togglePassword}>
                        {showPassword === "password" ? (
                          <i className="bi bi-eye-fill" />
                        ) : (
                          <i className="bi bi-eye-slash-fill" />
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <p className="errorInput text-danger fst-italic">
                  {error && error}
                </p>
              </div>
              <button
                disabled={isLoading}
                className="buttonTemplate sumbit-button btn rounded-2 w-100 mt-3"
              >
                Log in
              </button>
              <Link
                to="/staff/forgotpassword"
                className="w-100 mt-3 text-decoration-none d-flex justify-content-end"
              >
                Forgot Password?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
