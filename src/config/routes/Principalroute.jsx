import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ActiveInventory from "../../pages/Inventory/ActiveInventory";
import AuthRouter from "./AuthRouter";
import PrivateRoutes from "./PrivateRoutes";
import ApplicationRouter from "./ApplicationRouter";
import PublicRouter from "./PublicRouter";

const Principalroute = () => {
    const isLogged = false;
    const isVerified = false;

    console.log("Principalroute")

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/active-inventory" element={<ActiveInventory />} />

                <Route path="/login" element={<PublicRouter isLogged={isLogged}><AuthRouter /></PublicRouter>} />
                <Route path="/validate-email" element={<PrivateRoutes isLogged={isLogged} isVerified={isVerified} ><ApplicationRouter /></PrivateRoutes>} />
                <Route path="/login" element={<PublicRouter isLogged={isLogged}><AuthRouter /></PublicRouter>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Principalroute