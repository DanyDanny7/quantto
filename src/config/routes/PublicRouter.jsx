
import React from 'react';
import { Navigate } from "react-router-dom";
import { get } from "lodash";
import { useSelector } from "react-redux"

const PublicRoutes = ({ children, isPublic }) => {
    const loginState = useSelector((state) => state.auth.login);
    
    if (isPublic) return children;
    return get(loginState, "isLogged") ? <Navigate to="/inventory/active" /> : children;
}

export default PublicRoutes