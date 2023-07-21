import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./routes";

const router = createBrowserRouter(routes);

const RouterProviderApp = () => <RouterProvider router={router} />;

export default RouterProviderApp;
