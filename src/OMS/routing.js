import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Inventory/Omsdashboard";  
import InventoryConsole from "./Inventory/InventoryConsole";  
import AdjustInventory from "./Inventory/AdjustInventory";  
import InventoryLocation from "./Inventory/InventoryLocation"; 
import Login from "./AdminLogin/Login";
import OrderConsole from "./Orders/OrderConsole";
import UpdateOrder from "./Orders/UpdateOrder";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventoryConsole" element={<InventoryConsole />} />
            <Route path="/adjustInventory" element={<AdjustInventory />} />
            <Route path="/inventoryLocation" element={<InventoryLocation />} />
            <Route path="/orderConsole" element={<OrderConsole />} />
            <Route path="/updateOrder" element={<UpdateOrder />} />
        </Routes>
    );
}

export default Routing;
