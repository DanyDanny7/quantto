
import React from 'react';
import { Routes, Route } from "react-router-dom";

// import Login from "../../pages/Auth/Login";
// import ActiveInventory from "../../pages/Inventory/ActiveInventory";
import PaymentHistory from "../../pages/History/PaymentHistory"

const AuthRouter = () => {
    return (
        <div>
            <Routes>
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/active-inventory" element={<ActiveInventory />} /> */}
                <Route path="/reset" element={<PaymentHistory />} />
            </Routes>
        </div>
    )
}

export default AuthRouter