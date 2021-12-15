import { createContext, useState, useEffect } from "react";

const CartContext = createContext({})

function CartContextProvider(props) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("boomerangCart");
   
        const parsedStoredCart = JSON.parse(storedCart || '""');
        console.log(parsedStoredCart)

        if (parsedStoredCart.length>0) {
          setCart([ ...parsedStoredCart ]);
        }
      }, []);

      const clearCart = () => {
        setCart([]);
        localStorage.removeItem("boomerangCart")
      }

    return(
        <CartContext.Provider value={{cart, setCart, clearCart}}>
            {props.children}
        </CartContext.Provider>
    )

}

export {CartContext, CartContextProvider}