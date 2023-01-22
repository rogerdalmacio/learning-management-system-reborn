import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import dummyProfile from "/images/man.png";
import { useOutletContext } from "react-router-dom";

function ManagerEditProfie() {
    document.cookie = "mycookie=myvalue; SameSite=None; Secure; path=/";

    const { userInfo, token, role } = useAuth();

    const [file, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [imageExisting, setImageExisting, imageSrc, setImageSrc] =
        useOutletContext();

    console.log(imageSrc);

    const handleError = () => {
        setImageSrc(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/storage/CourseManager/CourseManager${userInfo.id}.png`
        );
    };

    useEffect(() => {
        if (
            `${
                import.meta.env.VITE_API_BASE_URL
            }/storage/CourseManager/CourseManager${userInfo.id}.png`
        ) {
        }
    });

    const userImagePng = `${
        import.meta.env.VITE_API_BASE_URL
    }/storage/CourseManager/CourseManager${userInfo.id}.png`;

    // CHECK IF IMAGE EXISTS
    useEffect(() => {
        function checkIfImageExists(url, url2, callback) {
            const img = new Image();
            img.src = url;

            if (img.complete) {
                callback(true);
            } else {
                img.onload = () => {
                    callback(true);
                };

                img.onerror = () => {
                    callback(false);
                };
            }

            const img2 = new Image();
            img2.src = url2;

            if (img2.complete) {
                callback(true);
            } else {
                img2.onload = () => {
                    callback(true);
                };

                img2.onerror = () => {
                    callback(false);
                };
            }
        }

        // USAGE
        checkIfImageExists(imageSrc, userImagePng, (exists) => {
            if (exists) {
                setImageExisting(true);
            } else {
                setImageExisting(false);
            }
        });
    });

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!file) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    };

    const ProfilePictureHandler = () => {
        if (imageSrc && imageExisting === false) {
            return (
                <div>
                    {file ? (
                        <img src={preview} alt={userInfo.first_name} />
                    ) : (
                        <img src={dummyProfile} alt={userInfo.first_name} />
                    )}
                </div>
            );
        } else if (imageSrc && imageExisting === true) {
            return (
                <div>
                    {file ? (
                        <img src={preview} alt={userInfo.first_name} />
                    ) : (
                        <img
                            src={imageSrc}
                            onError={handleError}
                            alt={userInfo.first_name}
                        />
                    )}
                </div>
            );
        }
    };

    const SubmitProfileHandler = async (e) => {
        e.preventDefault();
        let toastId;
        try {
            if (!file) {
                toast.error("Nothing to update");
            } else if (file.size > 5242880) {
                toast.error("The file must not be exceeded to 25 MB");
            } else if (
                file.type !== "image/jpeg" &&
                file.type !== "image/jpg" &&
                file.type !== "image/png"
            ) {
                toast.error("Image must be in jpg or png");
            } else {
                const formData = new FormData();
                formData.append("file", file);

                toastId = toast.info("Sending Request...");

                const response = await axios
                    .post(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/api/users/uploadprofilepicture`,
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
                                render: "Update Successfully",
                                type: toast.TYPE.SUCCESS,
                                autoClose: 2000,
                            });
                        } else {
                            throw new Error(
                                response.status || "Something Went Wrong!"
                            );
                        }
                    });
            }
        } catch (error) {
            console.log(error);
            toast.update(toastId, {
                render: `${error.message}`,
                type: toast.TYPE.ERROR,
                autoClose: 2000,
            });
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <label>
                                                <div>
                                                    {ProfilePictureHandler()}
                                                </div>
                                                <input
                                                    type="file"
                                                    onChange={onSelectFile}
                                                />
                                            </label>
                                        </div>
                                        <h5 className="user-name">
                                            {userInfo.first_name}{" "}
                                            {userInfo.last_name}
                                        </h5>
                                        <h6 className="user-email">
                                            {userInfo.first_name}
                                            {userInfo.last_name}@gmail.com
                                        </h6>
                                    </div>
                                    <div className="about">
                                        <h5>About</h5>
                                        <p>
                                            {userInfo.first_name}{" "}
                                            {userInfo.last_name}, {role} of
                                            Bestlink College of the Philippines
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <form
                                onSubmit={SubmitProfileHandler}
                                className="card-body"
                            >
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 text-primary">
                                            Personal Details
                                        </h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <div>Full Name</div>
                                            <p className="ms-3 mb-0">
                                                {userInfo.first_name}{" "}
                                                {userInfo.last_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <div htmlFor="eMail">Email</div>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="eMail"
                                                placeholder="Enter email ID"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mt-3 mb-2 text-primary">
                                            Address
                                        </h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="Street">
                                                Street
                                            </label>
                                            <input
                                                type="name"
                                                className="form-control"
                                                id="Street"
                                                placeholder="Enter Street"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="ciTy">City</label>
                                            <input
                                                type="name"
                                                className="form-control"
                                                id="ciTy"
                                                placeholder="Enter City"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="sTate">State</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="sTate"
                                                placeholder="Enter State"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="zIp">
                                                Zip Code
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="zIp"
                                                placeholder="Zip Code"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters mt-4 ">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="d-flex justify-content-end">
                                            <button className=" smallButtonTemplate text-right sumbit-button btn px-5">
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <iframe
                src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true"
                width={800}
                height={600}
                frameborder="0"
                sandbox="allow-same-origin allow-scripts"
            ></iframe> */}
            {/* <iframe
                src="https://docs.google.com/document/d/1S8gJeCD_vDjbM2JKk8Ojkt-6Uj_fdn_NQPdzHeQnn0Y/edit"
                sandbox="allow-same-origin allow-scripts"
                width={800}
                height={600}
            ></iframe> */}
        </div>
    );
}

export default ManagerEditProfie;
