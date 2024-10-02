import React, { useState, useEffect } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';

const Header = ({ onLogout, isLoggedIn, isLoginPage }) => {
    const [username, setUsername] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        
        const storedUsername = localStorage.getItem('email');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            setUsername(''); 
        }
    }, [isLoggedIn]); 

    const handleLogout = () => {
        localStorage.removeItem('email'); 
        localStorage.removeItem('token');
        onLogout();
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); 
    };

    return (
        <header className="header-container">
            <div className="header-title">
                <span className='bold'>VIBE</span><span>CART</span>
            </div>

            <div className={`header-subtitle ${isLoginPage ? 'login-subtitle' : ''}`}>
                <h5>Order Management System</h5>
            </div>

            <div className="header-actions">
                {isLoggedIn && (
                    <div
                        className="user-info"
                        onClick={toggleDropdown} 
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <FaRegUserCircle className="user-icon" size={30} color='#dd1e25'/>
                        <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                            <div className="dropdown-header">Account Details</div>
                            <a href="#" className="dropdown-item">{username || 'User'}</a> 
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
