import React, { Fragment, useEffect, useRef, useState } from "react";
import useStudentContext from "../../../../hooks/Student/useStudentContext";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";

function Camera({
    contentArrayLength,
    dynamicNumberLength,
    getAnswer,
    currentQuestionIndex,
    setPermissionGranted,
}) {
    const { quizid, quizResultId } = useStudentContext();
    const { token } = useAuth();

    console.log(quizid);
    console.log(quizResultId);

    let lastIndex = getAnswer.length - 1;
    console.log(lastIndex);
    console.log(currentQuestionIndex);

    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [image, setImage] = useState();
    const [localImage, setLocalImage] = useState();

    const [countQuiz, setCountQuiz] = useState(0);
    const [randomNum, setRandomNum] = useState(
        localStorage.getItem("ranNumber") || ""
    );
    console.log(randomNum);
    console.log(dynamicNumberLength);
    console.log(image);
    console.log(localImage);
    console.log(randomNum);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: { width: 1920, height: 1080 },
            })
            .then((stream) => {
                setPermissionGranted(false);
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((error) => {
                setPermissionGranted(true);
                console.error(error);
            });
    };

    // useEffect(() => {
    //     navigator.mediaDevices
    //         .getUserMedia({ video: true, audio: false })
    //         .then((stream) => {
    //             setPermissionGranted(false);
    //             // You can use the stream to display the camera feed
    //             // ...
    //         })
    //         .catch((err) => {
    //             toast.error(
    //                 "Please Allow the permission before taking the exam"
    //             );
    //             console.error(err);
    //         });
    // }, []);

    const takePhoto = () => {
        if (!localImage) {
            const width = 414;
            const height = width / (16 / 9);
            let video = videoRef.current;
            let photo = photoRef.current;

            photo.width = width;
            photo.height = height;

            let ctx = photo.getContext("2d");
            ctx.drawImage(video, 0, 0, width, height);
            setHasPhoto(true);

            const dataURL = photo.toDataURL("image/jpeg", 1.0);
            // const dataURL1 = photo.toDataURL();
            setImage(dataURL);
        }
    };

    const closePhoto = () => {
        // let photo = photoRef.current;
        // let ctx = photo.getContext("2d");

        // ctx.clearRect(0, 0, photo.width, photo.height);

        setHasPhoto(false);
    };

    // if (!localImage) {
    //     const RandomNumber =
    //         Math.floor(Math.random() * (contentArrayLength - 2 + 1)) + 2;
    //     localStorage.setItem("ranNumber", RandomNumber);
    // }

    useEffect(() => {
        if (!localStorage.getItem("ranNumber")) {
            const RandomNumber =
                Math.floor(Math.random() * (contentArrayLength - 2 + 1)) + 2;
            localStorage.setItem("ranNumber", RandomNumber);

            const storedRanNumber = localStorage.getItem("ranNumber");
            if (storedRanNumber) {
                setRandomNum(storedRanNumber);
            }
        } else {
            setRandomNum(localStorage.getItem("ranNumber"));
        }
    }, []);

    useEffect(() => {
        const uploadSnapshot = async () => {
            if (image && quizResultId) {
                localStorage.setItem("image", true);

                const imageDataArray = image.split(",");
                const imageType = imageDataArray[0].split(":")[1].split(";")[0];
                const imageDataBase64 = imageDataArray[1];
                const byteArray = new Uint8Array(
                    atob(imageDataBase64)
                        .split("")
                        .map((char) => char.charCodeAt(0))
                );

                const file = new File([byteArray], "image.jpg", {
                    type: "image/jpg",
                });

                const formData = new FormData();
                formData.append("file", file);
                formData.append("snapshot", true);
                formData.append("quiz_result_id", quizResultId[0].id);

                console.log(file);
                console.log(formData);

                // let item = {
                //     snapshot: true,
                //     file: formData,
                //     quiz_result_id: quizResultId[0].id,
                // };

                // console.log(item);

                await axios
                    .post(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/api/student/snapshot`,
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
                        if (response.status >= 200 && response.status <= 300) {
                            toast.success("Snapshot uploaded!");
                        } else {
                            throw new Error(
                                response.status || "Something Went Wrong!"
                            );
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        };
        uploadSnapshot();
        const storedImage = localStorage.getItem("image");
        if (storedImage) {
            setLocalImage(storedImage);
        }
    });

    // setting random Number
    console.log(countQuiz);

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    useEffect(() => {
        if (!localImage) {
            if (
                dynamicNumberLength == randomNum ||
                getAnswer.length - 1 == currentQuestionIndex
            ) {
                takePhoto();
            }
        }
    }, [dynamicNumberLength]);

    useEffect(() => {
        if (hasPhoto) {
            setTimeout(() => {
                setHasPhoto(false);
            }, 3000);
        }
    }, [hasPhoto]);

    return (
        <Fragment>
            <div className="camera">
                <video className="CameraVideo d-none" ref={videoRef}></video>
            </div>
            {localImage ? (
                <Fragment>
                    {image && (
                        <div
                            className={`position-relative w-100 d-flex justify-content-end ${
                                hasPhoto ? "d-block" : "d-none"
                            }`}
                        >
                            <i
                                className="QuizClosePhotoIcon bi bi-x"
                                onClick={closePhoto}
                            ></i>

                            <img
                                className="img-fluid"
                                src={image}
                                alt="Canvas as Image"
                            />
                        </div>
                    )}
                </Fragment>
            ) : (
                <div
                    className={
                        `CameraResult position-relative` +
                        (localImage ? "hasPhoto" : "")
                    }
                >
                    <canvas ref={photoRef}></canvas>
                    <button
                        className={`CameraPhotoClose ${
                            localImage ? "d-block" : "d-none"
                        }`}
                        onClick={closePhoto}
                    >
                        CLOSE!
                    </button>
                </div>
            )}
        </Fragment>
    );
}

export default Camera;
