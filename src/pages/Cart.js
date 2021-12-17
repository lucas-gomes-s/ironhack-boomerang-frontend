import { Typography, Paper, Grid, Button, TextField, InputLabel, FormControl } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Box} from "@mui/system";
import {CartContext} from "../contexts/cartContext";
import { AuthContext } from "../contexts/authContext";
import {useEffect, useContext, useState} from "react"
import {Link} from "react-router-dom"
import Navbar from "../components/Navigation/Navbar";
import moment from "moment";
import axios from "axios";
import CenteredLoading from "../components/CenteredLoading"


function Cart() {
    const cartContext = useContext(CartContext)
    const authContext = useContext(AuthContext)
    const [freightLoading, setFreightLoading] = useState(false)
    const [freight, setFreight] = useState({calculated: false, value:0})
    const [zipCode, setZipcode] = useState("")
    const [error, setError] = useState("")

    const handleClick = (e) => {
        let aux = cartContext.cart
        aux = aux.filter(item => item._id !== e.currentTarget.id)
        console.log(aux)
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
        console.log(response)
        setFreight({calculated: true, value: parseFloat(response.data.value.toFixed(2))})
        setFreightLoading(false)
        }
        catch(error){
            setError(true)
            setFreightLoading(false)
        }
    }

    const handleChange = (e) => {
        console.log(cartContext.cart)
        setZipcode(e.target.value)
    }

    return(
        <>
            <Navbar/>
            <Box sx={{width: "80%", mx: "auto", my:2}}>
                <Typography variant="h3" color="#D32F7D" sx={{px: 2}}>Your Cart</Typography>
                {cartContext.cart.map(item => {
                    return(
                        <Paper sx={{my: 2, p: 2}} style={{maxHeight: "30vh"}} key={item._id}>
                            <Grid container spacing={2} sx={{display: "flex", justifyContent: "space-between"}}>
                                <Grid item xs={2}>
                                    <Link to = {`/product/${item._id}`} >
                                        <img 
                                            src={item.img}
                                            className="img-contain"
                                            style={{maxWidth: "100%"}}
                                        />
                                    </Link>
                                </Grid>
                                <Grid item xs={5} className="flex-column" sx={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                                    <Box>
                                        <Typography variant="h5">{item.name}</Typography>
                                        <Typography>

                                            {Object.keys(item.filteredVariant[0].specification).map(spec => {
                                                return (
                                                    `${spec} : ${item.filteredVariant[0].specification[spec]} `
                                                )
                                            })}
                                        
                                        </Typography>
                                        <Typography>
                                            Rented by {item.stores[0].name}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography>From: {moment(item.startDate, "YYYY-MM-DD").format("DD/MM/YYYY")}</Typography>
                                        <Typography>To: {moment(item.endDate, "YYYY-MM-DD").format("DD/MM/YYYY")}</Typography>
                                    </Box>            
                                </Grid>
                                <Grid sx={{display: "flex", alignItems: "center"}}>
                                    <Typography color="primary" variant = "h5" >
                                            {moment(item.endDate, "YYYY-MM-DD").diff(moment(item.startDate, "YYYY-MM-DD"), "days")} days X R${item.price/moment(item.endDate, "YYYY-MM-DD").diff(moment(item.startDate, "YYYY-MM-DD"), "days")} a day = R${item.price}
                                    </Typography>
                                </Grid>
                                <Grid sx={{display: "flex", alignItems: "center"}}>
                                    <Button id = {item._id} onClick={handleClick} > <DeleteIcon color="primary" sx={{fontSize: "3rem"}}/> </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                })}
                <Box className="flex-row between" sx={{alignItems: "center"}}>
                    <Box className="flex-column">
                        {freightLoading?
                        <CenteredLoading/>
                        :
                        <>
                        <Typography variant="h6">Calculate Delivery Fee</Typography>
                        <form onSubmit = {handleSubmit}>
                            <Box className="flex-row">
                                <TextField value={zipCode} onChange={handleChange} labelId="zip-code" label="insert zip code" type= "number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                <Button type="submit">Calculate</Button>
                            </Box>
                        </form>   
                        </>                     
                        }
                    </Box>
                    <Box className="flex-column">
                        <Typography color="primary" variant = "h6" align="center">
                            Item Prices = R${cartContext.cart.reduce((a,b) => {
                                return a+b.price
                            }, 0)}
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
                            Total = R${cartContext.cart.reduce((a,b) => {
                                return a+b.price
                            }, 0) + freight.value}
                        </Typography>
                    </Box>
                </Box>

                <Box className="flex-row-center">
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
                </Box>
            </Box>
        </>
    )
}

export default Cart