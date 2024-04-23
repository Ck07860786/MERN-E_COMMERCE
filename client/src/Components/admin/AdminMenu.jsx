import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { PiCodesandboxLogoLight } from "react-icons/pi";
import { SiEbox } from "react-icons/si";
import { PiUserCircleGear } from "react-icons/pi";




function AdminMenu() {
  return (
    <>
        <aside className=" bg-white text-black border-r-2 w-64 min-h-screen">
            <div className="p-4 text-center">
                <h1 className="text-xl font-semibold  text-black mb-4">Admin Panel</h1>
                <ul>
                    <li>
                        <NavLink to="/dashboard/admin/create-category" className=" py-2 px-4 flex items-center h  hover:bg-gray-300"><AiOutlineAppstoreAdd size={23} className='mr-2' /> Create Category</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/admin/create-products" className=" flex items-center py-2 px-4 hover:bg-gray-300"> <PiCodesandboxLogoLight size={23} className='mr-2' /> Create Product</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/admin/products" className=" py-2  flex items-center px-4  hover:bg-gray-300"> <SiEbox size={23} className='mr-2' />Products</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/dashboard/admin/users" className="block py-2 flex items-center px-4  hover:bg-gray-300"> <PiUserCircleGear size={23} className='mr-2' />Profile</NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    </>
  )
}

export default AdminMenu