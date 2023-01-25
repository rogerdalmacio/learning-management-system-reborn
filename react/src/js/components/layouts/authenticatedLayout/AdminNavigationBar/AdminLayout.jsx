import React, { useState, useEffect } from "react";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";
import { ToastContainer, toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const Layout = () => {
    const { userInfo } = useAuth();

    const [openSidebar, setOpenSidebar] = useState(true);
    const [imageExisting, setImageExisting] = useState();

    const userImageJpg = `${
        import.meta.env.VITE_API_BASE_URL
    }/storage/Admin/Admin${userInfo.id}.jpg`;

    // CHECK IF IMAGE EXISTS
    useEffect(() => {
        function checkIfImageExists(url, callback) {
            const img = new Image();
            img.src = url;

            if (img.complete) {
                callback(true);
            } else {
                img.onload = () => {
                    callback(true);
                };

                img.onerror = () => {
                    callback(false);
                };
            }
        }

        // USAGE
        checkIfImageExists(userImageJpg, (exists) => {
            if (exists) {
                setImageExisting(true);
            } else {
                setImageExisting(false);
            }
        });
    });

    return (
        <main>
            <div className="container-lg container-xl container-xxl" id="app">
                <ul className="topbar m-0 list-unstyled">
                    <TopNavbar
                        openSidebar={openSidebar}
                        setOpenSidebar={setOpenSidebar}
                        imageExisting={imageExisting}
                        userImagePng={userImageJpg}
                    />
                </ul>
                <div
                    className="px-0 d-xl-flex position-relative d-flex"
                    id="app"
                >
                    <SideNavbar openSidebar={openSidebar} />

                    <main className="home-section mx-3 bg-light rounded shadow w-100">
                        <div className="p-3 p-sm-5 w-100">
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
                                    userImageJpg,
                                    imageExisting,
                                    setImageExisting,
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
