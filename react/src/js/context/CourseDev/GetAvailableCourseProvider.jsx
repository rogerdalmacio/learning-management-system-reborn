import { createContext, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const GetAvailableCourseContext = createContext({});

export const GetAvailableCourseProvider = ({ children }) => {
    const { token, role } = useAuth();


    const [course, setCourse] = useState();

    useEffect(() => {
        const renderCourse = async () => {
            if (role === "courseDeveloper") {
                axios
                    .get(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/api/coursedeveloper/course`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        setCourse(response.data.course);
                    });
            }
        };
        renderCourse();
    }, []);

    return (
        <GetAvailableCourseContext.Provider value={{ course }}>
            {children}
        </GetAvailableCourseContext.Provider>
    );
};

export default GetAvailableCourseContext;
