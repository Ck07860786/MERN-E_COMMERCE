import React from 'react'
import logo from '../assets/logo.jpg'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth'
import {toast} from 'react-toastify'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import SearchInput from '../Components/All Form/SearchInput'
import useCategory from '../hooks/useCategory'
import { useCart } from '../context/Cart'
import { Badge, Button } from 'antd'
import { AiOutlineShoppingCart } from "react-icons/ai";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Header() {

  const [auth,setAuth]= useAuth();
  const [cart] = useCart()
  const categories = useCategory()

  const handleLogout =()=>{
    
    setAuth({
      ...auth,
      user:null,
      token:"",
    });
    localStorage.clear('token')
    toast.success('logout successfully')
  }
  return (
    <>
  <header/>
       <div className=' w-full border-b-[2px] h-24 items-center flex justify-between px-32 shadow-md'>
                <div>
                    <img className=' w-[50px]' src={logo} alt='logo' />
                </div>

                <div className=' py-8'>
                  <SearchInput/>
                </div>

                <div className=' flex gap-8'>
            
                
                <p><Link to='/home'>Home</Link></p>
                <p><Link to='/about'>About</Link></p>
                <p><Link to='/contact'>Contact</Link></p>
                <p>
                <Link to='/cart'>
                <Badge  className=' py-1' count={cart?.length} >
                  <p> <AiOutlineShoppingCart size={25} /></p>
                </Badge>
                </Link>
                </p>
                

                </div>
                <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Categories
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>
      

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
          <Menu.Item>
            
            {({ active }) => (
              
                <NavLink to={`/categories`}
                 
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  All Categories
                </NavLink>
              )}
            </Menu.Item>
          {categories?.map((c)=>(
            <Menu.Item>
            
            {({ active }) => (
              
                <NavLink to={`/category/${c.slug}`}
                 
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  {c.name}
                </NavLink>
              )}
            </Menu.Item>

          ))}
            
          
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
                <div className=' flex gap-4'>
                  {
                    !auth.user ? (<>
                      <Button className=' bg-black text-white'><Link to='/login'>Login</Link></Button>
                  <p><Button className=' bg-black text-white' to='/register'>Register</Button></p>
                    </>) :(<>
                      <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {auth?.user?.name}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin":"user"}`}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Dashboard
                </NavLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <NavLink onClick={handleLogout} to='/login'
                  
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Logout
                </NavLink>
              )}
            </Menu.Item>
          
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
                    
                      
                    </>)
                  }
                  
                </div>

                </div>

    </>
  )
}

export default Header