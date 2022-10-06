import React from 'react'
import { NavLink } from "react-router-dom";

const DrawerItem = ({ title, icon, to,setClose }) => {
    return (
       <div className='flex w-[95%] h-12 items-center px-1 border-b-[1px]  border-b-[#C4C4C4] mx-[0px] hover:cursor-pointer'>
            <NavLink to={to}
                className='w-full flex h-[85%] items-center pl-3 pt-1'
                style={({ isActive }) => ({
                    border:isActive ? "solid 1px black" :"",
                    background:isActive ? "white" :"",
                    borderRadius: isActive? "5px":"0px",
                })}
                end
            >
                {icon}
                <p className='text-[15px] ml-2 p-0 m-0  h-[19px]'>{title}</p>
            </NavLink>
       </div>
    )
}

export default DrawerItem