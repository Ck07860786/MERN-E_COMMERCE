import React, { useState, useEffect } from "react";
import Header from "../Layouts/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";


function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart,setCart] = useCart();

  useEffect(() => {
    const getALlProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/product/get-product"
        );
        setProducts(data.product);
        console.log(data.product);
      } catch (error) {
        console.log(error);
      }
    };

    getALlProducts();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
        console.log(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went worng in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <>
      <Header />
      <div className="flex">
        <div className=" w-full">
         

          <div className="bg-white mt-1">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-1 sm:py-10 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                {products.map((p) => (
                 
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
                            <h3 className="text-sm font-medium text-gray-900">
                              {p.name}
                            </h3>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            Rs.{p.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            {p.description.substring(0,30)}....
                          </p>
                        </div>
                        <div className=" flex justify-evenly items-center mt-3">
                        <div className=" mt-3">
                          <button
                          
                            type="submit"
                            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem('cart',JSON.stringify([...cart,p]))
                              toast.success("item added to cart");
                            }}
                          >
                            Add to Cart 🛒
                          </button>
                        </div>
                        <div className=" mt-3">
                          <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                          >
                            <Link to={`/product/${p.slug}`}>More Detail</Link> 
                          </button>
                        </div>
                        </div>
                      </div>
                    </div>
                 
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
