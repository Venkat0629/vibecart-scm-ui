import logo from './logo.svg';
import './App.css';
import './index.css'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { login, logout } from './OMS/ReduxToolkit/AuthSlice'; 
import Routing from "./OMS/routing";
// import LoginForm from './OMS/AdminLogin/admin_login';
// import Dashboard from './OMS/Inventory/oms_dashboard';
import Header from './OMS/Header/header';
import Footer from './OMS/Footer/footer';
import Sidebar from './OMS/Inventory/sidebar';
import Login from './OMS/AdminLogin/Login';
// import { login } from './OMS/ReduxToolkit/AuthSlice';

function App() {
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    const dispatch=useDispatch();

    const handleLogin=()=>{
        dispatch(login());
    }
    const handleLogout=()=>{
        dispatch(logout());
    }
    return (
        <Router>

        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
        <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />
        <div style={{overflow:"auto",flex:1, height:"100vh"}}>
          {isLoggedIn ? (
            <div className="row">                       
              <div className="col-2">
                <Sidebar />
              </div>
              <div className="col-10">
                <Routing />
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </div>
        <div style={{display:"flex",flex:"0 0 auto"}}>
        <Footer /> 
        </div>
    </div>
    </Router>

    );
}

export default App;
