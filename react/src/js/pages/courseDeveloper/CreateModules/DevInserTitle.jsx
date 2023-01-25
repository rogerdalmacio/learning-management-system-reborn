import React, { useState } from "react";

function DevInsertTitle() {
    const [item, setItem] = useState();
    const [error, setError] = useState(false);

    console.log(item);

    return (
        <div className="DevModuleContentContainer">
            <h4 className="mb-4">Module Title</h4>
            <div className="ms-3">
                <label htmlFor="insertItem">
                    <h5 className="mb-3">Insert Module Title:</h5>
                </label>
                <input
                    type="text"
                    className={`inputField input-form form-control px-3 fs-6 fw-normal mb-3 ${
                        item === "" || error ? "errorInput" : "noErrorInput"
                    }`}
                    id="insertItem"
                    onChange={(e) => {
                        setItem(e.target.value);
                    }}
                />
                <div className="row gutters mt-4 ">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="d-flex justify-content-end">
                            <button className=" buttonTemplate text-right sumbit-button btn px-5">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DevInsertTitle;
