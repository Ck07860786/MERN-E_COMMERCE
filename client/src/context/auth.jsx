import {createContext,useContext,useEffect,useState} from 'react'
import axios from 'axios'

const AuthContext = createContext();



const AuthProvide = ({children})=>{
    const [auth,setAuth] = useState({
        user:null,
        token:"",
    });

    axios.defaults.headers.common["Authorization"] = auth?.token;    

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                user:parseData.user,
                token:parseData.token,
            })
        }
    
    }, [])
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
        {children}

        </AuthContext.Provider>
    )
}

const useAuth = ()=>useContext(AuthContext)

export {useAuth,AuthProvide};