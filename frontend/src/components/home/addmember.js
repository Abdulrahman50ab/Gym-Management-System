import React, { use, useState, useEffect } from "react";
import axios from 'axios'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from "react-toastify";
const Addmember = () => {
    const[selectedoption,setselectedoption]= useState("")
    const [inputfield, setinputfield] = useState({ name: "", mobile: "", address: "", membership: "", profilepic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkh_17VANBBEZTEcSrCqEgvZp_49TRYW8bGUdUZtQSxCPe3cQVl_1EOrg&s", joiningdate: "" });
    const [loader, setloader] = useState(false);
    const [membershiplist, setmembershiplist] = useState([]);
    const handleonchange = (event, name) => {
        setinputfield({ ...inputfield, [name]: event.target.value });
    }
    console.log(inputfield);


    const uploadimage = async (event) => {
        setloader(true);
        console.log("Image Uploading")
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // dpztb66jm
        data.append('upload_preset', 'gym-management');

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dpztb66jm/image/upload", data);
            console.log(response);
            const imageurl = response.data.url;
            setloader(false);
            setinputfield({ ...inputfield, ['profilepic']: imageurl })
        } catch (err) {
            console.log(err)
            setloader(false);
        }
    }

    useEffect(() => {
        fetchMembership();
    }, [])

    const fetchMembership = async () => {
        await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true }).then((response)=> {
            setmembershiplist(response.data.membership);
            if (response.data.membership.length === 0) {
                return toast.error("No any membership added yet", {
                    className: "text-lg"
                })
            }else{
                   let a = response.data.membership[0]._id;
                   setselectedoption(a);
                   setinputfield({...inputfield,membership:a})
            }

        }).catch(err => {
            toast.error("Some Technical Error");
        })
    }

const handlechange = (event)=>{
    let value = event.target.value;
    setselectedoption(value);
     setinputfield({...inputfield,membership:value})
}

const handleregister = async ()=>{
    await axios.post('http://localhost:4000/members/register-member',inputfield,{withCredentials:true}).then((response)=>{
    toast.success("Registered Successfully")
    setTimeout(() => {
        window.location.reload();
    }, 2000);
    }).catch(err=>{
        toast.error("not register this member")
    })
}
    return (
        <div className="text-black">
            <div className="grid gap-5 grid-cols-2">

                <div className="border-2 w-[90%] pl-3 pt-2 pb-2 border-custom rounded-md h-12">
                    <input value={inputfield.name} onChange={(event) => { handleonchange(event, "name") }} type="text" placeholder="Name of the Member" />
                </div>
                <div className="border-2 w-[90%] pl-3 pt-2 pb-2 border-custom rounded-md h-12">
                    <input value={inputfield.mobileno} onChange={(event) => { handleonchange(event, "mobileno") }} type="text" placeholder="Enter Mobile No" />
                </div>
                <div className="border-2 w-[90%] pl-3 pt-2 pb-2 border-custom rounded-md h-12">
                    <input value={inputfield.address} onChange={(event) => { handleonchange(event, "address") }} type="text" placeholder="Enter Address" />
                </div>
                <div className="border-2 w-[90%] pl-3 pt-2 pb-2 border-custom rounded-md h-12">
                    <input value={inputfield.joindate} onChange={(event) => { handleonchange(event, "joiningdate") }} type="date" />
                </div>

                <select value={selectedoption} onChange={handlechange} className="border-2 border-custom w-[90%] h-12 pt-2 pb-2 rounded-md placeholder:text-gray">
                    {
                        membershiplist.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>{item.months} Months Membership</option>
                            )
                        })
                    }
                </select>

                <div className="border-2 w-[90%] pl-3 pt-2 pb-2 border-custom rounded-md h-12">
                    <input type="file" onChange={(e) => { uploadimage(e) }} className="w-full" />
                    {loader && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress color="secondary" />
                    </Stack>}
                </div>

                <div className="w-1/4">
                    <img src={inputfield.profilepic} className="w-full h-full rounded-full" />
                    {loader && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress color="secondary" />
                    </Stack>}
                </div>

                <div onClick={()=>{handleregister()}} className="p-3 border-2 mt-5 w-28 h-14 text-center mx-auto bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Register</div>

            </div>
            <ToastContainer />
        </div>
    )
}
export default Addmember