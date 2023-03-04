import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuperDashboardData from "../../superAdmin/SuperDashboardData";
import SuperDashboardProgram from "../../superAdmin/SuperDashboardProgram";
import Loading from "../../../components/layouts/Loading";

function AdminDashboard() {
  const { role, token } = useAuth();
  const [getStudents, setGetStudents] = useState();
  const [getTeachers, setGetTeachers] = useState();
  const [getProgram, setGetProgram] = useState();

  console.log(getStudents);
  console.log(getTeachers);
  console.log(getProgram);

  const data = [getStudents].concat([getTeachers]);
  console.log(data);

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
            console.log(response);
            // id: "elixir",
            // label: "elixir",
            // value: 237,
            // color: "hsl(4, 70%, 50%)",

            const programCount = response.data.students.reduce(
              (count, { department }) => {
                count[department] = (count[department] || 0) + 1;
                return count;
              },
              {}
            );

            const programArray = Object.entries(programCount).map(
              ([id, value]) => ({
                id,
                ranking: id,
                value,
              })
            );

            setGetProgram(programArray);

            const studentsData = {
              id: "Students",
              label: "Students",
              value: response.data.students.length,
              color: "hsl(206, 78%, 47%)",
            };
            setGetStudents(studentsData);
          });
      }
      if (role === "admin") {
        await axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/core/admin/teachers`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log(response);
            const teachersData = {
              id: "Teachers",
              label: "Teachers",
              value: response.data.teachers.length,
              color: "hsl(232, 89%, 25%)",
            };
            setGetTeachers(teachersData);
          });
      }
    };
    GetAnnouncementHandler();
  }, []);

  return (
    <div>
      <div className="d-block">
        {getStudents !== undefined &&
        getTeachers !== undefined &&
        getProgram !== undefined ? (
          <div className="row g-2">
            <div className="col-4 pieGraphContainer position-relative">
              <div
                className="pieGraph"
                style={{ height: "500px", width: "100%" }}
              >
                <h5 className="text-secondary">Number of Users</h5>
                <SuperDashboardData data={data} />
              </div>
            </div>
            <div className="col-8 barGraphContainer position-relative">
              <div
                className="barGraph"
                style={{ height: "500px", width: "100%" }}
              >
                <SuperDashboardProgram data={getProgram} />
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
