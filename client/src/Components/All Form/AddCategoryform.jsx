import React from 'react'

function AddCategoryform({handleSubmit,value,setValue}) {
  return (
    <> 
    <form onSubmit={handleSubmit}>
        <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Categoty
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                
                
                autoComplete="off"
                required
                className="min-w-0 flex-auto rounded-md  border border-black bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Add new category"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Add
              </button>
            </div>
            </form>
    </>
  )
}

export default AddCategoryform