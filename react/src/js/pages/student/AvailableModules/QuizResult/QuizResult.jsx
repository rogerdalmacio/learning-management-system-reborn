import React, { Fragment } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const QuizResult = ({ percentage, percentage2 }) => {
    const MainContent = () => {
        if (percentage) {
            return (
                <div className="quizResultContainer">
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',
                            textSize: "25px",
                            // Colors
                            pathColor: `rgba(7, 23, 122, 1)`,
                            textColor: "#252525",
                            // trailColor: "#1b84d6",
                            backgroundColor: "#07177a",
                        })}
                    />
                </div>
            );
        } else {
            return (
                <div className="quizResultContainer">
                    <CircularProgressbar
                        value={percentage2}
                        text={`${percentage2}`}
                        maxValue={10}
                        styles={buildStyles({
                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',
                            textSize: "25px",
                            // Colors
                            pathColor: `rgba(7, 23, 122, 1)`,
                            textColor: "#252525",
                            // trailColor: "#1b84d6",
                            backgroundColor: "#07177a",
                        })}
                    />
                </div>
            );
        }
    };

    return <Fragment>{MainContent()}</Fragment>;
};

export default QuizResult;
