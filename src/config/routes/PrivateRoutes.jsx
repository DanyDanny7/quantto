
import React from 'react';
import { Navigate } from "react-router-dom";
import { get } from "lodash";
import { useSelector } from "react-redux"

const PublicRoutes = ({ children }) => {
    const loginState = useSelector((state) => state.auth.login)
    return (
        <>
            {/* {(get(loginState, "isLogged") && get(loginState, "isVerified")) ? <Navigate to="/inventory/active-inventory" /> : <Navigate to="/validate-email" />} */}
            {get(loginState, "isLogged") ? children : <Navigate to="/login" />}
        </>
    )
}

export default PublicRoutes