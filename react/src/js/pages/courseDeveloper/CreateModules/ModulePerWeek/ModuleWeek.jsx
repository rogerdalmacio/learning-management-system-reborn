import React from "react";
import { useParams, Link } from "react-router-dom";
import InputLesson from "../InputLesson";

function ModuleWeek() {
    const params = useParams();
    console.log(params);
    const { week } = params;
    console.log(week);

    return (
        <div>
            <h3>{week}</h3>
            <ul>
                <Link
                    to={`/developer/createModules/${week}/preliminaryActivity`}
                >
                    <li>Preliminary Activity</li>
                </Link>
                <Link to={`/developer/createModules/${week}/lesson`}>
                    <li>Lesson</li>
                </Link>
                <Link to={`/developer/createModules/${week}/generalization`}>
                    <li>Generalization</li>
                </Link>
                <Link to={`/developer/createModules/${week}/analysis`}>
                    <li>Analysis</li>
                </Link>
                <Link to={`/developer/createModules/${week}/evaluation`}>
                    <li>Evaluation</li>
                </Link>
                <Link to={`/developer/createModules/${week}/assignment`}>
                    <li>Assignment</li>
                </Link>
            </ul>
        </div>
    );
}

export default ModuleWeek;
