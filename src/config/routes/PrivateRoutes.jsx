
import React from 'react';
import { Navigate } from "react-router-dom";
import { get } from "lodash";
import { useSelector } from "react-redux"

const PublicRoutes = ({ children }) => {
    const loginReducer = useSelector((state) => state.loginReducer)

    return (
        <>
            {/* {(get(loginReducer, "isLogged") && get(loginReducer, "isVerified")) ? <Navigate to="/inventory/active-inventory" /> : <Navigate to="/validate-email" />} */}
            {get(loginReducer, "isLogged") ? children : <Navigate to="/login" />}
        </>
    )

}

export default PublicRoutes