import React from 'react'
import { NavLink } from 'react-router-dom'
import { PiUserCircleGear } from "react-icons/pi";
import { PiCodesandboxLogoLight } from "react-icons/pi";

function UserMenu() {
  return (
    <>
        <aside className=" bg-white text-black  border-r-2 w-64 min-h-screen">
<div className="p-4 text-center">
    <h1 className="text-xl font-semibold text-black mb-4">Dashboard</h1>
    <ul>
        <li>
            <NavLink to="/dashboard/user/profile" className=" py-2 px-4 flex items-center  hover:bg-gray-300"><PiUserCircleGear size={23} className='mr-2' />Profile</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/user/orders" className=" py-2 px-4 flex items-center  hover:bg-gray-300"><PiCodesandboxLogoLight size={23} className='mr-2' />Orders</NavLink>
        </li>
        
    </ul>
</div>
</aside>
    </>
  )
}

export default UserMenu