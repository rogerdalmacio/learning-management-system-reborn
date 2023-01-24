import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

function ManagerGetCreatedCourse() {
    const [item, setItem] = useState();

    const { token } = useAuth();

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/coursemanager/course`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
            .then((response) => {
                console.log(response);
            });
    });

    return <div></div>;
}

export default ManagerGetCreatedCourse;
