import { Typography, Button, TextField, Grid} from "@mui/material";
import {Box} from "@mui/system";
import {CartContext} from "../contexts/cartContext";
import { AuthContext } from "../contexts/authContext";
import {useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Navbar from "../components/Navigation/Navbar";
import axios from "axios";
import CenteredLoading from "../components/CenteredLoading"
import CartPageInfo from "../components/Display/CartPageInfo";
import {useMediaQuery, useTheme} from "@material-ui/core"


function Cart() {
    const cartContext = useContext(CartContext)
    const authContext = useContext(AuthContext)
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    const [freightLoading, setFreightLoading] = useState(false)
    const [freight, setFreight] = useState({calculated: false, value:0})
    const [zipCode, setZipcode] = useState("")
    const [itemCost, setItemCost] = useState (cartContext.cart.reduce((a,b) => {
        return a+b.price
    }, 0))
    const [error, setError] = useState("")

    useEffect(() => {
        setItemCost(cartContext.cart.reduce((a,b) => {
            return a+b.price
        }, 0))
    }, [cartContext.cart])

    const handleClick = (e) => {
        let aux = cartContext.cart
        aux = aux.filter(item => item._id !== e.currentTarget.id)
        cartContext.setCart(aux)
        localStorage.setItem(
            "boomerangCart",
            JSON.stringify(aux)
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFreightLoading(true)
        setError(false)
        try {
        const response = await axios.post("https://boomerang-ironhack.herokuapp.com/checkout/freight", {destination: zipCode, origin: cartContext.cart[0].stores[0].zipCode})
        setFreight({calculated: true, value: parseFloat(response.data.value.toFixed(2))})
        setFreightLoading(false)
        }
        catch(error){
            setError(true)
            setFreightLoading(false)
        }
    }

    const handleChange = (e) => {
        setZipcode(e.target.value)
    }

    return(
        <>
            <Navbar/>
            <Box sx={{width: "80%", mx: "auto", my:2}}>
                <Typography variant="h3" color="#D32F7D" sx={{px: 2}}>Your Cart</Typography>
                {cartContext.cart.map(item => {
                    return(
                        <CartPageInfo item={item} handleClick={handleClick}/>
                    )
                })}
                <Grid container>
                    <Grid item xs={isSmallScreen?12:9}>
                        {freightLoading?
                        <CenteredLoading/>
                        :
                        <>
                        <Typography variant="h6">Calculate Delivery Fee</Typography>
                        <form onSubmit = {handleSubmit}>
                            <Box className="flex-row">
                                <TextField value={zipCode} onChange={handleChange} type= "number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                <Button type="submit">Calculate</Button>
                            </Box>
                        </form>   
                        </>                     
                        }
                    </Grid>
                    <Grid item xs={isSmallScreen?12:3}>
                        <Typography color="primary" variant = "h6" align="center">
                            Item Prices = R${itemCost}
                        </Typography>
                        {
                            freight.calculated?
                            <Typography color="primary" variant = "h6" align="center">
                            Freight Prices = R${freight.value}
                            </Typography>
                            :
                            <></>
                        }
                        <Typography color="primary" variant = "h4" align="center">
                            Total = R${itemCost + freight.value}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                    {
                        authContext.user ?
                            freight.calculated?
                                <Link className="clean-link bgc-1" to ="/checkout" state= {freight.value}> 
                                    <Button variant="contained" disabled={!freight.calculated}>
                                        Proceed to Checkout 
                                    </Button>
                                </Link>
                            :
                                <Typography variant="h6" color="#D32F7D">Please calculate delivery fee to procceed</Typography>
                        :
                        <Link className="clean-link bgc-1" to ="/signin"> Login to Continue</Link>
                    }
                    </Grid>
                </Grid>


            </Box>
        </>
    )
}

export default Cart