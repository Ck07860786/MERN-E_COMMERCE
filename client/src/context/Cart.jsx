import {createContext,useContext,useEffect,useState} from 'react'
const CartContext = createContext();



const CartProvide = ({children})=>{
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        let existingCartItem = localStorage.getItem('cart')
        if(existingCartItem) setCart(JSON.parse(existingCartItem))
    },[])

     return(
        <CartContext.Provider value={[cart,setCart]}>
        {children}

        </CartContext.Provider>
    )
}

const useCart = ()=>useContext(CartContext)

export {useCart,CartProvide};