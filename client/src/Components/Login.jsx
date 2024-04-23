import React,{useState} from 'react'
import axios from 'axios'
import { Link,NavLink,useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useAuth } from '../context/auth'
import Header from '../Layouts/Header'
import User from '../Images/User.png'
function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [auth,setAuth]= useAuth()
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
  
    e.preventDefault()
    try {
     
      const response = await axios.post('http://localhost:8080/api/v1/auth/login',{email,password}).then(response=>{
        
        if(response.data.success){
          toast.success(response.data.message)
          setAuth({
            ...auth,
            user:response.data.user,
            token:response.data.token,
          });
          localStorage.setItem('auth', JSON.stringify(response.data))
          navigate('/home')
        }
        else{
          toast.error(response.data.message)
        }

      })
      
    } catch (error) {
      console.log(error)
      toast.error('somthing went wrong')
      
    }
  }
  return (
    <>
    
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 "
        >
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-20 w-auto"
        src={User}
        alt="User"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
       
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <NavLink to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </NavLink>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          register now
        </Link>
      </p>
    </div>
  </div>
    </>
  )
}

export default Login