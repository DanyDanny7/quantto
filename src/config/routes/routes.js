import Home from "../../pages/Home";

import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import Profile from "../../pages/Auth/Profile";
import ForgotPass from "../../pages/Auth/ForgotPass";
import RecoveryPass from "../../pages/Auth/RecoveryPass";

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
        key: "register",
        path: "/forgot-pass",
        element: <ForgotPass />,
    },
    {
        key: "register",
        path: "/recovery-pass",
        element: <RecoveryPass />,
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