// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../ReduxToolkit/AuthSlice'; 
// import './login.css';

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user');
//   const [errors, setErrors] = useState({ email: '', password: '' });
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const validateForm = () => {
//     const newErrors = { email: '', password: '' };
//     let isValid = true;

//     if (!email) {
//       newErrors.email = 'Email ID is required';
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Email ID is invalid';
//       isValid = false;
//     }

//     if (!password) {
//       newErrors.password = 'Password is required';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log({ email, password, role });

      
//       const token = 'sample-token'; 
//       localStorage.setItem('token', token); 
//       localStorage.setItem('email', email); 
//       dispatch(login());
//       onLogin();
//       navigate('/dashboard');
//     }
//   };

//   const handleKeyDown = (e, nextInputId) => {
//     if (e.key === ' ') {
//       e.preventDefault();
//       const nextInput = document.getElementById(nextInputId);
//       if (nextInput) {
//         nextInput.focus();
//       }
//     }
//   };

//   return (
//     <div className="login-container d-flex justify-content-center align-items-center ">
      
//       <div className="login-card border rounded p-4">
//         <h2 className="text-center mb-4 login-title">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3 form-group">
//             <label htmlFor="email" className="form-label">Email ID</label>
//             <input
//               type="email"
//               className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//               id="email"
//               value={email}
//               placeholder='Enter an Email'
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyDown={(e) => handleKeyDown(e, 'password')}
//             />
//             {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//           </div>

//           <div className="mb-3 form-group">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//               id="password"
//               value={password}
//               placeholder='Enter Password'
//               onChange={(e) => setPassword(e.target.value)}
//               onKeyDown={(e) => handleKeyDown(e, 'role')}
//             />
//             {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//           </div>

//           {/* <div className="mb-3 form-group">
//             <label htmlFor="role" className="form-label">User Role</label>
//             <select
//               id="role"
//               className="form-select"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               onKeyDown={(e) => handleKeyDown(e, 'submitButton')}
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div> */}
        
//           <button
//             type="submit"
//             id="submitButton"
//             className="login-button"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../ReduxToolkit/AuthSlice';
import './login.css'; // Ensure this file includes your custom styles

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'ADMIN',
  });
  console.log(formData)
  const [errors, setErrors] = useState({ email: '', password: '', auth: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Username is required';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '', auth: '' });
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:6601/api/v1/vibe-cart/accounts/validate', {
          email: formData.email,
          password: formData.password,
          role: formData.role
        });

        const token = response.data.message; 
        const { email } = formData;
        localStorage.setItem('token', token); 
        localStorage.setItem('email', email); 
        dispatch(login()); 
        navigate('/dashboard');
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          auth: 'Invalid email or password',
        }));
      }
    }
  };

  return (
    <div className="login-container">
      
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${errors.email ? 'error-highlight' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'error-highlight' : ''}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label">User Role</label>
            <select
              id="role"
              name="role"
              className="form-select"
              onChange={handleChange}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="MASTER">MASTER</option>
            </select>
          </div>
          <button type="submit" className="login-button">Login</button>
          {errors.auth && <div className="error-message">{errors.auth}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
