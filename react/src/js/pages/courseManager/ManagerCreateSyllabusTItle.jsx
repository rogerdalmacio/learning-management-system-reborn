import React, { useState } from "react";
import ArrowNextAndPrevious from "../../components/layouts/ArrowNextAndPrevious";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

function ManagerCreateSyllabusTItle() {
  const { token } = useAuth();
  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[3];
  const courseTitle = courseBase.replace(/%20/g, " ");
  console.log(courseBase);

  const [content, setContent] = useState({
    course_id: courseBase,
    week1: "",
    week2: "",
    week3: "",
    week4: "",
    week5: "",
    week6: "",
    week7: "",
    week8: "",
    week9: "",
    week10: "",
    week11: "",
    week12: "",
    week13: "",
    week14: "",
    week15: "",
    week16: "",
    week17: "",
    week18: "",
  });

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(content);
  const numberOfContent = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  const sampleTopics = [
    "Basic Data Structures: Arrays, Strings, Stacks, Queues",
    "Asymptotic analysis (Big-O notation)",
    "Basic math operations (addition, subtraction, multiplication, division, exponentiation)",
    "Basic Alogrithms",
    "Stacks & Queues",
    "Linked Lists",
    "Multidimensional Arrays",
    "Priority Queues & Heaps",
    "Bit Manipulation",
    "Sqrt(n) primality testing",
    "Euclids GCD Algorithm",
    "Basic Recursion",
    "Greedy Algorithms",
    "Basic Dynamic Programming",
    "Naive string searching",
    "O(n logn) Sorting",
    "Binary Searching",
    "Classification of Data Structure",
    "Basic Data Structures: Arrays, Strings, Stacks, Queues",
    "Asymptotic analysis (Big-O notation)",
    "Basic math operations (addition, subtraction, multiplication, division, exponentiation)",
    "Basic Alogrithms",
    "Stacks & Queues",
    "Linked Lists",
    "Multidimensional Arrays",
  ];
  const SubmitButton = async () => {
    //put your validation logic here
    let toastId;
    const hasEmptyString = Object.values(content).some((value) => value === "");

    if (hasEmptyString) {
      setHasError(true);
      toast.error("Please fill out the blank area");
    } else {
      setIsLoading(true);
      setHasError(false);
      console.log(content);
      toastId = toast.info("Sending Request...");

      const data = {
        course_id: content.course_id,
        week1: content.week1,
        week2: content.week2,
        week3: content.week3,
        week4: content.week4,
        week5: content.week5,
        week6: content.week6,
        week7: content.week7,
        week8: content.week8,
        week9: content.week9,
        week10: content.week10,
        week11: content.week11,
        week12: content.week12,
        week13: content.week13,
        week14: content.week14,
        week15: content.week15,
        week16: content.week16,
        week17: content.week17,
        week18: content.week18,
      };

      await axios
        .post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/coursemanager/course-syllabus`,
          data,
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
            // if (response.data.length !== 0) {
            //     toast.update(toastId, {
            //         render: `Student ID is ${response.data[0]}`,
            //         type: toast.TYPE.ERROR,
            //         autoClose: 2000,
            //     });
            // } else {
            toast.update(toastId, {
              render: "Request Successfully",
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
            // }]
            // setHasChange(!hasChange);
            setContent({});
            setIsLoading(false);
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
            setIdAlreadyTaken(error.response.data.errors.id[0]);
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent((prevState) => ({ ...prevState, [name]: value }));
  };
  console.log(content);
  const ContentHandler = () => {
    return numberOfContent.map((numberContent, i) => {
      const weekNumber = `week${numberContent}`;
      console.log(weekNumber);
      console.log(content.weekNumber);
      return (
        <div className="d-flex  align-items-center mb-3 px-sm-3 py-1" key={i}>
          <label
            className="me-2"
            htmlFor={numberContent}
            style={{ width: "120px" }}
          >
            <h5 className="mb-0">Week {numberContent}</h5>
          </label>
          <input
            id={numberContent}
            name={`week${numberContent}`}
            type="text"
            className={`smallInputField input-form form-control px-3 fs-6 fw-normal ${
              hasError && content[`week${numberContent}`] == ""
                ? "border-danger"
                : ""
            } `}
            placeholder={`ex. ${sampleTopics[i]}`}
            onChange={handleInputChange}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <ArrowNextAndPrevious>
        <h3 className="m-0">{courseTitle} Syllabus</h3>
      </ArrowNextAndPrevious>
      <p className="fs-5 fst-italic ms-sm-3 mb-4">syllabus for this course</p>
      <div className="mb-3 border-bottom">
        <div className="d-flex align-items-center mb-3 px-sm-3 py-1">
          <h5 className="mb-0" style={{ width: "120px" }}>
            Modules
          </h5>
          <h5 className="mb-0">Topics</h5>
        </div>
      </div>
      <div className="mb-4">{ContentHandler()}</div>
      <button
        className="taggingSubjectButton smallButtonTemplate sumbit-button btn rounded-2 mt-3"
        disabled={isLoading}
        onClick={SubmitButton}
      >
        Submit
      </button>
    </div>
  );
}

export default ManagerCreateSyllabusTItle;
