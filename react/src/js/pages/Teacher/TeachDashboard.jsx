import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

function TeachDashboard() {
  const { token, role } = useAuth();

  const [info, setInfo] = useState();
  console.log(info);
  useEffect(() => {
    const GetAnnouncementHandler = async () => {
      if (role === "teacher") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/teacher/listofstudents`,
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
            setInfo(response.data.students.sort((a, b) => b.id - a.id));
          });
      }
    };
    GetAnnouncementHandler();
  }, []);
  return <div></div>;
}

export default TeachDashboard;
