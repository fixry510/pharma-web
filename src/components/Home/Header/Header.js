import React, { useState } from 'react'
import { CgMenu, CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAuth } from '../../../Context/AuthProvider';
import Drawer from './Drawer';
import {NavLink} from 'react-router-dom';


const Header = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const { onLogout } = useAuth();

    return (
        <header className='w-full h-10 bg-[#82AFB6] flex  justify-between items-stretch fixed left-0 top-0 z-30'>
            <Drawer isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} />
            <div className='w-12 flex justify-center items-center ml-5 hover:cursor-pointer' onClick={() => setIsOpenDrawer((val) => !val)}>
                <CgMenu size={22} />
            </div>
            <div className='flex self-center  items-center justify-around hover:cursor-pointer  w-[40%] mr-[3%] sm:min-w-[250px] sm:w-[13%] sm:mr-[4rem]  '>
                <NavLink to={"/home/profile-admin"} className='flex self-center'>
                    <CgProfile size={22} color="#CCCCCC" />
                    <p className='text-[15px] ml-2  self-center'>Admin</p>
                </NavLink>
                <div className='w-[2.5px] rounded-full self-stretch bg-[#CCCCCC]' />
                <div className='flex self-center items-center hover:cursor-pointer' onClick={onLogout}>
                    <RiLogoutBoxRLine size={22} color="#CCCCCC" />
                    <p className='text-[15px] ml-2  self-center'>Logout</p>
                </div>
            </div>
        </header>
    )
}

export default Header