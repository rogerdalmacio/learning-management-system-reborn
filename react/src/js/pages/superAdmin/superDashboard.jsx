import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuperDashboardData from "./SuperDashboardData";
import SuperDashboardProgram from "./SuperDashboardProgram";
import Loading from "../../components/layouts/Loading";
import UserActivityLogs from "../Admin/AdminDashboard/UserActivityLogs";

function FileUpload() {
  const { role, token } = useAuth();
  const [getStudents, setGetStudents] = useState();
  const [getTeachers, setGetTeachers] = useState();
  const [getCourseManagers, setGetCourseManagers] = useState();
  const [getCourseDev, setGetCourseDev] = useState();
  const [getProgram, setGetProgram] = useState();

  console.log(getStudents);
  console.log(getTeachers);
  console.log(getProgram);
  // if (getStudents == undefined || getTeachers == undefined) {
  //   data = [
  //     {
  //       id: "none",
  //       label: "none",
  //       value: "1",
  //       color: "hsl(211, 70%, 50%)",
  //     },
  //     {
  //       id: "none1",
  //       label: "none1",
  //       value: "2",
  //       color: "hsl(147, 70%, 50%)",
  //     },
  //   ];
  // } else {
  //   data = [getStudents].concat([getTeachers]);
  // }

  const data1 = [getStudents].concat(getTeachers);
  const data2 = data1.concat(getCourseManagers);
  const data = data2.concat(getCourseDev);
  // let data;
  // if (getStudents !== undefined && getTeachers !== undefined) {
  //   data = [
  //     {
  //       id: getStudents.id,
  //       label: getStudents.label,
  //       value: getStudents.value,
  //       color: getStudents.color,
  //     },
  //     {
  //       id: getTeachers.id,
  //       label: getTeachers.label,
  //       value: getTeachers.value,
  //       color: getTeachers.color,
  //     },
  //     {
  //       id: "sass",
  //       label: "sass",
  //       value: 308,
  //       color: "hsl(211, 70%, 50%)",
  //     },
  //     {
  //       id: "lisp",
  //       label: "lisp",
  //       value: 186,
  //       color: "hsl(147, 70%, 50%)",
  //     },
  //     {
  //       id: "elixir",
  //       label: "elixir",
  //       value: 237,
  //       color: "hsl(4, 70%, 50%)",
  //     },
  //   ];
  // }
  // const datatae = [
  //   { program: "BSIT", name: "Tally" },
  //   { program: "BSMT", name: "Lerry" },
  //   { program: "BSIT", name: "Manny" },
  //   { program: "BSED", name: "Sally" },
  //   { program: "BSIS", name: "Billy" },
  //   { program: "BSCE", name: "Gken" },
  //   { program: "BSCRIM", name: "Capitle" },
  //   { program: "BSOA", name: "Christian" },
  //   { program: "BSBA", name: "Petty" },
  //   { program: "BSP", name: "Sponge" },
  //   { program: "BSIT", name: "gdf" },
  //   { program: "BSMT", name: "juy" },
  //   { program: "BSIT", name: "vdfd" },
  //   { program: "BSED", name: "r534" },
  //   { program: "BSIS", name: "fghfg" },
  //   { program: "BSCE", name: "hfgt" },
  //   { program: "BSCRIM", name: "qwe" },
  //   { program: "BSOA", name: "bhgh" },
  //   { program: "BSBA", name: "saa" },
  //   { program: "BSP", name: "hjuy" },
  // ];

  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "SuperAdmin") {
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
      if (role === "SuperAdmin") {
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
      if (role === "SuperAdmin") {
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
      if (role === "SuperAdmin") {
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
        getCourseManagers !== undefined &&
        getCourseDev !== undefined &&
        getProgram !== undefined ? (
          <div>
            <UserActivityLogs />
            <div className="row g-2 allGraphContainer w-100">
              <div className="col-12 col-md-4 pieGraphContainer position-relative">
                <div
                  className="pieGraph"
                  style={{ height: "400px", width: "100%" }}
                >
                  <h5 className="text-secondary">Number of Users</h5>
                  <SuperDashboardData data={data} />
                </div>
              </div>
              <div className="col-12 col-md-8 barGraphContainer ">
                <div
                  className="barGraph"
                  style={{ height: "400px", width: "100%" }}
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

export default FileUpload;
