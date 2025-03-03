import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import App from "./App";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";
import PartnerPage from "./pages/PartnerPage";
import ReceiptVoucher from "./components/ReceiptVoucher";
import PaymentVoucher from "./components/PaymentVoucher";
import OtherVoucher from "./components/OtherVoucher";
import CurrenciesForm from "./components/CurrenciesForm";
import PartnerGroupPage from "./pages/PartnerGroupPage";
import Voucher from "./components/VoucherForm";
import Report from "./components/Report";
import UserPage from "./pages/UserPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <DashboardPage />
            },
            {
                path: '/accounts',
                element: <AccountPage />
            },
            {
                path: '/partners',
                element: <PartnerPage />
            },
            { 
                path: "/receipt",
                element: <ReceiptVoucher />
            },
            { 
                path: "/payment",
                element: <PaymentVoucher />
            },
            { 
                path: "/othervoucher",
                element: <OtherVoucher />
            },
            {
                path: "/currencies",
                element: <CurrenciesForm />
            },
            {
                path: '/vouchers',
                element: <Voucher />
            },
            {
                path: '/reports',
                element: <Report />
            },
            {
                path: '/partnergroups',
                element: <PartnerGroupPage />
            },
            {
                path: '/users',
                element: <UserPage />
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