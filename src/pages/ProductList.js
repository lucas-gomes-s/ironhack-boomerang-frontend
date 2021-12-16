import api from "../configs/api"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Navbar from "../components/Navigation/Navbar"
import ItensList from "../components/ItensList"
import CenteredLoading from "../components/CenteredLoading"
import {Box} from "@mui/system"
import { Button} from "@mui/material"


function Productlist() {
    const display = 20
    const [productDisplay, setProductDisplay] = useState(display)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const {_id} = useParams() 

    useEffect( () => {
        api.get(`/category/${_id}`)
        .then(response =>{
            setProducts(response.data[0].products)
            console.log(response.data)
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
            <Box width="80vw" sx={{mx: "auto"}}>
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