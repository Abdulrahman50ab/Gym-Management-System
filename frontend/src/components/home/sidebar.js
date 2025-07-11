import React, { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation ,useNavigate} from "react-router-dom";
const Sidebar = () => {

    const [greeting, setgreeting] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const greetingmessge = () => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setgreeting("Good Morning");
        } else if (currentHour < 18) {
            setgreeting("Good AfterNoon");
        } else if (currentHour < 21) {
            setgreeting("Good Evening");
        } else {
            setgreeting("Good Night");
        }
    }
    useEffect(() => {
        greetingmessge()
    }, [])

    const handellogout= async()=>{
         localStorage.clear();
         navigate('/');
    }
    return (
        <div className="w-1/4 h-[100vh] border-2 bg-black text-white p-5">
            <div className=" text-center  text-3xl font-bold border-b rounded-full">
                {localStorage.getItem('gymname')}
            </div>
            <div className="flex gap-5 my-2">
                <div className=" w-[80px] h-[80px] rounded-lg mt-5">
                    <img alt="" className="w-full h-full rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkh_17VANBBEZTEcSrCqEgvZp_49TRYW8bGUdUZtQSxCPe3cQVl_1EOrg&s" />
                </div>
                <div className="mt-7">
                    <div className="text-2xl">{greeting}</div>
                    <div className="text-xl mt-1 font-semibold">Admin</div>
                </div>
            </div>

            <div className="mt-10 py-8  border-t-4">
                <Link to={'/dashboard'} className={`flex gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${location.pathname==="/dashboard" ?'border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500':null}`}>
                    <div><HomeIcon /></div>
                    <div>DashBoard</div>
                </Link>

                <Link to={'/member'} className={`flex gap-8 mt-5  font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${location.pathname==="/member" ?'border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500':null}`}>  
                    <div><PeopleIcon /></div>
                    <div>Members</div>
                </Link>

                <div onClick={()=>{handellogout()}} className={`flex gap-8 mt-5 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black`}>
                    <div><LogoutIcon /></div>
                    <div>Log Out</div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar