// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Reuse same CSS
import Modal from './modal'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './forgotPassword';
const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loginfield, setloginfield] = useState({ "username": "", "password": "" });
  const handleClose = () => {
    setForgotPassword(prev => !prev);
  }

  const navigate = useNavigate(); 

  const handlelogin = async () => {
    await axios.post('http://localhost:4000/auth/login', loginfield, { withCredentials: true }).then((response) => {
      console.log(response.data);
      localStorage.setItem('gymname',response.data.gym.gymname);
      localStorage.setItem('gymPic', response.data.gym.profilepic);
      localStorage.setItem('islogin', true);
      localStorage.setItem('token', response.data.token);

      navigate('/dashboard')

    }).catch(err => {
      const errorMessage = err.response.data.error
      toast.error(errorMessage)
    })

  }

  const handleonchange = (event, name) => {
    setloginfield({ ...loginfield, [name]: event.target.value });
  }
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Login</h2>
        <form className="register-form">


          <input value={loginfield.username} onChange={(event) => { handleonchange(event, "username") }} type="text" placeholder="User-Name" required />
          <input value={loginfield.password} onChange={(event) => { handleonchange(event, "password") }} type="password" placeholder="Password" required />

          {/* Forgot Password Link */}
          <div className="forgot-password hover:text-black cursor-pointer" onClick={() => handleClose()}>
            Forgot Password
          </div>
        
          <button type="submit" onClick={() => (handlelogin())}>Login</button>
       
        </form>

        <p className="login-text">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
      {forgotPassword && <Modal header="Forgot Password" handleClose={handleClose} content={<ForgotPassword />} />}
      <ToastContainer/>
    </div>

  );
};

export default Login;
