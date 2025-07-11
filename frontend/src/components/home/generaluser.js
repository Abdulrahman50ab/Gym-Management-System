import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import MemberCard from "./membercard";
import { getMonthlyJoined, threeDayExpire,fourToSevenDaysExpire,expired ,inActiveMembers } from "./data";
const GeneralUser = () => {

    const [header, setheader] = useState("");
    const [data, setdata] = useState([]);
    useEffect(() => {
        const func = sessionStorage.getItem('func');
        functioncall(func);
    }, [])

    const functioncall = async (func) => {
        switch (func) {
            case "monthyjoined":

                setheader("Monthly Joined Members");
                var datas = await getMonthlyJoined();
                setdata(datas.members);
                break;

            case "threedayexpire":

                setheader("Expire in 3 Days Members");
                var datas = await threeDayExpire()
                setdata(datas.members);
                break;

            case "fourtosevendayexpire":

                setheader("Expire in 4-7 Days Members");
                 var datas = await fourToSevenDaysExpire();
                setdata(datas.members);
                break;

            case "expired":

                setheader("Expired Members");
                 var datas = await expired();
                setdata(datas.members);
                break;

            case "inactivemember":

                setheader("Inactive Members");
                 var datas = await inActiveMembers();
                setdata(datas.members);
                break;

        }
    }

    return (
        <div className="flex">
            <Sidebar />

            <div className="text-black p-5 w-3/4 flex-col" >
                <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
                    <Link to={'/dashboard'} className="border-2 pl-3 pr-3 pt-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" >
                        <ArrowBackIcon /> Back to DashBoard
                    </Link>
                </div>

                <div className="mt-5 text-xl text-white">
                    {header}
                </div>

                <div className="bg-slate-100 p-5 mt-5 rounded grid grid-cols-1 gap-2 md:grid-cols-3 overflow-x-auto h-[80%]">
                    {
                        data.map((item, index) => {
                            return (
                                <MemberCard item={item} />
                            )
                        })
                    }
                </div>


            </div>











        </div>
    )
}
export default GeneralUser