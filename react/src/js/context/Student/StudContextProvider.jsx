import { createContext, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const StudentContext = createContext({});

export const StudContextProvider = ({ children }) => {
    const { token, role } = useAuth();

    const [courses, setCourses] = useState();
    const [activity, setActivity] = useState();
    const [module, setModule] = useState();
    const [week, setWeek] = useState();

    // const pathname = window.location.pathname;
    // const pathArray = pathname.split("/");
    // const courseBase = pathArray[4];
    // console.log(courseBase);
    console.log(activity);
    console.log(courses);
    console.log(week);
    console.log(module);

    useEffect(() => {
        const renderCourse = async () => {
            if (role === "student") {
                await axios
                    .get(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/api/student/courses`,
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
                        setCourses(response.data.subjects);
                    });
            }
        };

        renderCourse();
    }, []);

    useEffect(() => {
        const renderModule = async () => {
            if (role === "student" && week) {
                await axios
                    .get(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/api/student/module/${week}`,
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
                        setModule(response.data.Module);
                    });
            }
        };

        renderModule();
    }, [week]);

    useEffect(() => {
        const renderActivity = async () => {
            if (role === "student") {
                await axios
                    .get(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/api/student/lesson/${week}`,
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
                        setActivity(response.data);
                    });
            }
        };

        renderActivity();
    }, []);

    return (
        <StudentContext.Provider value={{ courses, setWeek, module, activity }}>
            {children}
        </StudentContext.Provider>
    );
};

export default StudentContext;
