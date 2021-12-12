import api from "../configs/api";
import {useState, useEffect, useContext} from "react";
import Navbar from "../components/Navbar";
import { Typography, Button } from "@mui/material";
import CenteredLoading from "../components/CenteredLoading";
import { useParams } from "react-router";
import {CartContext} from "../contexts/cartContext";

function Productpage() {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const cartContext = useContext(CartContext)

    const {_id} = useParams();
    useEffect( () => {
    api.get(`/product/${_id}`)
    .then((response) => {
        console.log(response.data)
        setProduct(response.data[0])
        setLoading(false)
    })
    }, [_id])

    const handleClick = () => {
        const aux = {...cartContext.cart};
        if (Object.keys(cartContext.cart).includes(_id)){         
            aux[_id] += 1;
        }
        else {
            aux[_id] = 1;
            console.log(aux)
        }
        cartContext.setCart(aux)
        localStorage.setItem(
            "boomerangCart",
            JSON.stringify({ ...aux})
        );


    }
    return(
        <>
            <Navbar/>
            {loading?
            <CenteredLoading/>
            : 
            <>
                <Typography>{product.name}</Typography>
                <Button onClick = {handleClick}>Add to Cart</Button>
            </>
            }
        
        </>
    )
}


export default Productpage