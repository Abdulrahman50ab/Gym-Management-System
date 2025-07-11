import React,{useState,useEffect} from "react";
import Home from "./components/home/home.js";
import { Routes, Route ,useNavigate} from 'react-router-dom';
import DashBoard from "./components/home/Dashboard.js";
import Register from "./components/home/Register.js";
import Login from "./components/home/Login.js";
import Member from "./components/home/member.js";
import GeneralUser from "./components/home/generaluser.js";
import MemberDetail from "./components/home/memberdetail.js";
import 'react-toastify/dist/ReactToastify.css';
function App() {
const navigate =useNavigate();
const [islogin,setislogin] = useState(false)

useEffect(()=>{
  let isloged = localStorage.getItem("islogin")
  if(isloged){
    setislogin(true);
    navigate('/dashboard')
  }else{
    setislogin(false);
    navigate('/');
  }
},[localStorage.getItem("islogin")])
  return (
    
    <div className="">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/member" element={<Member/>} />
        <Route path="/specific/:page" element={<GeneralUser/>} />
         <Route path="/member/:id" element={<MemberDetail/>} />
       </Routes>
    </div>
   
  );
}

export default App;
