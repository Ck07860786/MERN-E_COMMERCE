import { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import {Outlet,} from 'react-router-dom'
import axios from 'axios'
import Spinner from "../Spinner";
import { BASE_URL } from "../../Helper";



export default function AdminRoute(){

    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const checkAuth =async()=>{
            const res = await axios.get(`${BASE_URL}/api/v1/auth/admin-auth`);
          
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(auth?.token) checkAuth();
    
    }, [auth?.token]);

    
        return ok ? <Outlet/> : <Spinner path=""/>
    

   
} 