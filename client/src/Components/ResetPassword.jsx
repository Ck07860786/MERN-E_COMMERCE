import React,{useState} from 'react'
import axios from 'axios'
import { Link,NavLink,useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useAuth } from '../context/auth'
import Header from '../Layouts/Header'

function ResetPassword() {
    const [email,setEmail] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [answer,setAnswer] = useState("")
    const [auth,setAuth]= useAuth()
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
  
        e.preventDefault()
        try {
         
          const response = await axios.post('http://localhost:8080/api/v1/auth/forgot-password',{
            email,
            newPassword,
            answer,
        }).then(response=>{
            
            if(response.data.success){
              toast.success(response.data.message)
              setAuth({
                ...auth,
                user:response.data.user,
                token:response.data.token,
                
              });
              navigate('/login')
             
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
    <Header/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Reset Password
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
              autoComplete="off"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="Security Question" className="block text-sm font-medium leading-6 text-gray-900">
            Security question
          </label>
          <div className="mt-2">
            <input
              id="answer"
              name="answer"
              placeholder='What is your nick name?'
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              type="text"
              autoComplete="off"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="new Password" className="block text-sm font-medium leading-6 text-gray-900">
            New Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              type="password"
              autoComplete="off"
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
            Reset
          </button>
        </div>
      </form>

   
    </div>
  </div>
    </>
  )
}

export default ResetPassword