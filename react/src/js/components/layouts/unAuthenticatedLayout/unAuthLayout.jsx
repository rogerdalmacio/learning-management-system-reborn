import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <main className="d-block d-lg-flex" id="app">
            <Outlet />
        </main>
    );
};

export default Layout;
