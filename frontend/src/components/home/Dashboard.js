import React,{useState,useEffect,useRef} from "react";
import Sidebar from "./sidebar";
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import { Link } from "react-router-dom";
const DashBoard = () => {
const [accordianDashboard, setAccordianDashboard] = useState(false);
const ref = useRef();
  useEffect(()=>{
 const checkclick = e =>{
    if(accordianDashboard && ref.current && !ref.current.contains(e.target)){
        setAccordianDashboard(false);
    }
 }
 document.addEventListener("mousedown",checkclick)
 return ()=>{
    document.removeEventListener("mousedown",checkclick)
 }
},[accordianDashboard])

  const handleOnClickMenu = (value)=>{
    sessionStorage.setItem('func',value);
  }

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-3/4 text-white p-5 relative">
                <div className="w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between item-center">
                    <MenuIcon  sx={{ cursor: "pointer" }} onClick={() => { setAccordianDashboard(prev => !prev) }} />
                    <img className="w-8 h-8 rounded-3xl border-2" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkh_17VANBBEZTEcSrCqEgvZp_49TRYW8bGUdUZtQSxCPe3cQVl_1EOrg&s" />
                </div>

            {
        accordianDashboard && <div ref={ref} className=' absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight'>
          <div>Hi Welcome to our Gym Management System.</div>
          <p>Feel free to ask any querries</p>
        </div>
       }

                <div className="'mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]">


                    <Link to={'/member'} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                        <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        </div>
                        <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                            <PeopleIcon sx={{ color: "green", fontSize: "50px" }} />
                            <p className="text-xl text-black font-semibold hover:text-white">Joined Members</p>
                        </div>
                    </Link>

                     <Link to={'/specific/monthly'} onClick={()=>handleOnClickMenu("monthyjoined")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                        <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        </div>
                        <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                            <CalendarMonthIcon sx={{ color: "purple", fontSize: "50px" }} />
                            <p className="text-xl text-black font-semibold hover:text-white ">Monthly Joined</p>
                        </div>
                    </Link>

                     <Link to={'/specific/expire-with-in-3-days'} onClick={()=>handleOnClickMenu("threedayexpire")}  className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                        <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        </div>
                        <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                            <AlarmOnIcon sx={{ color: "blue", fontSize: "50px" }} />
                            <p className="text-xl text-black font-semibold hover:text-white">Expiring Within 3 Days</p>
                        </div>
                    </Link>

                     <Link to={'/specific/expire-with-in4-7-days'} onClick={()=>handleOnClickMenu("fourtosevendayexpire")}  className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                        <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        </div>
                        <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                            <AlarmOnIcon sx={{ color: "red", fontSize: "50px" }} />
                            <p className="text-xl text-black font-semibold hover:text-white">Expiring Within 4-7 Days </p>
                        </div>
                    </Link>

                     <Link to={'/specific/expired'} onClick={()=>handleOnClickMenu("expired")}  className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                        <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        </div>
                        <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                            <ErrorIcon sx={{ color: "red", fontSize: "50px" }} />
                            <p className="text-xl text-black font-semibold hover:text-white">Expired</p>
                        </div>
                    </Link>

                     <Link to={'/specific/inactive-members'} onClick={()=>handleOnClickMenu("inactivemember")}  className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                        <div className="h-3 rounded-t-lg bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">
                        </div>
                        <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                            <ReportIcon sx={{ color: "gray", fontSize: "50px" }} />
                            <p className="text-xl text-black font-semibold hover:text-white">InActive Members</p>
                        </div>
                    </Link>
                </div>
      <div className='md:bottom-4 p-4 w-3/4 mb-4 md:mb-0 absolute bg-black text-white mt-2 rounded-xl text-xl'>
        Contact Developer for any Technical Error at abdulrahman50ab@gmail.com
      </div>

            </div>
        </div>
    )
}

export default DashBoard