import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';

const Header = ({ onLogout, isLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        onLogout();
    };

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    return (
        <header className="header-container ">
            <div className="header-title ">
                <span className='bold'>VIBE</span><span>CART</span>
            </div>

            <div className="header-subtitle justify-content-center ">
                <h5> Order Management System</h5>
            </div>

            <div className="header-actions">
                {isLoggedIn && (
                    <div
                        className="user-info "
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <FaUser className="user-icon red-outline" size={24} />
                        <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                            <a href="#" className="dropdown-item">{username}</a>
                            <a href="#" className="dropdown-item">Settings</a>
                            <a href="#" className="dropdown-item" onClick={handleLogout}>Sign out</a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
