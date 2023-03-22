import React from "react";

function ManagerValidateCourse() {
  return (
    <div>
      <h4 className="ms-sm-3 my-4">Comments: </h4>
      <div className="ms-sm-3">
        <div class="form-floating" style={{ maxWidth: "700px" }}>
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            style={{ height: "300px" }}
          ></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>
      </div>
    </div>
  );
}

export default ManagerValidateCourse;
