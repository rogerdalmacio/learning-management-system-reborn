import React, { useState } from "react";

function AdminWeekGrant() {
  const [isToggled, setIsToggled] = useState({
    week1: false,
    week2: false,
    week3: false,
    week4: false,
    week5: false,
    week6: false,
    week7: false,
    week8: false,
    week9: false,
    week10: false,
    week11: false,
    week12: false,
    week13: false,
    week14: false,
    week15: false,
    week16: false,
    week17: false,
    week18: false,
    week19: false,
    week20: false,
    week21: false,
    week22: false,
    week23: false,
    week24: false,
  });
  console.log(isToggled);
  const weekNumber = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  const handleToggle = (weekNum) => {
    setIsToggled({ ...isToggled, [weekNum]: !isToggled[weekNum] });
  };
  console.log(isToggled.week1);

  console.log();
  const WeeksHandler = () => {
    return Object.keys(isToggled).map((week) => {
      console.log(isToggled);
      console.log(isToggled[week]);
      // const weekNum = `week${week}`;
      // console.log(isToggled[i]);
      // console.log(Object.values(isToggled));
      return (
        <div className="d-flex align-items-center mb-3">
          <label className="fs-4 fw-semibold me-3" htmlFor="">
            Week {week}
          </label>
          <div
            class={`switch-button ${
              isToggled[week] ? "switchButtonColor" : "switchButtonColorFalse"
            }`}
          >
            <input
              class="switch-button-checkbox"
              type="checkbox"
              // name={`week${week}`}
              // value={isToggled.weekNum}
              checked={isToggled[week]}
              onChange={(e) => {
                handleToggle(week);
              }}
            ></input>
            <label class="switch-button-label" for="">
              <span class="switch-button-label-span">Close</span>
            </label>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h3 className="mb-4">Granting Week</h3>
      <div className="mb-4">{WeeksHandler()}</div>
    </div>
  );
}

export default AdminWeekGrant;
