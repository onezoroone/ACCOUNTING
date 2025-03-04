import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useSessionStorage from "../hooks/useSessionStorage";
import { useEffect } from "react";

function DefaultLayout() {
    const [token, ] = useSessionStorage("token", "");

    useEffect(() => {
        if (!token) {
            window.location.href = "/login";
        }
    }, [token]);

    return ( 
        <div>
            <Navbar />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <Outlet />
                    </div>
                    
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;