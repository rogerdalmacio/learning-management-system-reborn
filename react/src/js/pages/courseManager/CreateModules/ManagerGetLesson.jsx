import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import CourseContentProvider from "../../../hooks/CourseContent/useCourseContent";
import { Fragment } from "react";
import Loading from "../../../components/layouts/Loading";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function ManagerGetLesson() {
  const { courses, setWeek, module } = CourseContentProvider();
  const { course } = useGetAvailableCourse();

  const [content, setContent] = useState();
  const [weekNumber, setWeekNumber] = useState();
  const [areEqual, setAreEqual] = useState(false);

  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  // Course Title
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  const weekMod = pathArray[4];
  const currentWeek = weekMod.replace("week", "Week ");
  const weekForModule = weekMod.match(/\d+/)[0];
  const contentType = pathArray[5];
  console.log(contentType);
  // Get module id
  // const weekNumber = id.match(/\d+/)[0];
  useEffect(() => {
    if (courses) {
      console.log(courses);
      courses.map((course) => {
        if (course.course == courseTitle) {
          course.module.map((mod) => {
            if (mod.week == weekForModule) {
              setWeek(mod.id);
              setWeekNumber(mod.id);
            }
          });
        }
      });
    }
  });
  console.log(module);
  useEffect(() => {
    if (module) {
      console.log(module);
      console.log(module.id);
      if (module.id == weekNumber) {
        setAreEqual(true);
        const act = module.lesson
          .filter((act) => act.title == contentType)
          .map((content) => {
            console.log(content);
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

export default ManagerGetLesson;
