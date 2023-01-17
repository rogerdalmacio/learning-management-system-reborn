import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { role, userInfo } = useAuth();
    const location = useLocation();

    function HandlerUser() {
        if (role === allowedRoles) {
            return <Outlet />;
        } else if (userInfo?.email) {
            return (
                <Navigate
                    to="/unauthorized"
                    state={{ from: location }}
                    replace
                />
            );
        } else {
            return <Navigate to="/" state={{ from: location }} replace />;
        }
    }

    return HandlerUser();
};

export default RequireAuth;
