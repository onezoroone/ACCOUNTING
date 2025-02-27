import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function DefaultLayout() {
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