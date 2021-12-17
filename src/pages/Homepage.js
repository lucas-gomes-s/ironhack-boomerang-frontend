
import api from "../configs/api"
import {useState, useEffect} from "react"

import Navbar from "../components/Navigation/Navbar"
import HomeCarousel from "../components/Display/HomeCarousel"
import HomeCarouselTwo from "../components/Display/HomeCarouselNew"
import ItensList from "../components/ItensList"
import CenteredLoading from "../components/CenteredLoading"

import {Box} from "@mui/system"
import {Typography, Button} from "@mui/material"

function Homepage() {
    const display = 4
    const [categoryDisplay, setCategoryDisplay] = useState(display)
    const [productDisplay, setProductDisplay] = useState(display)
    const [storeDisplay, setStoreDisplay] = useState(display)
    const [categories, setCategories] = useState([])
    const [stores, setStores] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const handleClickCategory = () => {
        setCategoryDisplay(categoryDisplay + display)
    }
    const handleClickProduct = () => {
        setProductDisplay(productDisplay + display)
    }
    const handleClickStore = () => {
        setStoreDisplay(storeDisplay + display)
    }

    useEffect(()=> { 
        api.get("/category")
        .then (
            response => {
                setCategories(response.data)
            }
        )
        .then( () =>
            api.get("/store")
        )
        .then ( 
            response => {
                setStores(response.data)
            }
        )
        .then( () =>
            api.get("/product")
        )
        .then(
            response => {
                setProducts(response.data)
                setLoading(false)
            }
        )
        .catch (
            error => console.log(error)
        )
    }, [])


    return(
        <>
            <Navbar/>
            {loading? 
            <CenteredLoading/>
            :
            <>
                <Box sx={{mx: "auto", my: 2, p:2}} width="80vw">
                    <HomeCarouselTwo objects={categories}/>
                </Box>
                <Box sx={{backgroundColor: "#0E153A", width: "80vw", p:2, mx:"auto"}}> 
                    <Typography variant="h4" color="#D32F7D">
                        Top Products
                    </Typography>
                    <ItensList link="product" itens = {products} display={productDisplay}/>
                    <Box sx={{display: "flex", justifyContent: "center"}} >
                        <Button onClick = {handleClickProduct}>
                            See More
                        </Button>
                    </Box>
                </Box>
                <Box sx={{backgroundColor: "#D32F7D", width: "80vw", p:2, mx:"auto"}}> 
                    <Typography variant="h4" color="#0E153A">
                        Categories
                    </Typography>
                    <ItensList link="category" itens = {categories} display={categoryDisplay}/> 
                    <Box sx={{display: "flex", justifyContent: "center"}} >
                        <Button variant= "secondary" onClick = {handleClickCategory}>
                            See More
                        </Button>
                    </Box>
                </Box>
                <Box className ="bgc-1" sx={{width: "80vw", p:2, mx:"auto"}}> 
                    <Typography variant="h4" color="white">
                        Partners
                    </Typography>
                    <ItensList link="store" itens = {stores} display={storeDisplay}/>
                    <Box sx={{display: "flex", justifyContent: "center"}} >
                        <Button onClick = {handleClickStore}>
                            See More
                        </Button>
                    </Box>
                </Box>

            </>
            }
        </>
    )
}

export default Homepage