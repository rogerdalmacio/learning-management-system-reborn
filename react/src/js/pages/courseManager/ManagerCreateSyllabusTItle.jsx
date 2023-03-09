import React, { useState } from "react";

function ManagerCreateSyllabusTItle() {
  const [content, setContent] = useState({
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
  ];

  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[2];
  const courseTitle = courseBase.replace(/%20/g, " ");
  console.log(content);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContent((prevState) => ({ ...prevState, [name]: value }));
  };
  console.log(content);
  const ContentHandler = () => {
    return numberOfContent.map((content, i) => {
      console.log(content);
      return (
        <div className="d-flex  align-items-center mb-3 px-sm-3 py-1" key={i}>
          <label className="me-2" htmlFor={content} style={{ width: "120px" }}>
            <h5 className="mb-0">Week {content}</h5>
          </label>
          <input
            id={content}
            name={`week${content}`}
            type="text"
            className={`smallInputField input-form form-control px-3 fs-6 fw-normal `}
            placeholder={`ex. ${sampleTopics[i]}`}
            onChange={handleInputChange}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <h3 className="mb-4">{courseTitle} Syllabus</h3>
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
        className="taggingSubjectButton buttonTemplate sumbit-button btn rounded-2 mt-3"
        // onClick={SubmitButton}
      >
        Submit
      </button>
    </div>
  );
}

export default ManagerCreateSyllabusTItle;
