import React, { useState } from "react";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function DevInsertTitle() {
  const [item, setItem] = useState();
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
              <button className=" smallButtonTemplate text-right sumbit-button btn px-5">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevInsertTitle;
