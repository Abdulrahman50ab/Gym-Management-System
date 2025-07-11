import React, { useState, useEffect, use } from "react";
import Sidebar from "./sidebar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import Switch from 'react-switch';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const MemberDetail = () => {
    const [status, setstatus] = useState("Pending");
    const [renew, setrenew] = useState(false);
    const [memship, setmemship] = useState([]);
    const [data, setdata] = useState(null);
    const { id } = useParams();
    const [planmember, setplanmember] = useState("");
    useEffect(() => {
        fetchdata();
        fetchmembership();
    }, [])

    const fetchmembership = async () => {
        axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true }).then((response) => {
            setmemship(response.data.membership);
            setplanmember(response.data.membership[0]._id);
        }).catch(err => {
            console.log(err)
            toast.error("Some error form fetch data")
        })
    }

    const fetchdata = async () => {
        await axios.get(`http://localhost:4000/members/get-member/${id}`, { withCredentials: true }).then((response) => {

            setdata(response.data.member)
            setstatus(response.data.member.status)
            toast.success("Fetch Data")
        }).catch(err => {
            toast.error("Some error form fetch data")
        })
    }
    const handleswitch = async () => {
        let statuss = status == "Active" ? "Pending" : "Active";
        await axios.post(`http://localhost:4000/members/change-status/${id}`, {status:statuss}, { withCredentials: true }).then((response) => {
            toast.success("Status Changed")
        }).catch(err => {
            console.log(err);
            toast.error("something is wrong")
        })
        setstatus(statuss);
    }

    const isDateInPast = (inputDate) => {
        const today = new Date(); // Get the current date
        const givenDate = new Date(inputDate); // Convert the input to a Date object
        return givenDate < today; // Check if the given date is before today
    };

    const handleonchangeselect = (event) => {
        let value = event.target.value;
        setplanmember(value);
    }

    const handlerenewbtn = async ()=>{
        await axios.put(`http://localhost:4000/members/update-member-plan/${id}`, { membership: planmember},{withCredentials:true}).then((response)=>{
         setdata(response.data.member);
         toast.success(response.data.message);
        }).catch(err => {
            console.log(err);
            toast.error("something is wrong")
        })
    }

    const navigate = useNavigate();
    return (
        <div className="flex">
            <Sidebar />

            <div className="w-3/4 text-white p-5">
                <div onClick={() => { navigate(-1) }} className="border-2 w-fit text-xl text-white p-2 rounded-xl bg-slate-900 cursor-pointer">
                    <ArrowBackIcon />Go Back
                </div>

                <div className="mt-10 p-2">
                    <div className="w-[100%] h-fit flex">
                        <div className="w-1/3 mx-auto">
                            <img src={data?.profilepic} className="w-full mx-auto rounded-xl" />
                        </div>
                        <div className="w-2/3 mt-5 text-xl p-5">
                            <div className="mt-1 mb-2 text-2xl font-semibold">Name: {data?.name}</div>
                            <div className="mt-1 mb-2 text-2xl font-semibold">Mobile:{data?.mobileno}</div>
                            <div className="mt-1 mb-2 text-2xl font-semibold">Address:{data?.address}</div>
                            <div className="mt-1 mb-2 text-2xl font-semibold">Joined Date: {data?.createdAt.slice(0, 10)}</div>
                            <div className="mt-1 mb-2 text-2xl font-semibold">Next Bill Date:{data?.nextbilldate.slice(0, 10)}</div>
                            <div className="mt-1 mb-2 flex gap-4 text-2xl font-semibold">Status: <Switch onColor="#6366f1" checked={status === "Active"} onChange={() => { handleswitch() }} /></div>
                            {isDateInPast(data?.nextbilldate) && <div onClick={() => { setrenew(prev => !prev) }} className={`mt-1 rounded-lg p-3 bg-black border-2 ${renew && status === "Active" ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white' : null} border-slate-900 text-center w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}>Renew</div>}

                            {
                                renew && status === "Active" ? (<div className="rounded-lg p-2 mt-5 mb-5 h-fit bg-custom w-[100%]">
                                    <div className="my-5 text-black">MemberShip</div>
                                    <select value={planmember} onChange={handleonchangeselect} className="w-full text-black border-2 p-2 rounded-lg">
                                        {memship.map((item, index) => {
                                            return (
                                                <option value={item._id}>{item.months} Months Membership</option>
                                            )
                                        })}
                                    </select>
                                    <div className={`mt-3 rounded-lg p-3 bg-black border-2 border-slate-900 text-center w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`} onClick={()=>{handlerenewbtn()}}>Save</div>
                                </div>) : null
                            }
                        </div>
                    </div>


                </div>
            </div>


            <ToastContainer />

        </div>
    )
}
export default MemberDetail