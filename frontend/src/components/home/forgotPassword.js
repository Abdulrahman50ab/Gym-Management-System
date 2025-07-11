import React, { useState } from "react";
import "./ForgotPassword.css"; // Link to custom CSS file
import Loader from "./loader";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [loader, setloader] = useState(false);
  const [contentVal, setContentVal] = useState("Submit Email");
  const [inputfield, setinputfield] = useState({ email: "", otp: "", newpassword: "" });
  
  
  const handleSubmit = () => {
    if (!emailSubmit) {
      sendotp();
    } else if (emailSubmit && !otpValidate) {
      verifyotp();
    } else {
      changepassword();
    }
  };

const changepassword = async ()=>{
  setloader(true);
   await axios.post('http://localhost:4000/auth/reset-password',{email:inputfield.email,newpassword:inputfield.newpassword}).then((response)=>{
   setloader(false);
   toast.success("Your Password Has been Changed")
   }).catch(err=>{
      toast.error("Some technical issue while sending Mail")
      setloader(false)
    })

}

 const sendotp = async()=>{
    setloader(true);
    await axios.post('http://localhost:4000/auth/reset-password/sentotp',{email:inputfield.email}).then((response)=>{
    setEmailSubmit(true);
    setContentVal("Submit OTP");
    toast.success(response.data.message)
    setloader(false)
    }).catch(err=>{
      toast.error("Some technical issue while sending Mail")
      setloader(false)
    })
 }

 const verifyotp = async()=>{
    setloader(true);
    await axios.post('http://localhost:4000/auth/reset-password/checkotp',{email:inputfield.email,otp:inputfield.otp}).then((response)=>{
    setOtpValidate(true);
    setContentVal("Submit New Password");
    toast.success(response.data.message);
    setloader(false)
    }).catch(err=>{
      toast.error("Some technical issue while sending Mail")
      setloader(false)
    })
 }


  const handleonchange = (event, name) => {
    setinputfield({ ...inputfield, [name]: event.target.value });
  }
  console.log(inputfield);

  return (
    <div className="forgot-password-container">
      <div className="input-group">
        <label>Email Address</label>
        <input type="email" value={inputfield.email} onChange={(event) => { handleonchange(event, "email") }} placeholder="Enter your email" />
      </div>

      {emailSubmit && (
        <div className="input-group">
          <label>OTP</label>
          <input type="text" value={inputfield.otp} onChange={(event) => { handleonchange(event, "otp") }} placeholder="Enter OTP" />
        </div>
      )}

      {otpValidate && (
        <div className="input-group">
          <label>New Password</label>
          <input type="password" value={inputfield.newpassword} onChange={(event) => { handleonchange(event, "newpassword") }} placeholder="Enter new password" />
        </div>
      )}

      <button className="submit-btn" onClick={handleSubmit}>
        {contentVal}
      </button>
      {loader && <Loader />}
      <ToastContainer/>
    </div>
  );
};

export default ForgotPassword;
