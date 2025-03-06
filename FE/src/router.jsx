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
import VoucherManagementForm from "./components/VoucherManagementForm";
import AccountDetailReport from "./components/AccountDetailReport";
import TrialBalanceReport from "./components/TrialBalanceReport";
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
                element: <VoucherManagementForm />
            },
            {
                path: '/accountdetailreports',
                element: <AccountDetailReport />
            },
            {
                path: '/balancereports',
                element: <TrialBalanceReport />
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