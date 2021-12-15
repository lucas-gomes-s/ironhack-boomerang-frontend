import api from "../configs/api";
import {useState, useEffect, useContext} from "react";
import Navbar from "../components/Navigation/Navbar";
import { Typography, Button, Paper, TextField} from "@mui/material";
import CenteredLoading from "../components/CenteredLoading";
import { useParams } from "react-router";
import {CartContext} from "../contexts/cartContext";
import moment from "moment"
import DatePair from "../components/Inputs/DatePair";
import {Box} from "@mui/system"
import {useMediaQuery, useTheme} from "@material-ui/core"
import ImageCarousel from "../components/Display/ImageCarousel";
import {Link} from "react-router-dom"

function Productpage() {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [startDate, setStartDate] = useState(moment())
    const [endDate, setEndDate] = useState(null)
    const [unavailable, setUnavailable] = useState([])
    const cartContext = useContext(CartContext)
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    const {_id} = useParams();
    useEffect( () => {
    api.get(`/product/${_id}`)
    .then((response) => {
        console.log(response.data[0])
        setProduct(response.data[0])
        setLoading(false)
    })
    }, [_id])

    useEffect(() => {
        if (product.variants && product.variants[0].unavailable){
            let aux = product.variants[0].unavailable
            aux = aux.map(date => {
                return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")
            })
            setUnavailable(aux)
        }
    }, [product])

    const handleClick = () => {
        const aux = [...cartContext.cart];
        const filteredCart = aux.filter(item => {
            return (item._id === _id) 
        })
        if (filteredCart.length>0){         
            aux.map(item => {
                if (item._id === filteredCart[0]._id) {
                    return {...item, startDate: startDate, endDate: endDate}
                }
                else {
                    return item
                }
            })
        }
        else {
            aux.push({...product, startDate: startDate, endDate: endDate})
        }
        cartContext.setCart(aux)
        localStorage.setItem(
            "boomerangCart",
            JSON.stringify([ ...aux])
        );
        console.log(localStorage.getItem("boomerangCart"))
    }
    return(
        <>
            <Navbar/>
            <Paper 
                sx={{width: "80vw", mx: "auto", my:2, p:2}}
            >
                {loading?
                    <CenteredLoading/>
                    : 
                    <>
                        <Typography variant= "h3" color="#D32F7D">{product.name}</Typography>
                        <Typography variant= "h5">
                            Rented by
                            <Link to={`/stores/${product.stores[0]._id}`} className="clean-link"> 
                                {` ${product.stores[0].name}`} 
                            </Link>
                        </Typography>
                        <Box className = {isSmallScreen ? "flex-column" : "flex-row" }>
                            <Box width={isSmallScreen ? "80%" : "50%"} sx={{m:2, mx: "auto"}}>
                                <ImageCarousel sx={{mx: "auto"}} images={[product.img, product.img, product.img , product.img , product.img , product.img, product.img]}/>
                            </Box>
                            <Paper width={isSmallScreen ? "100%" : "50%"} sx={{m:2, p:2}}>
                                
                                <DatePair 
                                startDate={startDate} 
                                setStartDate={setStartDate} 
                                endDate={endDate}
                                setEndDate={setEndDate}
                                unavailable = {unavailable}
                                />
                                <TextField type= "number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                <Button onClick = {handleClick}>Add to Cart</Button>
                            </Paper>
                        </Box>
                        <Paper sx={{p:2}}>
                            <Typography variant="h6">Description</Typography>
                            <Typography>{product.description}</Typography>
                        </Paper>
                    </>
                }
            </Paper>
            
        
        </>
    )
}


export default Productpage