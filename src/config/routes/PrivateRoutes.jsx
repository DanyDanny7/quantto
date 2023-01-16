
import React from 'react';
import { Navigate, useLocation } from "react-router-dom";

import { get } from "lodash";
import { useSelector } from "react-redux"

const PublicRoutes = ({ children }) => {
    let location = useLocation();
    const loginState = useSelector((state) => state.auth.login)

    const isLoged = get(loginState, "isLogged")
    const isValidate = get(loginState, "dataUser.active", "False") === "True"

    if (isLoged && !isValidate && get(location, "pathname") !== "/validate-email" && get(location, "pathname") !== "/profile") {
        return (<Navigate to="/validate-email" />)
    }
    return (
        <>
            {isLoged ? children : <Navigate to="/login" />}
        </>
    )

}

export default PublicRoutes