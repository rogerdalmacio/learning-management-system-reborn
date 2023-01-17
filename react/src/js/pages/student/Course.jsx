import React from "react";
import { Link } from "react-router-dom";

function Course() {
    const Subjects = [
        {
            id: 1,
            title: "122 - CAP101 Capstone Project 1",
            img: "https://images.pexels.com/photos/669621/pexels-photo-669621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "Capstone-Photo",
            subjectTeacher: "Rommel Constantino",
        },
        {
            id: 2,
            title: "122 - ITSP3-A Big Data Analysis",
            img: "https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            alt: "BigData-Analysis-Photo",
            subjectTeacher: "Andy Adovas",
        },
        {
            id: 3,
            title: "122 - PRAC3301 Ojt/Practicum 1",
            img: "https://images.pexels.com/photos/8636606/pexels-photo-8636606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            alt: "Ojt-Photo",
            subjectTeacher: "NoName Garados",
        },
        {
            id: 4,
            title: "122 - CCS4112 Social And Professional Issues",
            img: "https://images.pexels.com/photos/6565752/pexels-photo-6565752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "Social-And-Professional-Issues-Photo",
            subjectTeacher: "Evelyn Hererra",
        },
        {
            id: 5,
            title: "122 - ITE4 System Integration And Architecture 2",
            img: "https://images.pexels.com/photos/389818/pexels-photo-389818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "Architecture-Photo",
            subjectTeacher: "Andy Adovas",
        },
    ];

    function SubjectHandler() {
        return Subjects.map((item) => (
            <div
                className="col-12 col-md-6 col-lg-6 col-xxl-3 mb-4 mb-md-5 mt-0 rounded px-sm-2"
                key={item.id}
            >
                <Link
                    to="/student/course/subject"
                    className="card mx-auto rounded overflow-hidden shadow text-dark text-decoration-none position-relative cardItemWidth"
                >
                    <img className="img-fluid" src={item.img} alt={item.alt} />

                    <div className="card-body">
                        <h4 className="cardTitle">{item.title}</h4>
                        <div className="d-flex my-2">
                            <i className="bi bi-person-workspace me-2 fs-4"></i>
                            <p className="card-text text-secondary subjTeacher">
                                Subject Teacher: {item.subjectTeacher}
                            </p>
                        </div>
                        <hr className="mt-2 w-100 m-auto lineBreak shadow" />
                        <div className="d-flex justify-content-end pt-3">
                            <p className="fw-semibold m-0 my-auto me-2">
                                Enter the course
                            </p>
                            <i className="bi bi-box-arrow-in-right my-auto fs-4"></i>
                        </div>
                    </div>
                </Link>
            </div>
        ));
    }

    return <div className="row w-100 m-auto">{SubjectHandler()}</div>;
}

export default Course;
