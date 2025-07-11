import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
const Modal = ({handleClose , content,header}) => {
    return (
        <div className=' w-full h-[100vh] fixed bg-black bg-opacity-50 top-0 left-0 flex justify-center'>
            <div className='w-1/2 bg-white rounded-lg h-fit  p-2'>
                <div className='flex justify-between '>
                      <div className='text-3xl font-semibold text-custom'>{header}</div>
                      <div className='cursor-pointer' onClick={()=>handleClose()} ><ClearIcon sx={{fontSize:"40px", color:" hsl(11, 72%, 55%)"}}/></div>
                </div>
                <div className='mt-2'>
                   {content}
                </div>
            </div>
        </div>
    );
};

export default Modal;
