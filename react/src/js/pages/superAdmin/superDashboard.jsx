import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FileUpload() {
    const [file, setFile] = useState(null);
    const [submitFile, setSubmitFile] = useState(true);
    const [processing, setProcessing] = useState(false);
    const { userInfo, token } = useAuth();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    useEffect(() => {
        if (file && file.size > 26214400) {
            setSubmitFile(false);
        } else if (file && file.type !== "text/csv") {
            setSubmitFile(false);
        } else {
            setSubmitFile(true);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let toastId;

        try {
            if (!file) {
                toast.error("Please Choose your File First");
                return;
            } else if (file.size > 26214400) {
                toast.error("The file must not be exceeded to 25 MB");
            } else if (file.type !== "text/csv") {
                toast.error("The file must be in a CSV format");
            } else {
                const formData = new FormData();
                formData.append("file", file);


                toastId = toast.info("Sending Request...");

                axios
                    .post(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/api/core/createaccount`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        if (response.status >= 200 && response.status < 300) {
                            toast.update(toastId, {
                                render: "Request Successfully",
                                type: toast.TYPE.SUCCESS,
                                autoClose: 2000,
                            });
                            setSubmitFile(true);
                            setProcessing(false);
                        } else {
                            throw new Error(
                                response.status || "Something Went Wrong!"
                            );
                        }
                    });
            }
        } catch (error) {
            setProcessing(false);
            setSubmitFile(false);
            toast.update(toastId, {
                render: `${error.message}`,
                type: toast.TYPE.ERROR,
                autoClose: 2000,
            });
        }
    };

    const ConvertSizeHandler = () => {
        if (file && file.size <= 1000000) {
            let filekb = file.size / 1024;
            return <p className="fileSize mb-0">{filekb.toFixed(2)} KB</p>;
        } else if (file && file.size < 1000000000) {
            let fileMb = file.size / (1024 * 1024);
            return <p className="fileSize mb-0">{fileMb.toFixed(2)} MB</p>;
        } else {
            let fileGb = file.size / (1024 * 1024 * 1024);
            return <p className="fileSize mb-0">{fileGb.toFixed(2)} GB</p>;
        }
    };

    const FileStateIcon = () => {
        if (processing && processing) {
            return (
                <div class="spinner-border" role="status">
                    <span class="visually-hidden fs-2">Loading...</span>
                </div>
            );
        } else if (submitFile) {
            return <i className="bi bi-check2-circle fs-2 text-success"></i>;
        } else if (!submitFile) {
            return <i className="bi bi-x-circle fs-2 text-danger"></i>;
        }
    };

    return (
        <div className="w-100">
            <form
                className="fileUploadContainer mx-auto w-100"
                method="post"
                onSubmit={handleSubmit}
            >
                <div className="d-flex justify-content-center w-100">
                    <label className="uploadFile">
                        <div className="d-block text-center h-100">
                            <i className="uploadFileIcon bi bi-cloud-arrow-up-fill text-center"></i>
                            <h5 className="fileHeader mb-0">
                                Browse File to Upload
                            </h5>
                        </div>

                        <input type="file" onChange={handleFileChange} />
                    </label>
                </div>
                {file && (
                    <div className="fileNameContainer mt-3 py-1 px-2">
                        <div className="d-flex justify-content-end">
                            <i
                                className="fileUploadCancelBtn bi bi-x text-right"
                                onClick={() => {
                                    setFile(null);
                                }}
                            ></i>
                        </div>
                        <div className=" d-sm-flex align-items-center">
                            <div className="iconAndFileName d-flex align-items-center">
                                <i className="uploadedFileIcon bi bi-file-earmark-text-fill me-2"></i>
                                <p className="fileName mb-0">{file.name}</p>
                                <div className="fileStateIcon d-block d-sm-none w-25 text-center">
                                    {FileStateIcon()}
                                </div>
                            </div>
                            <div className="SizeAndLoading d-sm-flex justify-content-center align-items-center">
                                {ConvertSizeHandler()}
                            </div>
                            <div className="fileStateIcon d-none d-sm-block text-center">
                                {FileStateIcon()}
                            </div>
                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-end">
                    <button
                        className="uploadButton smallButtonTemplate sumbit-button btn rounded-2 mt-3"
                        type="submit"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FileUpload;
