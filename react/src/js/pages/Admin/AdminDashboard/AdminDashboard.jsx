import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuperDashboardData from "../../superAdmin/SuperDashboardData";
import SuperDashboardProgram from "../../superAdmin/SuperDashboardProgram";
import Loading from "../../../components/layouts/Loading";
import UserActivityLogs from "./UserActivityLogs";
import ArrowNextAndPrevious from "../../../components/layouts/ArrowNextAndPrevious";

function AdminDashboard() {
  const { role, token } = useAuth();
  const [getStudents, setGetStudents] = useState();
  const [getTeachers, setGetTeachers] = useState();
  const [getCourseManagers, setGetCourseManagers] = useState();
  const [getCourseDev, setGetCourseDev] = useState();

  const [getProgram, setGetProgram] = useState();

  console.log(getStudents);
  console.log(getTeachers);
  console.log(getCourseManagers);
  console.log(getProgram);

  const data1 = [getStudents].concat(getTeachers);
  const data2 = data1.concat(getCourseManagers);
  const data = data2.concat(getCourseDev);

  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "admin") {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/listofusers/coursemanagers`,
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
            const courseManData = {
              id: "Course Managers",
              label: "Course Managers",
              value: response.data.CourseManagers.length,
              color: "hsl(232, 290%, 25%)",
            };
            console.log(courseManData);
            setGetCourseManagers(courseManData);
          });
      }
      if (role === "admin") {
        await axios
          .get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/listofusers/coursedevelopers`,
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
            const courseDevData = {
              id: "Course Developers",
              label: "Course Developers",
              value: response.data.CourseDeveloper.length,
              color: "hsl(232, 290%, 25%)",
            };
            console.log(courseDevData);
            setGetCourseDev(courseDevData);
          });
      }
      if (role === "admin") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/listofusers/students`,
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
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/listofusers/teachers`,
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
            const teachersData = {
              id: "Teachers",
              label: "Teachers",
              value: response.data.teachers.length,
              color: "hsl(232, 89%, 25%)",
            };
            console.log(teachersData);
            setGetTeachers(teachersData);
          });
      }
    };
    GetAnnouncementHandler();
  }, []);

  return (
    <div>
      <ArrowNextAndPrevious>
        <h3 className="m-0">Dashboard</h3>
      </ArrowNextAndPrevious>
      <div className="d-block">
        {getStudents !== undefined &&
        getTeachers !== undefined &&
        getCourseManagers !== undefined &&
        getCourseDev !== undefined &&
        getProgram !== undefined ? (
          <div>
            <UserActivityLogs />
            <div className="row g-2">
              <div className="col-12 col-md-4  pieGraphContainer position-relative">
                <div
                  className="pieGraph"
                  style={{ height: "500px", width: "100%" }}
                >
                  <h5 className="text-secondary">Number of Users</h5>
                  <SuperDashboardData data={data} />
                </div>
              </div>
              <div className="col-12 col-md-8  barGraphContainer position-relative">
                <div
                  className="barGraph"
                  style={{ height: "500px", width: "100%" }}
                >
                  <SuperDashboardProgram data={getProgram} />
                </div>
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
