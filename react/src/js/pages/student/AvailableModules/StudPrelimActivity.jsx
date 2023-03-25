import React, { Fragment, useEffect, useState } from "react";
import useStudentContext from "../../../hooks/Student/useStudentContext";
import { useParams } from "react-router-dom";
import StudPrelimActivitySubmit from "./StudPrelimActivitySubmit";
import Loading from "../../../components/layouts/Loading";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function StudPrelimActivity() {
  const {
    courses,
    setWeek,
    week,
    module,
    setActivityId,
    activity,
    setWeekQuiz,
    activityResultid,
  } = useStudentContext();

  const [content, setContent] = useState();
  const [weekNumber, setWeekNumber] = useState();
  const [areEqual, setAreEqual] = useState(false);

  console.log(content);
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  const weekMod = pathArray[4];
  const currentWeek = weekMod.replace("week", "Week ");
  const weekForModule = weekMod.match(/\d+/)[0];
  const contentType = pathArray[5];
  console.log(contentType);

  console.log(activityResultid);

  //getting module_id for modules
  useEffect(() => {
    if (courses) {
      courses.map((course) => {
        if (course.course == courseTitle) {
          course.module.map((mod) => {
            if (mod.week == weekForModule) {
              setWeekQuiz(mod.id);
              setWeek(mod.id);
              setWeekNumber(mod.id);
            }
          });
        }
      });
    }

    if (activity) {
      const act = activity.activity
        .filter((qui) => qui.activity_type == contentType)
        .map((content) => {
          console.log(content);
          setActivityId(content.id);
        });
    }
  });

  useEffect(() => {
    if (module) {
      console.log(module);
      if (module.id == weekNumber) {
        setAreEqual(true);
        const act = module.activity
          .filter((act) => act.activity_type == contentType)
          .map((content) => {
            setContent(content);
          });
      } else {
        setAreEqual(false);
      }
    }
  }, [module, weekNumber]);

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
          {fetchContent()}
          <iframe
            className="createModuleIframe"
            src={`${content.embed_links}?embedded=true`}
          ></iframe>
          <div className="mt-3">
            <StudPrelimActivitySubmit
              content={content}
              activityResultid={activityResultid}
            />
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <h4 className="d-flex justify-content-center fst-italic text-secondary py-5">
            No Content has been added yet.
          </h4>
        </Fragment>
      );
    }
  };

  if (areEqual) {
    return (
      <div>
        <ArrowNextAndPrevious>
          <h4 className="m-0">Preliminary Activity for {currentWeek}</h4>
        </ArrowNextAndPrevious>
        {AvailableActivity()}
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default StudPrelimActivity;
