import React, { useEffect, useState } from "react";
import Header from "../../Layouts/Header";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";


function Products() {
  const [products, setProducts] = useState([]);

  const getALlProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProducts(data.product);
      console.log(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching the product");
    }
  };

  // for getting all product
  useEffect(() => {
    getALlProducts();
  }, []);

  

  return (
    <>
      <Header />
      <div className="flex">
        <AdminMenu />
        <div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl mt-3">All Products List</h1>
          </div>
          <div className="bg-white mt-1">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                {products?.map((p) => (
                  <div key={p._id} className="flex flex-col">
                    <Link to={`/dashboard/admin/products/${p.slug}`}>
                      <div className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full p-5 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <img
                            src={`http://localhost:8080/api/v1/product/product-image/${p._id}`}
                            alt={p.name}
                            className="object-cover object-center w-full h-full"
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
                            {p.description}
                           
                            
                          </p>
                        </div>
                      </div>
                    </Link>
                   
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

export default Products;
