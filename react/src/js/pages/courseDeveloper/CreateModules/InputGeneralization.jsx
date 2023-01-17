import React, { useState, useEffect } from "react";

import { useQuill } from "react-quilljs";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import BlotFormatter from "quill-blot-formatter";

function InputGeneralization() {
    const [generalization, setGeneralization] = useState();
    const [error, setError] = useState(false);

    const { quill, quillRef, Quill } = useQuill({
        modules: { blotFormatter: {} },
    });

    if (Quill && !quill) {
        // const BlotFormatter = require('quill-blot-formatter');
        Quill.register("modules/blotFormatter", BlotFormatter);
    }

    const onSubmitGeneralization = () => {
        if (generalization === undefined || "") {
            setError(true);
        } else {
            console.log(generalization);
        }
    };

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                setGeneralization(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill]);

    return (
        <div className="d-block createModuleMargin">
            <label className="fs-5 fw-semibold">Generalization : </label>
            <div>
                <div
                    className={`textEditorContainer ${
                        error && generalization === undefined
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
                    onClick={onSubmitGeneralization}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default InputGeneralization;
