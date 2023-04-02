import React, { useState, useEffect } from "react";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { toast } from "react-toastify";
import useCourseDevContext from "../../../hooks/CourseDev/useCourseDevContext";
import useAuth from "../../../hooks/useAuth";

function DevInsertTitle() {
  const {
    courses,
    setWeek,
    module,
    hasChange,
    setHasChange,
    hasCourseChange,
    setHasCourseChange,
  } = useCourseDevContext();
  const { token } = useAuth();
  const [item, setItem] = useState();
  const [hasItem, setHasItem] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    if (
      module !== undefined &&
      module !== null &&
      module.length !== 0 &&
      module[0].title !== ""
    ) {
      setItem(module[0].title);
      setHasItem(true);
    } else {
      setHasItem(false);
      setItem("");
    }
  }, [module]);

  const SubmitTitle = async () => {
    let toastId;

    if (item === 0 || item === "" || item === undefined) {
      toast.error("Please Insert a Title");
    } else {
      setIsLoading(true);

      let activity = {
        title: item,
      };

      toastId = toast.info("Sending Request...");

      await axios
        .patch(
          `${import.meta.env.VITE_API_BASE_URL}/api/coursedeveloper/module/${
            module[0].id
          }`,
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
          if (response.status >= 200 && response.status <= 300) {
            toast.update(toastId, {
              render: "Request Successfully",
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
            setHasChange(!hasChange);
            setHasCourseChange(!hasCourseChange);
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);

          toast.update(toastId, {
            render: `${error.message}`,
            type: toast.TYPE.ERROR,
            autoClose: 2000,
          });

          setIsLoading(false);
        });
    }
  };

  return (
    <div className="DevModuleContentContainer">
      <ArrowNextAndPrevious>
        <h4 className="m-0">Module Title {currentWeek}</h4>
      </ArrowNextAndPrevious>
      <div className="ms-3">
        <label htmlFor="insertItem">
          <h5 className="mb-3">Insert Module Title:</h5>
        </label>
        <input
          type="text"
          value={item}
          className={`inputField input-form form-control px-3 fs-6 fw-normal mb-3 ${
            item === "" || error ? "errorInput" : "noErrorInput"
          }`}
          id="insertItem"
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
        <div className="row gutters mt-4 ">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="d-flex justify-content-end">
              <button
                disabled={isLoading}
                onClick={SubmitTitle}
                className=" smallButtonTemplate text-right sumbit-button btn px-5"
              >
                {hasItem ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevInsertTitle;
