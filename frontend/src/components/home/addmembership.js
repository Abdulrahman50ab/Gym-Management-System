import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Addmembership = () => {

    const [inputfield, setinputfield] = useState({ months: "", price: "" })
    const [membership, setmembership] = useState([]);
    const handleonchange = (event, name) => {
        setinputfield({ ...inputfield, [name]: event.target.value });
    }

    const fetchMembership = async () => {
        await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true }).then((response) => {
            setmembership(response.data.membership)
            toast.success(response.data.membership.length + "  Membership Fetched");
        }).catch(err => {
            toast.error("Some Error to Add & Fetch Members")
        })
    }

    useEffect(() => {
        fetchMembership()
    }, [])

    const handleAddmembership =async()=>{
        await axios.post('http://localhost:4000/plans/add-membership',inputfield,{withCredentials: true}).then((response)=>{
        toast.success("Successfully Add Membership")
        }).catch(err => {
            toast.error("Some Error to Add & Fetch Members")
        })
    }

    return (
        <div className="text-black">
            <div className="flex flex-wrap gap-5 items-center justify-center">
                {membership.map((item, index) => {
                    return (
                        <div className="bg-slate-900 text-white border-2 pl2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:text-green hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                            <div>{item.months} Month MemberShip</div>
                            <div>Rs:{item.price}</div>
                        </div>
                    )
                })}

            </div>

            <hr className="mt-10 mb-10" />
            <div className="flex gap-10 mb-10">
                <div className=" border-2 rounded-lg w-1/3 h-1/2 p-2">
                    <input value={inputfield.months} onChange={(event) => { handleonchange(event, "months") }} className="w-full" type="number" placeholder="Add No.of Months" />
                </div>
                <div className=" border-2 rounded-lg w-1/3 h-1/2 p-2">
                    <input value={inputfield.price} onChange={(event) => { handleonchange(event, "price") }} className="w-full" type="number" placeholder="Price" />
                </div>
                <div className="border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 " onClick={()=>{handleAddmembership()}}>
                    Add +
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
export default Addmembership