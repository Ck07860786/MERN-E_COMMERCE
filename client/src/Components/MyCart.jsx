import React from 'react'
import Header from '../Layouts/Header'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import Item from 'antd/es/list/Item'
import { toast } from 'react-toastify'

function MyCart() {
    const [cart, setCart] =  useCart()
    const [auth,setAuth] = useAuth()

    //total 

    const totalPrice =()=>{
        try {
            let total = 0;
           cart?.map((Item)=>{
            total= total +Item.price;
           })
           return total;
        } catch (error) {
            console.log(error)
        }
    }

    const removeCartItem = (pid)=>{
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(Item=>Item._id===pid)
            myCart.splice(index,1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
            toast.success('item removed successfully')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header/>
            
            <div className=' mt-6 px-7 text-center '>
                <h1 className=' text-2xl'> {`Hello ${auth?.token && auth.user.name}`}</h1> 
                <h3 className=' mt-3'>{cart?.length > 0 ?`you have ${cart.length} item in your cart ${auth?.token ? "" : " ,Please login to checkout"} `:"Your cart is empty"}</h3>
            </div>

            <div className=' mt-14 w-1/2 px-12'>
                <div className=' flow-root'>
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart?.map((p) => (
                            <li className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={`http://localhost:8080/api/v1/product/product-image/${p._id}`}
                                        alt={p.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <a href={p.name}>{p.name}</a>
                                                <p className="text-gray-500">Description: {p.description}</p>
                                            </h3>
                                            <p className="ml-4">{p.price}</p>
                                        </div>
                                        
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty {p.quantity}</p>

                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={()=>removeCartItem(p._id)}
                                                
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <hr className=' mt-2 w-[660px] ml-12'/>
            <div className=' flex items-center w-[600px] justify-evenly gap-40'>
            <div className="mt-8 px-10 mb-5 ml-auto">
                <button
                    type="button"
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
                >
                    Checkout
                </button>
            </div>
            <div className=' flex'>
                <h1 className=' text-xl'>Total : Rs.{totalPrice()}.00</h1>
            </div>
            </div>
        </>
    )
}

export default MyCart;
