import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowNextAndPrevious from "../../components/layouts/ArrowNextAndPrevious";

function SuperBulkTeacherCreationAccount() {
  const [file, setFile] = useState(null);
  const [submitFile, setSubmitFile] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [getNumAlreadyExist, setGetNumAlreadyExist] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  console.log(getNumAlreadyExist);
  const handleSubmit = (e) => {
    e.preventDefault();

    let toastId;

    if (!file) {
      toast.error("Please Choose your File First");

      return;
    } else if (file.size > 26214400) {
      toast.error("The file must not be exceeded to 25 MB");
    } else if (file.type !== "text/csv") {
      toast.error("The file must be in a CSV format");
    } else {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      toastId = toast.info("Sending Request...");

      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/core/batchcreatestudents`,
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
          console.log(response);
          console.log(response.data.errors);
          if (response.data.errors.length !== 0) {
            const idString = response.data.errors.map((error) => {
              return error.id[0];
            });

            const extractIdNumber = (idString) => {
              const idRegex = /^ID\s+(\d+)/;
              const match = idRegex.exec(idString);
              if (match) {
                return parseInt(match[1], 10);
              }
              return null;
            };

            const idNumbers = idString.map((idString) =>
              extractIdNumber(idString)
            );

            toast.update(toastId, {
              render: `Account/s already exist`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });

            if (response.data.accountSuccessfullyCreatedFor.length !== 0) {
              toast.update(toastId, {
                render: `Other account/s successfully made!`,
                type: toast.TYPE.SUCCESS,
                autoClose: 2000,
              });
              setIsLoading(false);
            }
            setGetNumAlreadyExist(idNumbers.join(", "));
          } else if (response.status >= 200 && response.status <= 300) {
            toast.update(toastId, {
              render: "Request Successfully",
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
            setSubmitFile(true);
            setProcessing(false);
            setIsLoading(false);
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast.update(toastId, {
            render: `${error.response.data.error.replace(/_/g, " ")}`,
            type: toast.TYPE.ERROR,
            autoClose: 2000,
          });
          setProcessing(false);
          setSubmitFile(false);
          setIsLoading(false);
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
        <div className="spinner-border" role="status">
          <span className="visually-hidden fs-2">Loading...</span>
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
      <ArrowNextAndPrevious>
        <h3 className="m-0">Student - Mass Creation of Accounts</h3>
      </ArrowNextAndPrevious>
      <form
        className="fileUploadContainer mx-auto w-100"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="d-flex justify-content-center w-100">
          <label className="uploadFile">
            <div className="d-block text-center h-100">
              <i className="uploadFileIcon bi bi-cloud-arrow-up-fill text-center"></i>
              <h5 className="fileHeader mb-0">Browse File to Upload</h5>
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
        <div className="d-block">
          <div className="d-flex justify-content-end">
            <button
              disabled={isLoading}
              className="uploadButton smallButtonTemplate sumbit-button btn rounded-2 mt-3"
              type="submit"
            >
              Upload
            </button>
          </div>

          <div className="d-flex justify-content-center mt-2">
            {getNumAlreadyExist && (
              <p className="text-danger fst-italic fs-6">
                * Account ID{" "}
                <span className="fw-bold">{getNumAlreadyExist}</span> already
                exist *
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SuperBulkTeacherCreationAccount;
