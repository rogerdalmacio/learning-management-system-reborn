import React, { useState, useEffect } from "react";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import BlotFormatter from "quill-blot-formatter";
import axios from "axios";

function InputPrelimAct() {
    const [prelimAct, setPrelimAct] = useState();
    const [error, setError] = useState(false);

    console.log(JSON.parse(localStorage.getItem("token")));
    const token = localStorage.getItem("token");

    const { quill, quillRef, Quill } = useQuill({
        modules: { blotFormatter: {} },
    });

    if (Quill && !quill) {
        // const BlotFormatter = require('quill-blot-formatter');
        Quill.register("modules/blotFormatter", BlotFormatter);
    }

    <meta name="csrf-token" content="{{ csrf-token() }}" />;

    const onSubmitPrelimAct = async () => {
        if (prelimAct === undefined || "") {
            setError(true);
        } else {
            let item = {
                module_id: "bobong nilalang",
                body: "prelimact",
                title: "this is title",
                preliminaries: "prelim",
                activity_type: "type",
            };

            const fetchedData = await fetch(
                "http://127.0.0.1:8000/api/coursedeveloper/activity",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(
                            localStorage.getItem("token")
                        )}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(item),
                }
            );
        }
    };

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                setPrelimAct(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill]);

    return (
        <div className="d-block createModuleMargin">
            <label className="fs-5 fw-semibold">Preliminary Activity : </label>
            <div>
                <div
                    className={`textEditorContainer ${
                        error && prelimAct === undefined
                            ? "errorBorderColor"
                            : ""
                    }`}
                >
                    <div ref={quillRef} />
                </div>
            </div>

            {/* <div dangerouslySetInnerHTML={{ __html: prelimAct }} /> */}

            <div className="d-flex justify-content-end createModuleSubmit mt-3">
                <p className="my-auto me-3 fst-italic text-danger">
                    {error && error ? "*Please Fill Up The Blank Area*" : ""}
                </p>
                <button
                    className="btn btn-primary btn-lg submitModule"
                    type="button"
                    onClick={onSubmitPrelimAct}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default InputPrelimAct;
