import { concat, get, map } from "lodash";
import { Navigate } from "react-router-dom";

/* ---------- Auth ---------- */
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import ForgotPass from "../../pages/Auth/ForgotPass";
import RecoveryPassRequest from "../../pages/Auth/RecoveryPassRequest";
import RecoveryPassReceive from "../../pages/Auth/RecoveryPassReceive";
import ValidatEmail from "../../pages/Auth/ValidatEmail";
import Profile from "../../pages/Auth/Profile";

/* ---------- Counters ---------- */
import Home from "../../pages/Home";

/* ---------- Counters ---------- */
import Counts from "../../pages/Counters";

/* ---------- Config ---------- */
import Config from "../../pages/Config";

/* ---------- History ---------- */
import PaymentHistory from "../../pages/History/PaymentHistory";
import Plans from "../../pages/History/Plans";

/* ---------- Products ---------- */
import ProductsList from "../../pages/Produts/ProductsList";
import ProductsNewEdit from "../../pages/Produts/ProductsList/NewEdit";

/* ---------- Transfers ---------- */
import Transfer from "../../pages/Transfer";
import TransferNewEdit from "../../pages/Transfer/NewEdit";

/* ---------- Warehouse ---------- */
import Warehouse from "../../pages/Warehouse/Warehouse";
import WarehouseNewEdit from "../../pages/Warehouse/Warehouse/NewEdit";

/* ---------- Inbound ---------- */
import Inbound from "../../pages/Inbound/Inbound";
import InboundNewEdit from "../../pages/Inbound/Inbound/NewEdit";

/* ---------- Outbound ---------- */
import Outbound from "../../pages/Outbound/Outbound";
import OutboundNewEdit from "../../pages/Outbound/Outbound/NewEdit";

/* ---------- Inventary ---------- */
import ActiveInventory from "../../pages/Inventory/ActiveInventory";
import ActiveInventoryCounts from "../../pages/Inventory/ActiveInventory/Counts";
import Inventory from "../../pages/Inventory";
import InventoryDetail from "../../pages/Inventory/Inventory";
import InventoryDetailCounts from "../../pages/Inventory/Inventory/Counts";
// import Payments from "../../pages/Payments";

import PublicRouter from "./PublicRouter";
import PrivateRoutes from "./PrivateRoutes";

/* ---------- Config ---------- */
import Reports from "../../pages/Reports";


const routesNoAuth = [
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
        key: "/home",
        path: "/home",
        element: <Home />,
    },
    {
        key: "profile",
        path: "/profile",
        element: <Profile />,
    }
]

const routesPublic = [
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
        path: "/inventory/:detailId",
        element: <InventoryDetail />,
    },
    {
        key: "inventory",
        path: "/inventory/:detailId/count/:countId",
        element: <InventoryDetailCounts />,
    },
    {
        key: "active_inventory",
        path: "/inventory/active/",
        element: <ActiveInventory />,
    },
    {
        key: "active_inventory",
        path: "/inventory/active/:detailId/count/:countId",
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

const routesHistor = [
    {
        key: "payment_history",
        path: "/payment/payment-history",
        element: <PaymentHistory />,
    },
    {
        key: "plans",
        path: "/payment/plans",
        element: <Plans />,
    },
]

const routesConfg = [
    {
        key: "config",
        path: "/config",
        element: <Config />,
    },
    {
        key: "config",
        path: "/config/uom",
        element: <Config />,
    },
    {
        key: "config",
        path: "/config/category",
        element: <Config />,
    },
    {
        key: "config",
        path: "/config/subCategory",
        element: <Config />,
    },
    {
        key: "config",
        path: "/config/stateProducts",
        element: <Config />,
    },
    {
        key: "config",
        path: "/config/inBoundType",
        element: <Config />,
    },
    {
        key: "config",
        path: "/config/outBoundType",
        element: <Config />,
    },
]

const routesReport = [
    {
        key: "report",
        path: "/report",
        element: <Reports />,
    },
    {
        key: "report",
        path: "/report/stockProducts",
        element: <Reports />,
    },
    {
        key: "report",
        path: "/report/inventoryMovements",
        element: <Reports />,
    },
    {
        key: "report",
        path: "/report/inMovements",
        element: <Reports />,
    },
    {
        key: "report",
        path: "/report/outMovements",
        element: <Reports />,
    }
]

const routesProduc = [
    {
        key: "product",
        path: "/product",
        element: <ProductsList />,
    },
    {
        key: "product",
        path: "/product/new",
        element: <ProductsNewEdit />,
    },
    {
        key: "product",
        path: "/product/:id",
        element: <ProductsNewEdit />,
    },
]

const routesTransf = [
    {
        key: "transfer",
        path: "/transfer",
        element: <Transfer />,
    },
    {
        key: "transfer",
        path: "/transfer/new",
        element: <TransferNewEdit />,
    },
    {
        key: "transfer",
        path: "/transfer/:id",
        element: <TransferNewEdit />,
    },
]

const routesWareho = [
    {
        key: "warehouse",
        path: "/warehouse/",
        element: <Warehouse />,
    },
    {
        key: "warehouse",
        path: "/warehouse/new",
        element: <WarehouseNewEdit />,
    },
    {
        key: "warehouse",
        path: "/warehouse/:id",
        element: <WarehouseNewEdit />,
    },
]

const routesInbound = [
    {
        key: "inbound",
        path: "/inbound/",
        element: <Inbound />,
    },
    {
        key: "inbound",
        path: "/inbound/new",
        element: <InboundNewEdit />,
    },
    {
        key: "inbound",
        path: "/inbound/:id",
        element: <InboundNewEdit />,
    },
]

const routesOutbound = [
    {
        key: "outbound",
        path: "/outbound/",
        element: <Outbound />,
    },
    {
        key: "outbound",
        path: "/outbound/new",
        element: <OutboundNewEdit />,
    },
    {
        key: "outbound",
        path: "/outbound/:id",
        element: <OutboundNewEdit />,
    },
]

const routesError = [
    {
        key: "404",
        path: "*",
        element: <Navigate to="/home" />,
    },
]

const routes = concat(
    map(routesAuth, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesInvent, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesConfg, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesReport, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesCounts, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesHistor, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesProduc, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesTransf, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesWareho, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesInbound, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesOutbound, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
    map(routesNoAuth, (route) => ({ ...route, element: <PublicRouter>{get(route, "element")}</PublicRouter> })),
    map(routesPublic, (route) => ({ ...route, element: <PublicRouter isPublic>{get(route, "element")}</PublicRouter> })),
    map(routesError, (route) => ({ ...route, element: <PrivateRoutes>{get(route, "element")}</PrivateRoutes> })),
)

export default routes