import React, { useState, useContext } from "react";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";

const Layout = () => {
    const { userInfo } = useAuth();

    const [openSidebar, setOpenSidebar] = useState(true);
    const [imageExisting, setImageExisting] = useState();
    const [imageSrc, setImageSrc] = useState(
        `${
            import.meta.env.VITE_API_BASE_URL
        }/storage/CourseManager/CourseManager${userInfo.id}.jpg`
    );
    const userImagePng = `${
        import.meta.env.VITE_API_BASE_URL
    }/storage/CourseManager/CourseManager${userInfo.id}.png`;

    return (
        <main>
            <div className="container-lg container-xl container-xxl" id="app">
                <ul className="topbar m-0 list-unstyled">
                    <TopNavbar
                        openSidebar={openSidebar}
                        setOpenSidebar={setOpenSidebar}
                    />
                </ul>

                <div
                    className="px-0 d-xl-flex position-relative d-flex"
                    id="app"
                >
                    <SideNavbar openSidebar={openSidebar} />

                    <main className="home-section mx-3 bg-light rounded shadow w-100">
                        <div className="p-3 w-100">
                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                            <Outlet
                                context={[
                                    imageExisting,
                                    setImageExisting,
                                    imageSrc,
                                    setImageSrc,
                                    userImagePng,
                                ]}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </main>
    );
};

export default Layout;
