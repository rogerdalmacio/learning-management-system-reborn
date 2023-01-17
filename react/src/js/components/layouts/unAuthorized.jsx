import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "/images/newLogin/logo.png";

function unAuthorized() {
    const navigate = useNavigate();

    return (
        <div className="d-flex px-4 px-sm-0 justify-content-center align-items-center w-100 vh-100 py-5">
            <div>
                <div className="topBarLogo text-dark mb-3">
                    <div className="logo-details d-flex align-items-center justify-content-center">
                        <img
                            className="ms-2 ms-sm-3 my-auto"
                            src={logoImage}
                            width="50"
                            height="50"
                            alt="bcp-logo"
                        />
                        <div className="logo_name text-dark ms-1 ms-sm-3 fs-1">
                            BESTLINK
                        </div>
                    </div>
                </div>
                <div className="errorContainer p-4 p-sm-5 rounded-2 shadow-lg container d-block align-items-center text-center">
                    <h1 className="errorTitle m-0">403</h1>
                    <h2 className="fs-5 fw-bold errorSubTitle">
                        Access is forbidden
                    </h2>
                    <span className="lineBreak my-4"></span>
                    <p className="f-5 fw-normal errorParagraph mb-4">
                        You do not have permission to access the document or
                        program that you requested.
                    </p>
                    <button
                        className="btn bg-primary text-light fs-6"
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <i className="bx bx-home"></i> Go to Previous Page
                    </button>
                </div>
            </div>
        </div>
    );
}

export default unAuthorized;
