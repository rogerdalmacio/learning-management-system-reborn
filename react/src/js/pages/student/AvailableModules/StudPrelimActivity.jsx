import React, { Fragment, useEffect, useState } from "react";
import useStudentContext from "../../../hooks/Student/useStudentContext";
import { useParams } from "react-router-dom";
import Loading from "../../../components/layouts/Loading";

function StudPrelimActivity() {
    const { courses, setWeek, week, module } = useStudentContext();

    const [content, setContent] = useState();

    const pathname = window.location.pathname;
    const pathArray = pathname.split("/");
    const courseBase = pathArray[2];
    const courseTitle = courseBase.replace(/%20/g, " ");
    const weekMod = pathArray[4];
    const currentWeek = weekMod.replace("week", "Week ");
    const weekForModule = weekMod.match(/\d+/)[0];
    const contentType = pathArray[5];
    console.log(contentType);

    console.log(module);

    //getting module_id for modules
    useEffect(() => {
        if (courses) {
            courses.map((course) => {
                if (course.course == courseTitle) {
                    course.module.map((mod) => {
                        if (mod.week == weekForModule) {
                            setWeek(mod.id);
                        }
                    });
                }
            });
        }

        if (module) {
            const act = module.activity
                .filter((act) => act.activity_type == contentType)
                .map((content) => {
                    setContent(content);
                });
        }
    });

    const fetchContent = () => {
        return (
            <div className="embedLinks mb-3 p-2">
                <p>
                    Note:{" "}
                    <span className="fst-italic">
                        Click the link for a greater view of document
                    </span>
                </p>
                <a href={content.embed_links} target="_blank">
                    Open File in New Page
                </a>
            </div>
        );
    };

    const AvailableActivity = () => {
        if (content) {
            return (
                <Fragment>
                    <h4 className="mb-3">
                        Preliminary Activity for {currentWeek}
                    </h4>{" "}
                    {fetchContent()}
                    <iframe
                        className="createModuleIframe"
                        src={`${content.embed_links}?embedded=true`}
                    ></iframe>
                </Fragment>
            );
        } else {
            return <Loading />;
        }
    };

    return <div>{AvailableActivity()}</div>;
}

export default StudPrelimActivity;