import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useGetAvailableCourse from "../../../hooks/CourseDev/useGetAvailableCourse";
import useCourseDevContext from "../../../hooks/CourseDev/useCourseDevContext";
import Loading from "../../../components/layouts/Loading";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function DevCreateLesson() {
  const { token } = useAuth();
  const {
    courses,
    setWeekLesson,
    setWeek,
    lesson,
    module,
    hasChange,
    setHasChange,
  } = useCourseDevContext();
  const { course } = useGetAvailableCourse();

  const [item, setItem] = useState("");
  const [moduleId, setModuleId] = useState();
  const [term, setTerm] = useState();
  const [error, setError] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [lessonId, setLessonId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

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

  useEffect(() => {
    if (courses) {
      console.log(courses);
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
  });

  // useEffect(() => {
  //   console.log(lesson);
  //   if (lesson !== undefined && lesson.length !== 0) {
  //     console.log(lesson);
  //     if (lesson[0].title == "lesson") {
  //       setHasContent(true);
  //       setLessonId(lesson[0].id);
  //       setItem(lesson[0].embed_links);
  //     }
  //   } else {
  //     setItem("");
  //     setHasContent(false);
  //   }
  // }, [lesson]);

  useEffect(() => {
    if (module !== undefined && module.length !== 0) {
      const modulevalue = module[0].lesson.filter(
        (less) => less.title == "lesson" && less.module_id == moduleId
      );
      console.log(modulevalue);

      if (modulevalue !== undefined && modulevalue.length !== 0) {
        console.log(modulevalue);
        if (modulevalue[0].title == "lesson") {
          setHasContent(true);
          setLessonId(modulevalue[0].id);
          setItem(modulevalue[0].embed_links);
        } else {
          setItem("");
        }
      }
    }
  }, [moduleId, module]);
  // Get module id
  const weekNumber = id.match(/\d+/)[0];

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

    let toastId;

    if (item === 0 || item === "" || item === undefined) {
      toast.error("Please Insert a link");
    } else if (item && !item.includes("https://docs.google.com")) {
      toast.error("The Link is not Valid");
    } else {
      setIsLoading(true);
      let activity = {
        module_id: moduleId,
        title: "lesson",
        preliminaries: term,
        embed_links: item,
      };

      toastId = toast.info("Sending Request...");

      console.log(activity);
      await axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/coursedeveloper/lesson`,
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
          if (response.status >= 200 && response.status <= 300) {
            toast.update(toastId, {
              render: "Request Successfully",
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
            setHasChange(!hasChange);
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.length !== 0) {
            toast.update(toastId, {
              render: `${error.response.data[0]}`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          } else {
            toast.update(toastId, {
              render: `${error.message}`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          }
          setIsLoading(false);
        });
    }
  };

  const EditActivityHandler = async (e) => {
    e.preventDefault();
    console.log(lessonId);
    let toastId;

    if (item === 0 || item === "" || item === undefined) {
      toast.error("Please Insert a link");
    } else if (item && !item.includes("https://docs.google.com")) {
      toast.error("The Link is not Valid");
    } else {
      setIsLoading(true);
      let activity = {
        module_id: moduleId,
        title: "lesson",
        preliminaries: term,
        embed_links: item,
      };

      toastId = toast.info("Sending Request...");

      console.log(activity);
      await axios
        .patch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/coursedeveloper/lesson/${lessonId}`,
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
          if (response.status >= 200 && response.status <= 300) {
            toast.update(toastId, {
              render: "Request Successfully",
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
            setHasChange(!hasChange);
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.length !== 0) {
            toast.update(toastId, {
              render: `${error.response.data[0]}`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          } else {
            toast.update(toastId, {
              render: `${error.message}`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          }
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="DevModuleContentContainer">
      <ArrowNextAndPrevious>
        <h4 className="m-0">Lesson {currentWeek}</h4>
      </ArrowNextAndPrevious>
      <form
        onSubmit={hasContent ? EditActivityHandler : SubmitActivityHandler}
        className="ms-3"
      >
        <label htmlFor="insertItem">
          <h5 className="mb-3">Insert Google Docs Here:</h5>
          <p>
            Note:{" "}
            <span className="fst-italic">
              The file need to be publish to the web before uploading the link
            </span>
          </p>
        </label>
        <input
          type="text"
          className={`inputField input-form form-control px-3 fs-6 fw-normal mb-3 ${
            item === "" || error ? "errorInput" : "noErrorInput"
          }`}
          id="insertItem"
          value={item}
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
              <button
                disabled={isLoading}
                className="smallButtonTemplate text-right sumbit-button btn px-5"
              >
                {hasContent ? <span>Submit Changes</span> : <span>Submit</span>}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DevCreateLesson;
