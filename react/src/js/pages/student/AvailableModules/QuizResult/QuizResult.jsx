import React, { Fragment } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const QuizResult = ({
  percentageText,
  percentage,
  percentage2Text,
  percentage2,
  percentageExam,
  percentageExam2,
}) => {
  const MainContent = () => {
    if (percentage || percentage == 0) {
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
    } else if (percentage2 || percentage2 == 0) {
      return (
        <div className="quizResultContainer">
          <CircularProgressbar
            value={percentage2}
            text={`${percentage2}`}
            maxValue={percentage2Text}
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
