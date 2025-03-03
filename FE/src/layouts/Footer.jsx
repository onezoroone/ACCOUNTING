import { Link } from "react-router-dom";
import "../assets/css/footer.css";

function Footer() {
    return (  
        <footer className="footer">
            <div className="d-lg-flex justify-content-between">
                <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2025 <Link href="/" target="_blank">VACOM</Link>. All rights reserved.</span>
                <span className="float-none float-sm-end d-block mt-1 mt-sm-0 text-center">Hand-crafted &amp; made with <span className="text-danger">VACOM</span></span>
            </div>
        </footer>
    );
}

export default Footer;