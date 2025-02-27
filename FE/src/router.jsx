import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import App from "./App";
import Dashboard from "./components/Dashboard";
import AccountPage from "./pages/AccountPage";
import PartnerGroupPage from "./pages/PartnerPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/accounts',
                element: <AccountPage />
            },
            {
                path: '/partners',
                element: <PartnerGroupPage />
            }
        ]
    },{
        path: '/login',
        element: <App />
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
])

export default router;