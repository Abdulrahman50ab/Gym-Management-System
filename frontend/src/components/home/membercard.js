import React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from "react-router-dom";
const MemberCard =({item})=>{
    return(
        <Link to={`/member/${item?._id}`} className="bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black cursor-pointer">
                        <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full">
                            <img className="w-full h-full rounded-full" src={item?.profilepic} />
                            <CircleIcon className="absolute top-0 left-0" sx={{ color: item?.status ==="Active"?"greenyellow":"red" }} />
                        </div>

                        <div className="mx-auto mt-5 text-center font-semibold font-mono">
                            {item?.name}
                        </div>
                        <div className="mx-auto mt-2 ext-center font-mono ">
                            {"+92" + item?.mobileno}
                        </div>
                         <div className="mx-auto mt-2 text-center font-mono ">
                            Next Bill date :{item?.nextbilldate.slice(0,10)}
                        </div>
                    </Link>
    )
}

export default MemberCard