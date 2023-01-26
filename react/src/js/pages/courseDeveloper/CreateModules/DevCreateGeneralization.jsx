import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";

function DevCreateGeneralization() {
    const [item, setItem] = useState();
    const [moduleId, setModuleId] = useState();
    const [term, setTerm] = useState();
    const [error, setError] = useState(false);

    const { course } = useGetAvailableCourse();
    const { token } = useAuth();

    const { id } = useParams();

    const pathname = window.location.pathname;
    const pathArray = pathname.split("/");

    // Course Title
    const courseBase = pathArray[2];
    const courseTitle = courseBase.replace(/%20/g, " ");
    console.log(courseTitle);

    console.log(course);

    // Get module id
    const weekNumber = id.match(/\d+/)[0];
    console.log(weekNumber);

    console.log(item);

    console.log(moduleId);

    console.log(term);

    useEffect(() => {
        if (course) {
            return course.map((item) => {
                if (item.course == courseTitle) {
                    item.module.map((mod) => {
                        if (mod.week == weekNumber) {
                            setModuleId(mod.id);
                        }
                    });
                }
            });
        }
    });

    useEffect(() => {
        if (weekNumber >= 12) {
            setTerm("finals");
        } else if (weekNumber >= 6) {
            setTerm("midterm");
        } else {
            setTerm("prelim");
        }
    });

    const SubmitActivityHandler = async (e) => {
        e.preventDefault();
        let activity = {
            module_id: moduleId,
            title: "generalization",
            activity_type: "generalization",
            preliminaries: term,
            embed_links: item,
        };

        console.log(activity);
        await axios
            .post(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/coursedeveloper/activity`,
                activity,
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
            });
    };

    return (
        <div className="DevModuleContentContainer">
            <h4 className="mb-4">Preliminary Activity</h4>
            <form onSubmit={SubmitActivityHandler} className="ms-3">
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
            </form>
        </div>
    );
}

export default DevCreateGeneralization;
