import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../ReduxToolkit/AuthSlice'; 
import './login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email ID is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email ID is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ email, password, role });

      
      const token = 'sample-token'; 
      localStorage.setItem('token', token); 
      localStorage.setItem('username', email); 
      dispatch(login());
      onLogin();
      navigate('/dashboard');
    }
  };

  const handleKeyDown = (e, nextInputId) => {
    if (e.key === ' ') {
      e.preventDefault();
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center ">
      
      <div className="login-card border rounded p-4">
        <h2 className="text-center mb-4 login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 form-group">
            <label htmlFor="email" className="form-label">Email ID</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              value={email}
              placeholder='Enter an Email'
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'password')}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3 form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              value={password}
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'role')}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* <div className="mb-3 form-group">
            <label htmlFor="role" className="form-label">User Role</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'submitButton')}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
        
          <button
            type="submit"
            id="submitButton"
            className="login-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
