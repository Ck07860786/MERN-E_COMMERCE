import React, { useEffect, useState } from "react";
import Header from "../Layouts/Header";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router";
import { Select } from "antd";
import { useCart } from "../context/Cart";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [cart ,setCart] = useCart()

  const params = useParams();

  const getProductDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductDetail();
  }, [params?.slug]);

  return (
    <>
      <Header />
      <div className="text-center mt-5">
        <h1 className="text-4xl">Product Detail</h1>
      </div>
      <div className="flex mt-20">
        <div className="shadow-lg w-[400px] ml-40">
          <img
            src={`http://localhost:8080/api/v1/product/product-image/${product._id}`}
            alt={product.name}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="ml-10">
          <div className=" w-[400px] h-full">
            <h1 className="text-2xl px-4">{product.name}</h1>
            <div className=" px-4 text-2xl mt-6">
              <h2>Rs.{product.price}</h2>
            </div>
            <div className=" px-4  mt-6">
              <p>Select quantity</p>
              <Select className="mt-2 w-32" placeholder="1">
                {[...Array(product.quantity).keys()].map((x, i) => {
                  return <Option value={i + 1}>{i + 1}</Option>;
                })}
              </Select>
            </div>
            <div className=" mt-6 px-4">
              <span>Description:</span>
              <p>{product.description}</p>
            </div>

            <div className=" mt-6 px-4">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={() => {
                              setCart([...cart, product]);
                              toast.success("item added to cart");
                            }}
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
