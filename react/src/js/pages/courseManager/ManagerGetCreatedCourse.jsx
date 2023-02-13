import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

function ManagerGetCreatedCourse() {
    const [item, setItem] = useState();

    const { token } = useAuth();

    useEffect(() => {
        axios
            .get(
                `${import.meta.env.VITE_API_BASE_URL}/api/coursemanager/course`,
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
            });
    });

    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga modi
            nobis ex velit voluptates. Nisi quo at rem! Nostrum vitae, officiis
            amet repellendus cupiditate voluptates odio expedita natus inventore
            vel dolor perferendis perspiciatis voluptatum blanditiis. Aliquam
            dolor tempore doloribus modi quibusdam officiis nihil eligendi
            praesentium quaerat perspiciatis saepe sed, libero in repudiandae
            sint culpa autem rem, nesciunt cum. Quae aliquam veniam, magnam
            itaque eum vel ipsum amet quis quibusdam possimus, est eos
            laudantium dolor quia praesentium, minus quaerat totam sapiente eius
            repellat tenetur hic eveniet omnis. Qui incidunt assumenda inventore
            tempore hic sunt? Repellendus, cupiditate. Reprehenderit nemo vero
            laudantium quibusdam.
        </div>
    );
}

export default ManagerGetCreatedCourse;
