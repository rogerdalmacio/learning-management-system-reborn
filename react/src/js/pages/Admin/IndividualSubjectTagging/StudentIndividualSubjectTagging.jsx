import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import ListOfStudentWithSubjects from "./StudentListWithSubjects";
import { data, states } from "../makeData";
import Loading from "../../../components/layouts/Loading";

function StudentIndividualSubjectTagging() {
  const { token, role } = useAuth();

  const [studentId, setStudentId] = useState("");
  const [studentSubject, setStudentSubject] = useState([]);
  const [error, setError] = useState();
  const [getSubject, setGetSubject] = useState();
  const [alreadyExist, setAlreadyExist] = useState();
  const [listSubjectAlreadyExist, setSubjectAlreadyExist] = useState();
  // to update data list
  const [updatedList, setUpdatedList] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [getAnnouncement, setGetAnnouncement] = useState(data);
  const [tableData, setTableData] = useState(getAnnouncement);

  console.log(listSubjectAlreadyExist);
  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "admin") {
        await axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/core/admin/students`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response.data.students);
            setGetAnnouncement(response.data.students);
            setTableData(response.data.students);
          });
      }
    };
    GetAnnouncementHandler();
  }, [updatedList]);

  useEffect(() => {
    const GetSubjectsHandler = async () => {
      if (role === "admin") {
        await axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/core/subjects`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            setGetSubject(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    GetSubjectsHandler();
  }, []);

  const StudTagSubjSubmit = () => {
    let toastId;

    if (
      studentId == "" ||
      studentSubject == "" ||
      studentId == undefined ||
      studentSubject == undefined
    ) {
      setError(true);
      toast.error("Please fill out the blank area");
    } else {
      setError(false);

      var studentSubjectFinal = studentSubject.join();
      console.log(studentSubjectFinal);

      const item = {
        id: studentId,
        subjects: studentSubjectFinal,
      };

      console.log(item);

      toastId = toast.info("Sending Request...");

      axios
        .post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/core/singlestudentsubjecttagging`,
          item,
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
            setSubjectAlreadyExist(undefined);
            setStudentSubject([]);
            setSearchTerm("");
            setStudentId("");
            setUpdatedList(!updatedList);
          } else {
            throw new Error(response.status || "Something Went Wrong!");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.SubjectAlreadyExists) {
            // to access the subject itself you can use this : error.response.data.SubjectAlreadyExists[1]
            setSubjectAlreadyExist(
              Object.values(error.response.data.SubjectAlreadyExists).join(", ")
            );
            toast.update(toastId, {
              render: `Subject is already exist`,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          } else if (error.response.data.message) {
            toast.update(toastId, {
              render: `${error.response.data.message}`,
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
        });
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (getSubject && getSubject !== undefined) {
      const matchingCourses = getSubject.filter((course) =>
        course.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(matchingCourses);
    }
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 250);
  };

  console.log(alreadyExist);
  console.log(studentSubject);
  const getCourseCode = (e) => {
    if (!studentSubject.includes(e.target.value)) {
      setStudentSubject([...studentSubject, e.target.value]);
    } else {
      toast.error("Subject is already exist on the list");
    }
  };

  const deleteByValue = (value) => {
    setStudentSubject((oldValues) => {
      return oldValues.filter((item) => item !== value);
    });
  };

  const ListOfSubjectHandler = () => {
    console.log(studentSubject.length === 0);
    if (studentSubject.length !== 0) {
      return studentSubject.map((subject, i) => {
        console.log(subject);
        return (
          <div
            key={i}
            className="TagSubjectList py-1 ps-2 pe-1 mb-2 border rounded me-2 d-flex align-items-center"
          >
            <p className="TagSubjectListText mb-0 me-1">{subject}</p>
            <button
              className="btn p-0 border border-0"
              onClick={() => deleteByValue(subject)}
            >
              <i className="bi bi-x fs-5"></i>
            </button>
          </div>
        );
      });
    }
  };
  console.log(tableData[0].id);
  if (tableData[0].id == "...") {
    return <Loading />;
  } else {
    return (
      <div>
        <h3 className="mb-4">Student - Individual Subject Tagging</h3>
        <div className="mb-4">
          <label
            htmlFor="studentSubjectTaggingId"
            className="form-label fw-semibold fs-6 w-100 mb-3"
          >
            <h5 className="mb-0">Student ID</h5>
          </label>
          <input
            type="number"
            className={`inputField input-form form-control px-3 fs-6 fw-normal ${
              studentId === "" && error ? "errorInput" : "noErrorInput"
            }`}
            value={studentId}
            id="studentSubjectTaggingId"
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="TagSubjectSearchContainer">
            <label
              htmlFor="studentSubjectTaggingId"
              className="form-label fw-semibold fs-6 w-100 mb-3"
            >
              <h5 className="mb-0">Search Subject</h5>
            </label>

            <input
              type="search"
              className="form-control search-box text-dark"
              placeholder="Search courses"
              value={searchTerm}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {showSuggestions && suggestions && (
              <ul className="suggestion-list border rounded list-unstyled bg-secondary w-100">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="suggestion-item">
                    <button
                      value={suggestion.course_code}
                      type="button"
                      className="btn border rounded border-0 w-100 d-flex justify-content-start py-2"
                      onClick={(e) => getCourseCode(e)}
                    >
                      {suggestion.course} / {suggestion.course_code}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="studentSubjectTaggingSubj"
            className="form-label fw-semibold fs-6 w-100 mb-3"
          >
            <h5 className="mb-0">Subject List:</h5>
          </label>
          <div className="TagSubjectListContainer d-flex flex-wrap">
            {ListOfSubjectHandler()}
          </div>
        </div>
        <button
          className="taggingSubjectButton buttonTemplate sumbit-button btn rounded-2 mt-3"
          onClick={StudTagSubjSubmit}
        >
          Submit
        </button>
        <div className="d-flex justify-content-center mt-2">
          {listSubjectAlreadyExist !== undefined && (
            <p className="text-danger fst-italic fs-6">
              * Subject{" "}
              <span className="fw-bold">{listSubjectAlreadyExist}</span> already
              exist *
            </p>
          )}
        </div>
        <ListOfStudentWithSubjects
          updatedList={updatedList}
          setUpdatedList={setUpdatedList}
          tableData={tableData}
          setTableData={setTableData}
          getAnnouncement={getAnnouncement}
          setGetAnnouncement={setGetAnnouncement}
        />
      </div>
    );
  }
}

export default StudentIndividualSubjectTagging;
