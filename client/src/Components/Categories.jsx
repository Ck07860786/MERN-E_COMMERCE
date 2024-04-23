import React from "react";
import Header from "../Layouts/Header";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";


function Categories() {
  const categories = useCategory();
  return (
    <>
      <Header />
      <div className=" text-center mt-5">
        <h1 className=" text-3xl">All Categories</h1>
      </div>
      <div className=" flex grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8  ">
        {categories?.map((c) => (
          <div className=" flex m-24 ">

            <div 
              type="submit"
              className="rounded-md w-[400px] h-[100px] text-center flex items-center   bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black hover:border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                <Link to={`/category/${c.slug}`}>

              {c.name}
            </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Categories;
