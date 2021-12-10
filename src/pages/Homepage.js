import Navbar from "../components/Navbar"
import api from "../configs/api"
import {useState, useEffect} from "react"
import CategoryCard from "../components/CategoryCard"
import CenteredLoading from "../components/CenteredLoading"

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
            <CategoryCard category = {categories}/>
            }
        </>
    )
}

export default Homepage