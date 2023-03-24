import React, { Fragment, useEffect, useState } from "react";
import useStudentContext from "../../../hooks/Student/useStudentContext";
import { useParams } from "react-router-dom";
import Loading from "../../../components/layouts/Loading";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function StudLesson() {
  const { courses, setWeekLesson, setWeek, lesson, module } =
    useStudentContext();
  const [content, setContent] = useState();
  const [weekNumber, setWeekNumber] = useState();
  const [areEqual, setAreEqual] = useState(false);

  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  const weekMod = pathArray[4];
  const currentWeek = weekMod.replace("week", "Week ");
  const weekForModule = weekMod.match(/\d+/)[0];
  const contentType = pathArray[5];
  console.log(contentType);

  console.log(content);
  console.log(weekNumber);

  //getting module_id for modules
  useEffect(() => {
    if (courses) {
      courses.map((course) => {
        if (course.course == courseTitle) {
          course.module.map((mod) => {
            if (mod.week == weekForModule) {
              console.log(mod.id);
              setWeek(mod.id);
              setWeekNumber(mod.id);
            }
          });
        }
      });
    }
  });

  useEffect(() => {
    console.log(module);
    if (module) {
      console.log(module);
      console.log(module.id);
      if (module.id == weekNumber) {
        setAreEqual(true);
        const act = module.lesson
          .filter((act) => act.title == contentType)
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

  const AvailableLesson = () => {
    if (content) {
      return (
        <Fragment>
          {fetchContent()}
          <iframe
            className="createModuleIframe"
            src={`${content.embed_links}?embedded=true`}
          ></iframe>
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
        {" "}
        <ArrowNextAndPrevious>
          <h4 className="m-0">Lesson for {currentWeek}</h4>
        </ArrowNextAndPrevious>
        {AvailableLesson()}
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default StudLesson;
