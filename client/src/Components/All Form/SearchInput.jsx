import React, { useState } from 'react'
import { useSearch } from '../../context/SerchContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function SearchInput() {
    const [values, setValues] = useSearch()
    const navigate = useNavigate();
    

    //serach 
    const handleClick = async(e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`)
            setValues({...values ,result:data})
            navigate('/search')
            
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <div className=" flex max-w-md gap-x-4">
   
              <input
                id="Serach"
                name="serach"
                type="text"
                autoComplete="off"
                value={values.keyword}
                onChange={(e)=> setValues({...values,keyword:e.target.value})}
                required
                className="min-w-0 flex-auto rounded-md  border border-black bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Search Products....."
              />
              <button
                type="submit"
                onClick={handleClick}
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Search
              </button>
            </div>
    </>
  )
}

export default SearchInput