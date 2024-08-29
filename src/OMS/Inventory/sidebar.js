import React, { useState } from 'react';
import { FaPlus, FaMinus, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Styling/sidebar.css'; 

const Sidebar = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [showInventoryLinks, setShowInventoryLinks] = useState(false);
    const [showOrderLinks, setShowOrderLinks] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev);
    };

    const toggleInventoryLinks = () => {
        setShowInventoryLinks(prev => !prev);
    };

    const toggleOrderLinks = () => {
        setShowOrderLinks(prev => !prev);
    };

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div>
            <button className='btn btn-outline-secondary d-lg-none mb-2' onClick={toggleSidebar}>
                <FaBars /> Menu
            </button>
            <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
                <button className="btn btn-outline-secondary sidebar-btn" onClick={() => navigate('/dashboard')}>
                    Dashboard
                </button>
                <div className="mb-2">
                    <button className="btn btn-outline-secondary sidebar-btn d-flex justify-content-between align-items-center" onClick={toggleInventoryLinks}>
                        <span>Inventory</span> {showInventoryLinks ? <FaMinus /> : <FaPlus />}
                    </button>
                    {showInventoryLinks && (
                        <div className="sub-menu">
                            <button className="btn btn-outline-secondary sidebar-btn" onClick={() => navigateTo('/inventoryConsole')}>
                                Inventory Console
                            </button>
                            <button className="btn btn-outline-secondary sidebar-btn" onClick={() => navigateTo('/adjustInventory')}>
                                Adjust Inventory
                            </button>
                            <button className="btn btn-outline-secondary sidebar-btn" onClick={() => navigateTo('/inventoryLocation')}>
                                Inventory Location
                            </button>
                        </div>
                    )}
                </div>
                <div className="mb-2">
                    <button className="btn btn-outline-secondary sidebar-btn d-flex justify-content-between align-items-center" onClick={toggleOrderLinks}>
                        <span>Orders</span> {showOrderLinks ? <FaMinus /> : <FaPlus />}
                    </button>
                    {showOrderLinks && (
                        <div className='sub-menu'>
                            <button className="btn btn-outline-secondary sidebar-btn" onClick={() => navigate('/orderConsole')}>
                                Order Console
                            </button>
                            <button className="btn btn-outline-secondary sidebar-btn" onClick={() => navigate('/updateOrder')}>
                                Update Order
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
