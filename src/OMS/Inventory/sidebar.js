import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaMinus , FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Styling/sidebar.css'; 

const Sidebar = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(true);
    const [showInventoryLinks, setShowInventoryLinks] = useState(false);
    const [showOrderLinks, setShowOrderLinks] = useState(false);
    console.log(showInventoryLinks);
    console.log(showOrderLinks);
    
    const toggleSidebar=()=>{
        setShowSidebar(prev => !prev);
    }
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
        <div>
            <button className='btn btn-outline-secondary d-lg-none mb-2' onClick={toggleSidebar}>
                <FaBars /> Menu
            </button>
        {showSidebar &&(
            <div className="sidebar d-flex flex-column p-2">
            <button className="btn btn-outline-secondary sidebar-btn" onClick={() => navigate('/dashboard')}>
                Dashboard
            </button>
            <div className="mb-2">
                <button className="btn btn-outline-secondary sidebar-btn d-flex justify-content-between align-items-center" onClick={toggleInventoryLinks}>
                    <span>Inventory</span> {showInventoryLinks ? <FaMinus /> : <FaPlus />}
                </button>
                {showInventoryLinks && (
                    <div className="ml-3">
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
                    <div className='ml-3'>
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
        )}    
        
        </div>
    );
};

export default Sidebar;
