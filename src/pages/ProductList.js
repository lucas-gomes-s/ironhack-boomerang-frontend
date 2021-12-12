import api from "../configs/api"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Navbar from "../components/Navbar"
import ItensList from "../components/ItensList"
import CenteredLoading from "../components/CenteredLoading"

function Productlist() {
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

    return(
        <>
            <Navbar/>
            {loading? 
            <CenteredLoading/>
            :
            <ItensList link="product" itens = {products}/>
            }
        </>
    )
}

export default Productlist