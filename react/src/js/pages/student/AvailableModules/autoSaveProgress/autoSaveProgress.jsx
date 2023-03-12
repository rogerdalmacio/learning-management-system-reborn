import React, { useEffect, useState } from "react";
import axios from "axios";
import StudQuizEvaluation from "../AnotherTabForQuiz/StudQuizEvaluation";
import useAuth from "../../../../hooks/useAuth";
export const autoSaveHandler = async () => {
  const { role, token } = useAuth();
  const [progress, setProgress] = useState("fuck");
  console.log(progress);
  useEffect(() => {
    const progressHandler = async () => {
      if (role === "student") {
        await axios
          .get(
            `${import.meta.env.VITE_API_BASE_URL}/api/student/fetchautosave`,
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
            setProgress(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    progressHandler();
  });

  return <StudQuizEvaluation progress={progress} />;
};
