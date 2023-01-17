import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap";
import App from "./components/App";
import { AuthProvider } from "./context/AuthProvider";
// import { CreateModuleProvider } from "./context/CourseDev/CreateModuleProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

if (document.getElementById("root")) {
    ReactDOM.render(
        <BrowserRouter>
            <AuthProvider>
                {/* <CreateModuleProvider> */}
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
                {/* </CreateModuleProvider> */}
            </AuthProvider>
        </BrowserRouter>,
        document.getElementById("root")
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
