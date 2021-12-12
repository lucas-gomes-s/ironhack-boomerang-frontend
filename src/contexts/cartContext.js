import { createContext, useState, useEffect } from "react";

const CartContext = createContext({})

function CartContextProvider(props) {
    const [cart, setCart] = useState({});

    useEffect(() => {
        const storedCart = localStorage.getItem("boomerangCart");
    
        const parsedStoredCart = JSON.parse(storedCart || '""');
    
        if (parsedStoredCart.length>0) {
          setCart({ ...parsedStoredCart });
        }
      }, []);

    return(
        <CartContext.Provider value={{cart, setCart}}>
            {props.children}
        </CartContext.Provider>
    )

}

export {CartContext, CartContextProvider}