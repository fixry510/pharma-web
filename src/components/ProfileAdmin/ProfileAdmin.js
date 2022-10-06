import React, { useState } from 'react'

import { CgProfile } from "react-icons/cg";

const ProfileAdmin = () => {

    const [img, setImg] = useState();

    const onSelectImage = (e) => {
        if (!e.target.files || e.target.files.length == 0) {
            return;
        }
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    }


    return (
        <div className='w-full flex flex-col items-center p-5'>
            <div className='w-full sm:w-8/12  md:w-6/12 h-12 border-2 flex justify-start items-center pl-5 bg-gray-50'>
                <h1>Profile Admin</h1>
            </div>
            <div className='h-[70vh] w-full  sm:w-8/12  md:w-6/12 mt-5 border-2 flex flex-col items-center p-5'>
                <label for="file-upload" className='cursor-pointer'>
                    {img ? <img src={img} alt='' className='w-[150px] h-[150px] rounded-[99rem]  object-cover' /> : <p className='text-[150px]'>
                        <CgProfile />
                    </p>}
                    <input className='hidden' id="file-upload" type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange={onSelectImage} />
                </label>

                <div className='flex  w-full mt-10'>
                    <div className='flex flex-col w-6/12 mr-4'>
                        <p className='text-sm text-gray-400 mb-1'>First Name</p>
                        <input className='bg-gray-100 rounded border outline-none p-[5px] text-sm' />
                    </div>
                    <div className='flex flex-col w-6/12'>
                        <p className='text-sm text-gray-400 mb-1'>Last Name</p>
                        <input className='bg-gray-100 rounded border outline-none p-[5px] text-sm' />
                    </div>
                </div>
                <div className='flex  w-full mt-3'>
                    <div className='flex flex-col w-6/12 mr-4'>
                        <p className='text-sm text-gray-400 mb-1'>Email</p>
                        <input className='bg-gray-100 rounded border outline-none p-[5px] text-sm' />
                    </div>
                    <div className='flex flex-col w-6/12'>
                        <p className='text-sm text-gray-400 mb-1'>Phone</p>
                        <input className='bg-gray-100 rounded border outline-none p-[5px] text-sm' />
                    </div>
                </div>
                <div className='mt-3 w-full'>
                    <p className='text-sm text-gray-400 mb-1'>Address</p>
                    <textarea name="Text1" rows="5" className='bg-gray-100 rounded border outline-none p-[5px] text-sm w-full ' />
                </div>
                <button className='w-[80%]  sm:w-[35%] min-w-[150px] text-gray-700 bg-[#FCD683]  py-1 px-4 mt-5 border border-black rounded'>
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default ProfileAdmin