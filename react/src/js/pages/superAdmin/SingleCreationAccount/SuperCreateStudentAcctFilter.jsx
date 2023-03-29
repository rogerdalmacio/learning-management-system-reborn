import React, { Fragment } from "react";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";
import { Link } from "react-router-dom";

function SuperCreateStudentAcctFilter() {
  // Course Title
  const pathname = window.location.pathname;
  const pathArray = pathname.split("/");
  const courseBase = pathArray[3];

  const StudentYear = [
    { programCode: "BSIT", program: "BS Information Technology" },
    { programCode: "BSHM", program: "BS Hospitality Management" },
    { programCode: "BSOA", program: "BS Office Administration" },
    { programCode: "BSBA", program: "BS Business Administration" },
    { programCode: "BSC", program: "BS Criminology" },
    { programCode: "BEE", program: "Bachelor of Elementary Education" },
    { programCode: "BSE", program: "Bachelor of Secondary Education" },
    { programCode: "BSCE", program: "BS Computer Engineering" },
    { programCode: "BSTM", program: "BS Tourism Management" },
    { programCode: "BSE", program: "BS Entrepreneurship" },
    { programCode: "BSAIS", program: "BS Accounting Information System" },
    { programCode: "BSP", program: "BS Psychology" },
    { programCode: "BLIS", program: "BL Information Science" },
  ];
  const AvailableCourseHandler = () => {
    return StudentYear.map((year, i) => {
      console.log(year);
      return (
        <div key={i}>
          <Link
            to={`/superadmin/studentCreateSingleAccount/${year.programCode}`}
            className="text-decoration-none"
          >
            <div className="DevCourseContainer py-3 px-2 mb-3 shadow p-3">
              <h2 className="DevCourseHeader mb-0 me-3 pe-3 fs-4">
                {year.program} {"("}
                {year.programCode}
                {")"}
              </h2>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <ArrowNextAndPrevious>
        <h2 className="mb-0">Student Creation of Account - Programs</h2>
      </ArrowNextAndPrevious>
      <div className="ms-sm-4">{AvailableCourseHandler()}</div>
    </Fragment>
  );
}

export default SuperCreateStudentAcctFilter;
