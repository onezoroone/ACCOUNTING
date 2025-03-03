import { Link, useLocation } from "react-router-dom";
import "../assets/css/menu.css";
import { useState } from "react";
function Navbar() {
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    return (  
        <div className="horizontal-menu">
            <header className="header top-navbar col-lg-12 col-12 p-0">
                <div className="container">
                    <div className="text-center navbar-brand-wrapper d-flex align-items-center">
                        <Link className="navbar-brand brand-logo" href="/"><img src="/logo.png" alt="logo" /></Link>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <ul className="navbar-nav me-lg-4 w-100">
                            <li className="nav-item nav-search d-none d-lg-block">
                                <div className="input-group" style={{padding:'0 10px'}}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="search">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" style={{marginTop:'12px'}}>
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                            </svg>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Tìm kiếm ..." aria-label="search" aria-describedby="search" />
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav navbar-nav-right d-flex flex-row">
                            <li className="nav-item me-1 d-flex align-items-center">
                                <a className="nav-link count-indicator text-secondary d-flex align-items-center justify-content-center notification-dropdown" id="notificationDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text-fill" viewBox="0 0 16 16" style={{width:'24px', height:'48px'}}>
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
                                    </svg>
                                    <span className="count"></span>
                                </a>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <a className="nav-link count-indicator text-secondary d-flex align-items-center justify-content-center notification-dropdown" id="notificationDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16" style={{width:'24px', height:'44px'}}>
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
                                    </svg>
                                    <span className="count"></span>
                                </a>
                            </li>
                            <li className="nav-item nav-profile dropdown d-flex align-items-center">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="/face5.jpg" alt="profile" />
                                    <span className="nav-profile-name">Hello</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                    <a className="dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi text-secondary bi-gear-fill" viewBox="0 0 16 16">
                                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                        </svg>
                                        Cài đặt
                                    </a>
                                    <a className="dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi text-secondary bi-box-arrow-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                        </svg>
                                        Đăng xuất
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <nav className="bottom-navbar">
                <div className="container">
                    <ul className="nav page-navigation">
                        <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                            <Link className="nav-link d-flex align-items-center" to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-speedometer menu-icon" viewBox="0 0 16 16">
                                    <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                                    <path fillRule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
                                </svg>
                                <span className="menu-title">Dashboard</span>
                            </Link>
                        </li>
                        <li 
                            className="nav-item dropdown"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <a 
                                className="nav-link d-flex align-items-center dropdown-toggle"
                                role="button" 
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="menu-icon" viewBox="0 0 16 16">
                                    <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                                </svg>
                                <span className="menu-title">Chứng từ</span>
                            </a>
                            {showDropdown && (
                                <ul className="dropdown-menu show">
                                    <li className={`nav-item ${location.pathname === "/receipt" ? "active" : ""}`}>
                                    <Link className="nav-link d-flex align-items-center" to="/receipt">
                                        <span className="menu-title">Phiếu thu</span>
                                    </Link>
                                    </li>
                                    <li className={`nav-item ${location.pathname === "/payment" ? "active" : ""}`}>
                                    <Link className="nav-link d-flex align-items-center" to="/payment">
                                        <span className="menu-title">Phiếu chi</span>
                                    </Link>
                                    </li>
                                    <li className={`nav-item ${location.pathname === "/othervoucher" ? "active" : ""}`}>
                                    <Link className="nav-link d-flex align-items-center" to="/othervoucher">
                                        <span className="menu-title">Phiếu kế toán khác</span>
                                    </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className={`nav-item ${location.pathname === "/partnergroups" ? "active" : ""}`}>
                            <Link className="nav-link d-flex align-items-center" to="/partnergroups">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="menu-icon" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                </svg>
                                <span className="menu-title">Nhóm Đối tượng</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/partners" ? "active" : ""}`}>
                            <Link className="nav-link d-flex align-items-center" to="/partners">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="menu-icon" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                </svg>
                                <span className="menu-title">Đối tượng</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/accounts" ? "active" : ""}`}>
                            <Link className="nav-link d-flex align-items-center" to="/accounts">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="menu-icon" viewBox="0 0 16 16">
                                    <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
                                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z"/>
                                </svg>
                                <span className="menu-title">Tài khoản</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/currencies" ? "active" : ""}`}>
                            <Link className="nav-link d-flex align-items-center" to="/currencies">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="menu-icon" viewBox="0 0 16 16">
                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
                                </svg>
                                <span className="menu-title">Tiền Tệ</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/vouchers" ? "active" : ""}`}>
                            <Link className="nav-link d-flex align-items-center" to="/vouchers">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="menu-icon" viewBox="0 0 16 16">
                                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6.5L14 4.5zM10 1.5V4h3L10 1.5zM5 5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2.5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2.5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5z"/>
                                </svg>
                                <span className="menu-title">Quản lý chứng từ</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/reports" ? "active" : ""}`}>
                            <Link className="nav-link d-flex align-items-center" to="/reports">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="menu-icon" viewBox="0 0 16 16">
                                    <path d="M4 1.5A1.5 1.5 0 0 0 2.5 3V13A1.5 1.5 0 0 0 4 14.5H12A1.5 1.5 0 0 0 13.5 13V3A1.5 1.5 0 0 0 12 1.5H4zM4 0H12A3 3 0 0 1 15 3V13A3 3 0 0 1 12 16H4A3 3 0 0 1 1 13V3A3 3 0 0 1 4 0z"/>
                                    <path d="M9.5 9.5a.5.5 0 0 0-1 0V11a.5.5 0 0 0 1 0V9.5zM7 8.5a.5.5 0 0 1 .5-.5h1A.5.5 0 0 1 9 8.5v3a.5.5 0 0 1-.5.5h-1A.5.5 0 0 1 7 11.5v-3zM5 7a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-1 0V7.5A.5.5 0 0 1 5 7z"/>
                                </svg>
                                <span className="menu-title">Báo cáo</span>
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/users" ? "active" : ""}`}>
                            <Link className="nav-link d-flex align-items-center" to="/users">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="menu-icon" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                                <span className="menu-title">Người dùng</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;