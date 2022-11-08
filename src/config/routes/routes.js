import { concat, get, map } from "lodash";
import { Navigate } from "react-router-dom";

// import Home from "../../pages/Home";
import ValidatEmail from "../../pages/Home/ValidatEmail";
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
// import Payments from "../../pages/Payments";

import PublicRouter from "./PublicRouter";
import PrivateRoutes from "./PrivateRoutes";


const routesPublics = [
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
    }
]

const routesPrivates = [
    /* ---------- 404 ---------- */
    {
        key: "404",
        path: "*",
        element: <Navigate to="/inventory/active-inventory" />,
    },
    /* ---------- Auth ---------- */
    {
        key: "profile",
        path: "/profile",
        element: <Profile />,
    },
    {
        key: "validate",
        path: "/validate-email",
        element: <ValidatEmail />,
    },
    /* ---------- Inventary ---------- */
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
    /* ---------- Counts ---------- */
    {
        key: "counts",
        path: "/counts",
        element: <Counts />,
    },
    /* ---------- History ---------- */
    {
        key: "payment_history",
        path: "/history/payment-history",
        element: <PaymentHistory />,

    },
]

const routes = concat(
    map(routesPublics, (route) => ({ ...route, element: <PublicRouter>{get(route, "element")}</PublicRouter> })),
    map(routesPrivates, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> }))
)

export default routes