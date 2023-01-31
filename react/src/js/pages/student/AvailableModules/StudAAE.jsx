import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useStudentContext from "../../../hooks/Student/useStudentContext";

function StudAAE() {
    const { userInfo, token } = useAuth();
    const { quizid, quiz, courses, setWeekQuiz, setQuizId } =
        useStudentContext();

    const [quizInfo, setQuizInfo] = useState();

    const pathname = window.location.pathname;
    const pathArray = pathname.split("/");
    const courseBase = pathArray[2];
    const courseTitle = courseBase.replace(/%20/g, " ");
    const weekMod = pathArray[4];
    const currentWeek = weekMod.replace("week", "Week ");
    const weekForModule = weekMod.match(/\d+/)[0];
    const contentType = pathArray[5];
    console.log(contentType);

    //getting module_id for modules
    useEffect(() => {
        if (courses) {
            courses.map((course) => {
                if (course.course == courseTitle) {
                    course.module.map((mod) => {
                        if (mod.week == weekForModule) {
                            setWeekQuiz(mod.id);
                        }
                    });
                }
            });
        }
        console.log(quiz);
        if (quiz) {
            const act = quiz.quiz
                .filter((qui) => qui.quiz_type == contentType)
                .map((content) => {
                    setQuizInfo(content);
                    setQuizId(content.id);
                });
        }
    });

    const AttemptQuizHandler = async () => {
        window.open(
            `${window.location.origin}/student/${courseBase}/modules/${weekMod}/aae/quiz`,
            "_blank"
            // ,
            // `toolbar=0,location=0,menubar=0,resizable=no,height=${10000},width=${10000},top=0,left=0,fullscreen=yes`
        );

        const item = {
            student_id: userInfo.id,
            quiz_id: quizid,
            module_id: quizInfo.module_id,
            preliminaries: quizInfo.preliminaries,
            quiz_type: quizInfo.quiz_type,
            attempt: true,
            score: 0,
            logs: "x",
            snapshot: false,
        };

        await axios
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/api/student/quizresult`,
                item,
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
            });
    };

    // const AttemptQuizHandler = () => {
    //     const Item = {
    //         student_id: userInfo.id,
    //         quiz_id: quizid,
    //         module_id: quizInfo.module_id,
    //         preliminaries: quizInfo.preliminaries,
    //         quiz_type: quizInfo.quiz_type,
    //         attempt: false,
    //         score: null,
    //         logs: null,
    //         snapshot: false,
    //     };
    // };

    return (
        <div>
            <h4 className="mb-3">
                Analysis, Application, and Exploration for {currentWeek}
            </h4>

            <div className="d-flex justify-content-center">
                <div className="d-block text-center">
                    <p>Attempt allowed: 1</p>
                    <p>Time Limit: 1 hour</p>
                    <button
                        className=" smallButtonTemplate text-right sumbit-button btn px-5"
                        onClick={AttemptQuizHandler}
                    >
                        Attempt Quiz Now
                    </button>
                </div>
            </div>
        </div>
    );
}
export default StudAAE;
