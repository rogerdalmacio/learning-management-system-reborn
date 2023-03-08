import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap";
import App from "./components/App";
import { AuthProvider } from "./context/AuthProvider";
// import { CreateModuleProvider } from "./context/CourseDev/CreateModuleProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GetAvailableCourseProvider } from "./context/CourseDev/GetAvailableCourseProvider";
import { StudContextProvider } from "./context/Student/StudContextProvider";
import { CourseDevContextProvider } from "./context/CourseDev/CourseDevContextProvider";

if (document.getElementById("root")) {
  ReactDOM.render(
    <BrowserRouter>
      <AuthProvider>
        <GetAvailableCourseProvider>
          <CourseDevContextProvider>
            <StudContextProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </StudContextProvider>
          </CourseDevContextProvider>
        </GetAvailableCourseProvider>
      </AuthProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
