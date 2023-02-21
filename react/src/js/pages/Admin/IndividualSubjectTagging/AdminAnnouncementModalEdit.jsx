import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

function AdminAnnouncementModalEdit({
    addAnnouncementEdit,
    setAddAnnouncementEdit,
    title,
    body,
    embed_link,
}) {
    const { token } = useAuth();

    const [announcement, setAnnouncement] = useState({
        title: title,
        body: body,
        status: true,
        embed_link: embed_link,
    });

    const [error, setError] = useState();
    console.log(announcement);

    const SubmitButton = () => {
        let toastId;

        if (
            announcement.title == "" ||
            announcement.body == "" ||
            announcement.title == undefined ||
            announcement.body == undefined
        ) {
            setError(true);
            toast.error("Please fill out the blank area");
        } else {
            setError(false);

            toastId = toast.info("Sending Request...");

            axios
                .patch(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/core/editannouncement`,
                    announcement,
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
                    if (response.status >= 200 && response.status <= 300) {
                        // if (response.data.length !== 0) {
                        //     toast.update(toastId, {
                        //         render: `Student ID is ${response.data[0]}`,
                        //         type: toast.TYPE.ERROR,
                        //         autoClose: 2000,
                        //     });
                        // } else {
                        toast.update(toastId, {
                            render: "Request Successfully",
                            type: toast.TYPE.SUCCESS,
                            autoClose: 2000,
                        });
                        // }
                    } else {
                        throw new Error(
                            response.status || "Something Went Wrong!"
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                    // if (error.response.data.message) {
                    //     toast.update(toastId, {
                    //         render: `${error.response.data.message}`,
                    //         type: toast.TYPE.ERROR,
                    //         autoClose: 2000,
                    //     });
                    // } else {
                    toast.update(toastId, {
                        render: `${error.message}`,
                        type: toast.TYPE.ERROR,
                        autoClose: 2000,
                    });
                    // }
                });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div
            className={`modalContentContainer m-auto ${
                addAnnouncementEdit ? "show" : ""
            }`}
        >
            <div>
                <div
                    className={`modalContent ms-0 border border-2 rounded p-4 ${
                        addAnnouncementEdit ? "show" : ""
                    }`}
                >
                    <div className="modalDarkBackground"></div>
                    <div className="d-flex justify-content-between align-items-center pb-2">
                        <h4 className="mb-0">Edit Announcement</h4>
                        <i
                            className="bi bi-x fs-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setAddAnnouncementEdit(false);
                            }}
                        ></i>
                    </div>
                    <hr className="mt-2 w-100 m-auto lineBreak shadow" />
                    <div className="mt-2">
                        <div>
                            <div className="py-3">
                                <div className="mb-4">
                                    <label
                                        htmlFor="titleHead"
                                        className="form-label fw-semibold fs-6 w-100 mb-2"
                                    >
                                        <h5 className="mb-0">Title</h5>
                                    </label>
                                    <input
                                        type="text"
                                        value={announcement.title}
                                        name="title"
                                        id="titleHead"
                                        className={`inputField input-form form-control px-3 fs-6 fw-normal ${
                                            announcement.title === "" && error
                                                ? "errorInput"
                                                : "noErrorInput"
                                        }`}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="bodyHead"
                                        className="form-label fw-semibold fs-6 w-100 mb-3 d-flex"
                                    >
                                        <h5 className="mb-0 me-2">
                                            Image Link{" "}
                                        </h5>
                                        <span className="text-secondary fst-italic fw-semibold f-5">
                                            *optional
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={announcement.embed_link}
                                        name="embed_link"
                                        id="bodyHead"
                                        className={`inputField input-form form-control px-3 fs-6 fw-normal ${
                                            announcement.embed_link === "" &&
                                            error
                                                ? "errorInput"
                                                : "noErrorInput"
                                        }`}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <div class="form-floating">
                                        <textarea
                                            value={announcement.body}
                                            name="body"
                                            class={`form-control ${
                                                announcement.body === "" &&
                                                error
                                                    ? "errorInput"
                                                    : "noErrorInput"
                                            }`}
                                            placeholder="Leave a comment here"
                                            id="floatingTextarea2"
                                            style={{ height: "100px" }}
                                            onChange={handleInputChange}
                                        />
                                        <label for="floatingTextarea2">
                                            Input Text...
                                        </label>
                                    </div>
                                </div>
                                <hr className="w-100 m-auto lineBreak shadow" />
                                <div className="d-flex justify-content-end mt-3 pt-2">
                                    <button
                                        className="taggingSubjectButton buttonTemplate sumbit-button btn rounded-2 mt-3"
                                        onClick={SubmitButton}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminAnnouncementModalEdit;
