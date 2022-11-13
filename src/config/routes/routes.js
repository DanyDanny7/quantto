import { concat, get, map } from "lodash";
import { Navigate } from "react-router-dom";

// import Home from "../../pages/Home";
/* ---------- Auth ---------- */
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import ForgotPass from "../../pages/Auth/ForgotPass";
import RecoveryPassRequest from "../../pages/Auth/RecoveryPassRequest";
import RecoveryPassReceive from "../../pages/Auth/RecoveryPassReceive";
import ValidatEmail from "../../pages/Auth/ValidatEmail";
import Profile from "../../pages/Auth/Profile";

import Counts from "../../pages/Counts";
import PaymentHistory from "../../pages/History/PaymentHistory";

/* ---------- Inventary ---------- */
import ActiveInventory from "../../pages/Inventory/ActiveInventory";
import ActiveInventoryCounts from "../../pages/Inventory/ActiveInventory/Counts";
import Inventory from "../../pages/Inventory";
import InventoryDetail from "../../pages/Inventory/Inventory";
import InventoryDetailCounts from "../../pages/Inventory/Inventory/Counts";
// import Payments from "../../pages/Payments";

import PublicRouter from "./PublicRouter";
import PrivateRoutes from "./PrivateRoutes";


import App from "../../App"
import Home from "../../pages/Home"


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


const routesAuth = [
    {
        key: "profile",
        path: "/profile",
        element: <Profile />,
    },
    {
        key: "validate",
        path: "/validate-email",
        element: <ValidatEmail />,
    }
]

const routesInvent = [
    {
        key: "inventory",
        path: "/inventory",
        element: <Inventory />,
    },
    {
        key: "inventory",
        path: "/inventory/:id",
        element: <InventoryDetail />,
    },
    {
        key: "inventory",
        path: "/inventory/:id/count/:id",
        element: <InventoryDetailCounts />,
    },
    {
        key: "active_inventory",
        path: "/inventory/active",
        element: <ActiveInventory />,
    },
    {
        key: "active_inventory",
        path: "/inventory/active/:id",
        element: <ActiveInventoryCounts />,
    },

]

const routesCounts = [
    {
        key: "counts",
        path: "/counts",
        element: <Counts />,
    },
]

const routesHistory = [
    {
        key: "payment_history",
        path: "/history/payment-history",
        element: <PaymentHistory />,
    },
]

const routesError = [
    {
        key: "404",
        path: "*",
        element: <Navigate to="/inventory/active" />,
    },
]


const routes = concat(
    map(routesAuth, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesInvent, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesCounts, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesHistory, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesPublics, (route) => ({ ...route, element: <PublicRouter>{get(route, "element")}</PublicRouter> })),
    map(routesError, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
)

export default routes