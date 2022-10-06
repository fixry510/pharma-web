import React from 'react'
import { CgMenu,CgProfile } from "react-icons/cg";
import { RiArticleLine } from "react-icons/ri";
import { AiTwotoneShop } from "react-icons/ai";
import DrawerItem from "./DrawerItem";

const Drawer = ({ isOpen, setIsOpen }) => {
    return (
        <div className={`
            bg-[#FCD683]  items-center h-screen flex  flex-col w-[245px] absolute
            transform duration-300  ${isOpen ? 'translate-x-[0]' : 'translate-x-[-100%]'}
            `}>
            <div className='bg-[#B6B4B4] justify-around items-center flex w-[100%] px-3 h-10 mb-1'>
                <p>Admin</p>
                <CgMenu onClick={() => setIsOpen((val) => !val)} size={22} className="hover:cursor-pointer" />
            </div>
            <DrawerItem  to="/home" title="Article" icon={<RiArticleLine  color='black' size={22} />} />
            <DrawerItem     to="/home/pharmacy-management" title="Pharmacy Management" icon={<AiTwotoneShop  color='black' size={22} />} />
            <DrawerItem     to="/home/profile-admin" title="Profile Admin" icon={<CgProfile  color='black' size={22} />} />
        </div>
    )
}

export default Drawer