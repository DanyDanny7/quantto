
import React from 'react';
import { Navigate } from "react-router-dom";
import { get } from "lodash";
import { useSelector } from "react-redux"

const PublicRoutes = ({ children }) => {
    const loginReducer = useSelector((state) => state.loginReducer)
    return get(loginReducer, "isLogged") ? <Navigate to="/inventory/active-inventory" /> : children;
}

export default PublicRoutes