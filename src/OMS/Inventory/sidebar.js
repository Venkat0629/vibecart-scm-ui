import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Styling/sidebar.css'; 

const Sidebar = () => {
    const navigate = useNavigate();
    const [showInventoryLinks, setShowInventoryLinks] = useState(false);
    const [showOrderLinks, setShowOrderLinks] = useState(false);
    console.log(showInventoryLinks);
    console.log(showOrderLinks);
    
    
    const toggleInventoryLinks = () => {
        setShowInventoryLinks((prev)=>!prev);
        console.log('inventorytoggle');
        
    };

    const toggleOrderLinks = () => {
        setShowOrderLinks(!showOrderLinks);
        console.log("ordertoggle");
        
    };

    const navigateTo =(path)=> {
        navigate(path);
    }

    return (
        <div className="sidebar d-flex flex-column">
            <button className="sidebar-btn" onClick={() => navigate('/dashboard')}>
                Dashboard
            </button>
            <div className="mb-2">
                <button className="sidebar-btn" onClick={toggleInventoryLinks}>
                    Inventory   {showInventoryLinks ? <FaMinus /> : <FaPlus />}
                </button>
                {showInventoryLinks && (
                    <div className="d-flex flex-column ml-3">
                        <button className="sidebar-btn" onClick={() => navigateTo('/inventoryConsole')}>
                            Inventory Console
                        </button>
                        <button className="sidebar-btn" onClick={() => navigateTo('/adjustInventory')}>
                            Adjust Inventory
                        </button>
                        <button className="sidebar-btn" onClick={() => navigateTo('/inventoryLocation')}>
                            Inventory Location
                        </button>
                    </div>
                )}
            </div>
            <div className="mb-2">
                <button className="sidebar-btn" onClick={toggleOrderLinks}>
                    Orders   {showOrderLinks ? <FaMinus /> : <FaPlus />}
                </button>
                {showOrderLinks && (
                    <div>
                        <button className="sidebar-btn" onClick={() => navigate('/orderConsole')}>
                            Order Console
                        </button>
                        <button className="sidebar-btn" onClick={() => navigate('/updateOrder')}>
                            Update Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
