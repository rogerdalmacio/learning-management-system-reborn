import React from "react";
import { Link } from "react-router-dom";

function CreateModules() {
    return (
        <div>
            <div className="d-flex align-items-center mb-5 mt-3 mt-sm-0">
                <h3 className="border-end border-4 border-dark border-opacity-75 pe-2 m-0">
                    Create Modules
                </h3>
                <h3 className="ps-2 text-secondary m-0">
                    122 - CAP101 Capstone Project 1
                </h3>
            </div>
            <div className="ms-lg-4">
                <ul>
                    <Link to="/developer/createModules/week1">
                        <li>Week 1</li>
                    </Link>
                    <Link to="/developer/createModules/week2">
                        <li>Week 2</li>
                    </Link>
                    <Link to="/developer/createModules/week3">
                        <li>Week 3</li>
                    </Link>
                    <Link to="/developer/createModules/week4">
                        <li>Week 4</li>
                    </Link>
                    <Link to="/developer/createModules/week5">
                        <li>Week 5</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default CreateModules;
