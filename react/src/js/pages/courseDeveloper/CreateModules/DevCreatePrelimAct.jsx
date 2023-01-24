import React, { useState } from "react";

function DevCreatePrelimAct() {
    const [item, setItem] = useState();
    const [error, setError] = useState(false);

    console.log(item);

    return (
        <div>
            <h4 className="mb-4">Preliminary Activity</h4>
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
            </div>
        </div>
    );
}

export default DevCreatePrelimAct;
