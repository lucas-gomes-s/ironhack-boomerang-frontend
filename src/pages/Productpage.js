import api from "../configs/api";
import {useState, useEffect, useContext} from "react";
import Navbar from "../components/Navigation/Navbar";
import { Typography, Button, Paper, TextField, MenuItem, Select, Grid, InputLabel} from "@mui/material";
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
    const [variant, setVariants] = useState({})
    const [selectedVariant, setSelectedVariants] = useState({})
    const [filteredVariant, setFilteredVariants] = useState({})
    const [price, setPrice] = useState(0)
    const cartContext = useContext(CartContext)
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    const {_id} = useParams();
    useEffect( () => {
    api.get(`/product/${_id}`)
    .then((response) => {
        setProduct(response.data[0])
        console.log(response.data[0])
        setLoading(false)
    })


    }, [_id])

    useEffect(() => {
        if (product.variants) {
            let aux = {}
            product.variants.map (currentVariant => {
                Object.keys(currentVariant.specification).map(variantName => {
                    if (!Object.keys(aux).includes(variantName)) {
                        aux[variantName] = [currentVariant.specification[variantName]]
                    }
                    else {
                        if (!aux[variantName].includes(currentVariant.specification[variantName])){
                            aux[variantName] = [...aux[variantName], currentVariant.specification[variantName]] 
                        }
                    }
                    return null
                })
                return null
            })
            setVariants(aux)
        }
    }, [product])
    
    useEffect(() => {
        if (product.variants) {
        let aux = product.variants
        aux = aux.filter(value => {
            for (let i=0; i<Object.keys(selectedVariant).length; i++) {
                if (!(value.specification[Object.keys(selectedVariant)[i]] === selectedVariant[Object.keys(selectedVariant)[i]])){
                    return false
                }
            }
            return true
        })
        setFilteredVariants(aux)
    }

    }, [selectedVariant, product])

    useEffect(() => {

        if (filteredVariant.length === 1) {
            setUnavailable(filteredVariant[0].unavailable)
        }
        else {
            setUnavailable([])
        }
    }, [filteredVariant])

    useEffect(() => {
        if (endDate && startDate) {
            if (endDate.diff(startDate, "days") > 0) {
                let aux = product.pricing[Object.keys(product.pricing)[0]]
                for (let i=0; i<Object.keys(product.pricing).length-1; i++) {
                    if (endDate.diff(startDate, "days") >= Object.keys(product.pricing)[i]) {
                        
                        aux = product.pricing[Object.keys(product.pricing)[i+1]]
                    }
                }
                setPrice(aux)
            }
        }
    }, [startDate, endDate, product])

    const handleCartClick = () => {
        const aux = [...cartContext.cart];
        if (!startDate || !endDate || !filteredVariant.length===1 || endDate.diff(startDate, "days")<1) {
            
            return null
        }
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
            aux.push({...product, startDate: startDate, endDate: endDate, filteredVariant: filteredVariant, price: price*endDate.diff(startDate, "days")})
        }
        cartContext.setCart(aux)
        localStorage.setItem(
            "boomerangCart",
            JSON.stringify([ ...aux])
        );
    }

    const handleVariantChange = (e) => {
        setSelectedVariants({...selectedVariant, [e.target.name]: e.target.value})
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
                                <ImageCarousel sx={{mx: "auto"}} images={product.secondaryImgs.length>0?product.secondaryImgs.concat(product.img):[product.img]}/>
                            </Box>
                            <Paper width={isSmallScreen ? "100%" : "50%"} sx={{m:2, p:2}} className="flex-column around">
                                <Box>
                                    <Paper sx={{p: 2, mb:2}}>
                                        <Typography color="primary" variant="h6">Select the Specifications</Typography>
                                        <Grid container spacing={2}>
                                            {Object.keys(variant).map((variantName, index) => {
                                                return (
                                                    <Grid item xs={6} key = {index}>
                                                        <InputLabel id = {`label-${variantName}`}>{variantName}</InputLabel>
                                                        <Select 
                                                            labelId={`label-${variantName}`}
                                                            label = {variantName}
                                                            name={variantName}
                                                            onChange = {handleVariantChange}
                                                            sx={{width: "100%"}}
                                                        >
                                                            {variant[variantName].map(value => {
                                                                return(
                                                                    <MenuItem  key={value} value = {value}>
                                                                        {value}
                                                                    </MenuItem>
                                                                )
                                                            })
                                                            }
                                                        </Select>
                                                    </Grid>
                                                )  
                                            })}
                                        </Grid>
                                    </Paper>
                                    <Paper sx={{p: 2, mb:2}}>
                                        <Typography color="primary" variant="h6">Select Rental Period</Typography>
                                        <DatePair 
                                        startDate={startDate} 
                                        setStartDate={setStartDate} 
                                        endDate={endDate}
                                        setEndDate={setEndDate}
                                        unavailable = {unavailable}
                                        offdays = {product.stores[0].offDays}
                                        showCalendar = {product.variants.length === 0 ||filteredVariant.length === 1}
                                        />
                                    </Paper>
                                </Box>
                                <TextField type= "number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                <Typography color = "secondary" variant="h5" align="center" sx={{my: 2}}>
                                    {startDate && endDate &&moment(endDate, "YYYY-MM-DD")>moment(startDate, "YYYY-MM-DD")?
                                    `${endDate.diff(startDate, "days")} days X R$${price} = R$${price*endDate.diff(startDate, "days")}`
                                    :
                                    null
                                    }
                                </Typography>
                                <Box sx={{display: "flex", justifyContent: "center"}}>
                                    <Button onClick = {handleCartClick} >Add to Cart</Button>
                                </Box>  
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