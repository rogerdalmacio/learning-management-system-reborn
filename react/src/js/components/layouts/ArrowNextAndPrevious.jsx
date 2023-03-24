import React, { Children } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function ArrowNextAndPrevious({ children }) {
  const navigate = useNavigate();

  function handleClickLeft() {
    navigate(-1); // Navigate back to the previous page
  }

  function handleClickRight() {
    navigate(+1); // Navigate back to the previous page
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <button
            className="border-0 NextPreviousButton me-2"
            onClick={handleClickLeft}
          >
            <i class="fs-1 text-secondary bx bxs-chevron-left"></i>
          </button>
          {children}
        </div>
        <div className="d-flex align-items-center">
          <button
            className="border-0 NextPreviousButton"
            onClick={handleClickRight}
          >
            <i class="fs-1 text-secondary bx bxs-chevron-right"></i>
          </button>
        </div>
      </div>
      <span className="loginLineBreak my-3" />
    </Fragment>
  );
}

export default ArrowNextAndPrevious;
