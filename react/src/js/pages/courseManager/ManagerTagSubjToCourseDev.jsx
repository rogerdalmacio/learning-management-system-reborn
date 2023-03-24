import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import ArrowNextAndPrevious from "../../components/layouts/ArrowNextAndPrevious";

function ManagerTagSubjToCourseDev() {
  const { token, role } = useAuth();

  const [getSubject, setGetSubject] = useState();
  const [specificSubj, setSpecificSubj] = useState();
  const [getCourseDev, setGetCourseDev] = useState();
  const [specificDev, setSpecificDev] = useState();
  const [getCourseDevId, setGetCourseDevId] = useState();
  const [getSubjectCode, setGetSubjectCode] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(getSubject);
  console.log(getCourseDev);

  console.log(getSubjectCode);
  console.log(getCourseDevId);

  useEffect(() => {
    const GetSubjectsHandler = async () => {
      if (role === "CourseManager") {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/coursemanager/filteredcourselist`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            if (response.data) {
              setGetSubject(response.data.Course);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    GetSubjectsHandler();
  }, [getSubjectCode]);

  useEffect(() => {
    const GetCourseDevelopersHandler = async () => {
      if (role === "CourseManager") {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/coursemanager/coursedevelopers`,
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
            if (response.data) {
              setGetCourseDev(response.data.CourseDevelopers);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    GetCourseDevelopersHandler();
  }, [getCourseDevId]);

  const SubmitHandler = async () => {
    let toastId;

    if (getCourseDevId === undefined || getSubjectCode === undefined) {
      setError(true);
      toast.error("Please fill out the blank area");
    } else {
      setIsLoading(true);
      toastId = toast.info("Sending Request...");

      const tagCourseDev = {
        id: getCourseDevId,
        subjects: getSubjectCode,
      };
      console.log(tagCourseDev);

      await axios
        .post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/coursemanager/singlecoursedevelopersubjecttagging`,
          tagCourseDev,
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
            setSpecificSubj(undefined);
            setSpecificDev(undefined);
            setGetCourseDevId(undefined);
            setGetSubjectCode(undefined);
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.errors) {
            // to access the subject itself you can use this : error.response.data.SubjectAlreadyExists[1]
            toast.update(toastId, {
              render: error.response.data.errors.id[0],
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

  const listOfCourseHandler = () => {
    if (getSubject && getSubject.length !== 0) {
      return getSubject.map((subject, i) => {
        console.log(subject);
        return (
          <li key={i}>
            <button
              value={subject.course}
              type="button"
              className={`dropdown-item`}
              onClick={(e) => {
                setSpecificSubj(subject.course);
                setGetSubjectCode(subject.course_code);
              }}
            >
              {subject.course}
            </button>
          </li>
        );
      });
    }
  };

  const listOfCourseDeveloperHandler = () => {
    if (getCourseDev && getCourseDev.length !== 0) {
      return getCourseDev.map((courseDev, i) => {
        return (
          <li key={i}>
            <button
              value={courseDev.first_name}
              type="button"
              className={`dropdown-item`}
              onClick={(e) => {
                setSpecificDev(
                  courseDev.first_name + " " + courseDev.last_name
                );
                setGetCourseDevId(courseDev.id);
              }}
            >
              {courseDev.first_name} {courseDev.last_name}
            </button>
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ArrowNextAndPrevious>
        <h3 className="m-0">Course Developer - Subject Tagging</h3>
      </ArrowNextAndPrevious>
      <div className="mb-4">
        <label className="form-label fw-semibold fs-6 w-100 mb-3">
          <h5 className="mb-0">List of Subjects</h5>
        </label>
        <div id="dropdown" className="dropdown">
          <button
            className="dropdownMenu px-3 fw-normal btn dropdown-toggle w-100 d-flex justify-content-between align-items-center dropDownBorder border-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {specificSubj == undefined ? "Choose Course" : specificSubj}
          </button>
          <ul className="dropdown-menu w-100">{listOfCourseHandler()}</ul>
        </div>
      </div>
      <div className="mb-4">
        <label className="form-label fw-semibold fs-6 w-100 mb-3">
          <h5 className="mb-0">List of Course Developers</h5>
        </label>
        <div id="dropdown" className="dropdown">
          <button
            className="dropdownMenu px-3 fw-normal btn dropdown-toggle w-100 d-flex justify-content-between align-items-center dropDownBorder border-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {specificDev == undefined ? "Choose Developer" : specificDev}
          </button>
          <ul className="dropdown-menu w-100">
            {listOfCourseDeveloperHandler()}
          </ul>
        </div>
      </div>

      <button
        disabled={isLoading}
        className="taggingSubjectButton smallButtonTemplate sumbit-button btn rounded-2 mt-3"
        onClick={SubmitHandler}
      >
        Submit
      </button>
    </div>
  );
}

export default ManagerTagSubjToCourseDev;
