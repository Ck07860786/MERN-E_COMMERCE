import React from 'react'
import Header from '../Layouts/Header'
import { useSearch } from '../context/SerchContext'
import { Link } from 'react-router-dom'


function Serach() {
    const [values, setvalues] = useSearch()
  return (
    <>
        <Header/>

        <div className=' container'>
            <div className=' text-center'>
                <h1 className=' text-4xl'>Search Results</h1>
                <h2 className=' mt-5'>{values?.result.length < 1 ? 'No product found' : `Found ${values?.result.length}`}</h2>

                <div className="bg-white mt-10">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-1 sm:py-10 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                  {values?.result.map((p) => (
                    <Link to={`/product/${p.slug}`}>
                    <div key={p._id} className="flex flex-col">
                      <div className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full p-5 rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <img
                            src={`http://localhost:8080/api/v1/product/product-image/${p._id}`}
                            alt={p.name}
                            className="object-cover object-center w-[200px] h-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{p.name}</h3>
                          </div>
                          <p className="text-sm font-medium text-gray-900">Rs.{p.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">{p.description}</p>
                        </div>
                        <div className=' mt-3'>
                        <button
              type="submit"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              
            >
              Add to Cart 🛒
            </button>
                        </div>
                      </div>
                    </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

                
            </div>
        </div>
    </>
  )
}

export default Serach