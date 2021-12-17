import api from "../configs/api"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Navbar from "../components/Navigation/Navbar"
import ItensList from "../components/ItensList"
import CenteredLoading from "../components/CenteredLoading"
import {Box} from "@mui/system"
import {Button, Typography} from "@mui/material"


function Productlist() {
    const display = 20
    const [productDisplay, setProductDisplay] = useState(display)
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const {_id} = useParams() 

    useEffect( () => {
        api.get(`/category/${_id}`)
        .then(response =>{
            setProducts(response.data[0].products)
            setCategory(response.data[0])
            setLoading(false)
        }
        )
    },[_id])

    const handleClickProduct = () => {
        setProductDisplay(productDisplay + display)
    }

    return(
        <>
            <Navbar/>
            {loading? 
            <CenteredLoading/>
            :
            <Box width="80vw" sx={{mx: "auto", my: 2}}>
                <Typography variant="h3" color="#D32F7D">{category.name}</Typography>
                <ItensList link="product" itens = {products} display={productDisplay}/>
                <Box sx={{display: "flex", justifyContent: "center"}} >
                    <Button onClick = {handleClickProduct}>
                        See More
                    </Button>
                </Box>
            </Box>
            }
        </>
    )
}

export default Productlist