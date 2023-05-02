import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/layouts/Loading";
import { toast } from "react-toastify";
import ArrowNextAndPrevious from "../../components/layouts/ArrowNextAndPrevious";

function AdminWeekGrant() {
  const { role, token } = useAuth();
  const [isToggled, setIsToggled] = useState();

  console.log(isToggled);

  useEffect(() => {
    const GetModules = async () => {
      if (role === "admin") {
        await axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/core/modules`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response);
            const getModules = response.data.modules.sort(
              (a, b) => a.week - b.week
            );
            const result = getModules.reduce((acc, { week, status }) => {
              acc[`week${week}`] = Boolean(status);
              return acc;
            }, {});
            console.log(result);
            setIsToggled(result);
          });
      }
    };
    GetModules();
  }, []);

  const handleToggle = async (weekNum, e) => {
    toast.success("Module state successfully changed");

    const name = e.target.name;
    const weekNumber = parseInt(name.match(/\d+/)[0]);
    console.log(weekNumber);
    const getValue = e.target.checked;
    console.log(name, ":", getValue);
    setIsToggled({ ...isToggled, [weekNum]: !isToggled[weekNum] });

    const status = { status: getValue };

    await axios
      .patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/core/batchmoduleupdatestatus/${weekNumber}`,
        status,
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
        } else {
          throw new Error(response.status || "Something Went Wrong!");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  console.log();
  const WeeksHandler = () => {
    if (isToggled !== undefined && isToggled !== null) {
      return Object.keys(isToggled).map((week, i) => {
        const weekNumber = week.match(/\d+/)[0];
        return (
          <div className="d-block d-sm-flex align-items-center mb-3" key={i}>
            <label className="fs-4 fw-semibold me-3">Week {weekNumber}</label>
            <div
              className={`switch-button ${
                isToggled[week] ? "switchButtonColor" : "switchButtonColorFalse"
              }`}
            >
              <input
                className="switch-button-checkbox"
                type="checkbox"
                name={week}
                value={isToggled[week]}
                checked={isToggled[week]}
                onChange={(e) => {
                  handleToggle(week, e);
                  // handleChange(e);
                }}
              ></input>
              <label className="switch-button-label">
                <span className="switch-button-label-span">Close</span>
              </label>
            </div>
          </div>
        );
      });
    }
  };

  if (isToggled !== undefined && isToggled !== null) {
    return (
      <div>
        <ArrowNextAndPrevious>
          <h3 className="m-0">Granting Week</h3>
        </ArrowNextAndPrevious>
        <div className="mb-4">{WeeksHandler()}</div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default AdminWeekGrant;
