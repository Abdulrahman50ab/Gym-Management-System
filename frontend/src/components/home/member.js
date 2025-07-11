import React, { useState, useEffect, use } from "react";
import Sidebar from "./sidebar";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Modal from './modal'
import MemberCard from "./membercard";
import Addmembership from "./addmembership";
import Addmember from "./addmember";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Member = () => {


    const [Search, setSearch] = useState("");
    const [addmembership, setaddmembership] = useState(false);
    const [addmember, setaddmember] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);
    const [data, setdata] = useState([]);
    const [startform, setstartform] = useState(0);
    const [endto, setendto] = useState(9);
    const [totaldata, settotaldata] = useState(0);
    const [limit, setlimit] = useState(9);
    const [skip, setskip] = useState(0)
    const [noofpage, setnoofpage] = useState(0);
    const [issearchmodeon, setissearchmodeon] = useState(false);

    useEffect(() => {
        fetchdata(0, 9);
    }, [])

    const fetchdata = async (skip, limits) => {

        await axios.get(`http://localhost:4000/members/all-member?skip=${skip}&limit=${limits}`, { withCredentials: true }).then((response) => {
            let totaldata = response.data.totalMembers;
            settotaldata(totaldata);
            setdata(response.data.members)

            let extraPage = totaldata % limit === 0 ? 0 : 1;
            let totalpage = parseInt(totaldata / limit) + extraPage;
            setnoofpage(totalpage);

            if (totaldata === 0) {
                setstartform(-1);
                setendto(0);
            } else if (totaldata < 10) {
                setstartform(0);
                setendto(totaldata);
            }
        }).catch(err => {
            toast.error("Some technical Error")
        })

    }

    const handleMembership = () => {
        setaddmembership(prev => !prev);
    }
    const handleMembers = () => {
        setaddmember(prev => !prev);
    }

    const handlePrev = () => {
        if (currentPage !== 1) {
            let currpage = currentPage - 1;
            setcurrentPage(currpage);
            var from = (currpage - 1) * 9;
            var to = (currpage * 9);
            setstartform(from);
            setendto(to);

            let skipval = skip - 9
            setskip(skipval);
            fetchdata(skipval, 9)

        }
    }
    const handleNext = () => {
        if (currentPage !== noofpage) {
            let currpage = currentPage + 1;
            setcurrentPage(currpage);
            var from = (currpage - 1) * 9;
            var to = (currpage * 9);
            if (to > totaldata) {
                to = totaldata;
            }
            setstartform(from);
            setendto(to);

            let skipval = skip + 9
            setskip(skipval);
            fetchdata(skipval, 9)
        }
    }

    const handlesearchdata = async () => {
        if (Search !== "") {
            setissearchmodeon(true);
            await axios.get(`http://localhost:4000/members/searched-member?searchTerm=${Search}`, { withCredentials: true }).then((response) => {
            setdata(response.data.members);
            settotaldata(response.data.totalMembers)
            }).catch(err=>{
                toast.error("Some Technical Error")
            })
        }else{
            if(issearchmodeon){
                window.location.reload();
            }else{
                toast.error("please Enter any value")
            }
        }
    }


    return (
        <div className="flex">
            <Sidebar />
            <div className="text=black p-5 w-3/4 h-[100vh]">
                {/* block for banner */}
                <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
                    <div className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black" onClick={() => handleMembers()}>Add Member <FitnessCenterIcon /></div>
                    <div className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black" onClick={() => handleMembership()}>Add MemberShip <AddIcon /></div>
                </div>
                {/* block for back to DashBoard */}
                <Link to={'/dashboard'}><ArrowBackIcon />Back to DashBoard</Link>

                <div className="mt-5 w-1/2 flex gap-2">
                    <div className="border-2 w-full border-green-500  p-2 rounded-lg">
                        <input value={Search} onChange={(e) => { setSearch(e.target.value) }} type="text" className="w-full" placeholder="Search By Name and Mobile No " /></div>
                    <div onClick={() => { handlesearchdata() }} className=" bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"> <SearchIcon /></div>
                </div>

                <div className="mt-5 flex justify-between text-white">
                    <div>Total Members {issearchmodeon?totaldata:null}</div>
                    {
                        !issearchmodeon?<div className="flex gap-5">
                        <div>{startform + 1} - {endto} of {totaldata} Members</div>
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-green hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : null}`} onClick={() => { handlePrev() }}><ChevronLeftIcon /> </div>
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-green hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === noofpage ? 'bg-gray-200 text-gray-400' : null}`} onClick={() => { handleNext() }}><ChevronRightIcon /> </div>
                    </div> : null
                    }
                </div>

                <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]">
                    {
                        data.map((item, index) => {
                            return (
                                <MemberCard item={item} />
                            );
                        })
                    }
                </div>

                {addmembership && <Modal header="Add MemberShip" handleClose={handleMembership} content={<Addmembership />} />}
                {addmember && <Modal header={"Add New Member"} handleClose={handleMembers} content={<Addmember />} />}
            </div>


            <ToastContainer />
        </div>
    )
}
export default Member