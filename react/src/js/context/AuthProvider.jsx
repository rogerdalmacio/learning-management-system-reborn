import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    let userInfo;
    let role;
    let token;

    const user = localStorage.getItem("user-info");
    const getToken = localStorage.getItem("token");
    const type = localStorage.getItem("type");

    if (user) {
        userInfo = JSON.parse(user);
        role = JSON.parse(type);
        token = JSON.parse(getToken);
    }

    return (
        <AuthContext.Provider value={{ token, role, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
