import Home from "../../pages/Home";
/* ---------- Auth ---------- */
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import ForgotPass from "../../pages/Auth/ForgotPass";
import RecoveryPassRequest from "../../pages/Auth/RecoveryPassRequest";
import RecoveryPassReceive from "../../pages/Auth/RecoveryPassReceive";
import Profile from "../../pages/Auth/Profile";

import Counts from "../../pages/Counts";
import PaymentHistory from "../../pages/History/PaymentHistory";
import Inventory from "../../pages/Inventory";
import ActiveInventory from "../../pages/Inventory/ActiveInventory";
import Payments from "../../pages/Payments";

const routes = [
    {
        key: "home",
        path: "/",
        element: <Home />,
    },

    /* ---------- Auth ---------- */
    {
        key: "login",
        path: "/login",
        element: <Login />,
    },
    {
        key: "register",
        path: "/register",
        element: <Register />,
    },
    {
        key: "forgot-pass",
        path: "/forgot-pass",
        element: <ForgotPass />,
    },
    {
        key: "recovery-pass-request",
        path: "/recovery-pass-request",
        element: <RecoveryPassRequest />,
    },
    {
        key: "recovery-pass-receive",
        path: "/recovery-pass-receive",
        element: <RecoveryPassReceive />,
    },
    {
        key: "profile",
        path: "/profile",
        element: <Profile />,
    },

    {
        key: "counts",
        path: "/counts",
        element: <Counts />,
    },
    {
        key: "payment_history",
        path: "/history/payment-history",
        element: <PaymentHistory />,

    },
    {
        key: "inventory",
        path: "/inventory",
        element: <Inventory />,
        children: [
            {
                index: true,
                element: <Inventory />,
            },
            // {
            //     path: "/active-inventory",
            //     element: <ActiveInventory />,
            // },
            // {
            //     path: ":teamId",
            //     element: <ActiveInventory />,
            // },
            // {
            //     path: ":teamId/edit",
            //     element: <EditTeam />,
            // },
            // {
            //     path: "new",
            //     element: <NewTeamForm />,
            // },
        ],
    },
    {
        key: "active_inventory",
        path: "/inventory/active-inventory",
        element: <ActiveInventory />,
    },
    {
        key: "payments",
        path: "/payments",
        element: <Payments />,
    },
]

export default routes