import Navbar from "../components/Navigation/Navbar"
import api from "../configs/api"
import {useState, useEffect} from "react"
import HomeCarousel from "../components/Display/HomeCarousel"
import ItensList from "../components/ItensList"
import CenteredLoading from "../components/CenteredLoading"
import {Box} from "@mui/system"

function Homepage() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> { 
        api.get("/category")
        .then (response => {
            return(response.data)
        }
        )
        .then ( data =>{
            setCategories(data)
            setLoading(false)
        }
        )
    }, [])


    return(
        <>
            <Navbar/>
            {loading? 
            <CenteredLoading/>
            :
            <>
                <Box sx={{mx: "auto", my: 2, border:"1px solid black"}} width="80vw" height="60vh">
                    <HomeCarousel objects={categories} height="100%"/>
                </Box>
                <ItensList link="category" itens = {categories}/>
            </>
            }
        </>
    )
}

export default Homepage