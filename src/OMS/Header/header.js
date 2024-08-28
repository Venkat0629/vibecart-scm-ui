import React from 'react';
import { FaUser,FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import './header.css'; 

const Header = ({ onLogout, isLoggedIn }) => {
    return (
        <header className="header-container d-flex justify-content-between align-items-center p-3 shadow">
            <div className="header-title">
                VibeCart
            </div>

            <div className="header-subtitle">
                Order Management System
            </div>

            <div className="d-flex align-items-center header-icons">
                <div className="user-info d-flex flex-column align-items-center">
                    <FaUser className="user-icon" />
                    <span className="user-name">John Doe</span> 
                </div>
                <div>
                {isLoggedIn && (
                    <button onClick={onLogout}className="logout-button">
                    <FaSignOutAlt className="logout-icon" /><span className='logout-btn'>Logout</span>
                    </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
