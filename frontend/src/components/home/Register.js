import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [inputfield, setinputfield] = useState({ gymname: "", email: "", username: "", password: "" });

  const handleonchange=(event,name)=>{
  setinputfield({...inputfield,[name]:event.target.value});
  }
   
  const handleregister = async ()=>{
    await axios.post('http://localhost:4000/auth/register',inputfield).then((response)=>{
      const successMsg = response.data.message;
      toast.success(successMsg)
    }).catch(err => {
          const errorMessage = err.response.data.error
          toast.error(errorMessage)
        })
  }
    
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <form className="register-form" onSubmit={(e) => { e.preventDefault(); handleregister(); }}>
          <input type='email' value={inputfield.email} onChange={(event)=>{handleonchange(event,"email")}} placeholder="Email" required />
          <input type="text" value={inputfield.username}  onChange={(event)=>{handleonchange(event,"username")}} placeholder="Full Name" required />
          <input type="text" value={inputfield.gymname}  onChange={(event)=>{handleonchange(event,"gymname")}} placeholder="Gym Name" required />
          <input type="password" value={inputfield.password}  onChange={(event)=>{handleonchange(event,"password")}}placeholder="Password" required />
          <button type="submit" onClick={(e)=>{e.preventDefault();handleregister()}} >Register</button>
        </form>
        <p className="login-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
       <ToastContainer/>
    </div>
  );
};

export default Register;
