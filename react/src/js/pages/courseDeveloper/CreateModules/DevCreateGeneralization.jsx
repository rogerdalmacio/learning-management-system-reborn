import React, { useState } from "react";

function DevCreateGeneralization() {
    const [item, setItem] = useState();
    const [error, setError] = useState(false);

    console.log(item);

    return (
        <div className="DevModuleContentContainer">
            <h4 className="mb-4">Generalization</h4>
            <div className="ms-3">
                <label htmlFor="insertItem">
                    <h5 className="mb-3">Insert Google Docs Here:</h5>
                    <p>
                        Note:{" "}
                        <span className="fst-italic">
                            The file need to be publish to the web before
                            uploading the link
                        </span>
                    </p>
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
                <h5>Preview Document</h5>
                {item && (
                    <iframe
                        className="createModuleIframe"
                        src={`${item}?embedded=true`}
                    ></iframe>
                )}
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

export default DevCreateGeneralization;
