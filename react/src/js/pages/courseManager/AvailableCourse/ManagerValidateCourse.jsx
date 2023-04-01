import React from "react";

function ManagerValidateCourse({
  setComment,
  comment,
  HandleSubmit,
  HandleEdit,
  hasComment,
  isLoading,
}) {
  return (
    <div>
      <h4 className="ms-sm-3 my-4">Comments: </h4>
      <div className="ms-sm-3 ">
        <div class="form-floating " style={{ maxWidth: "700px" }}>
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            style={{ height: "300px" }}
          ></textarea>
          <label for="floatingTextarea">Comments</label>
          <div className="d-flex justify-content-end">
            {hasComment == false ? (
              <button
                className="taggingSubjectButton smallButtonTemplate sumbit-button btn rounded-2 mt-3"
                onClick={HandleSubmit}
                disabled={isLoading}
              >
                Submit
              </button>
            ) : (
              <button
                className="taggingSubjectButton smallButtonTemplate sumbit-button btn rounded-2 mt-3"
                onClick={HandleEdit}
                disabled={isLoading}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerValidateCourse;
