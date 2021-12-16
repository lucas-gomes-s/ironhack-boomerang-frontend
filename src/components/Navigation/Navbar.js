import {useContext, useState, useEffect} from "react"

import { AppBar, Toolbar, Autocomplete, TextField} from "@mui/material";
import {useMediaQuery, useTheme} from "@material-ui/core"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Box} from "@mui/system"

import {AuthContext} from "../../contexts/authContext"
import {CartContext} from "../../contexts/cartContext"

import {Link} from "react-router-dom"

import logo from "../../imgs/logo_02.png"
import smallLogo from "../../imgs/logo_02_small.png"


import SignOutButton from "./SignOutButton";
import CartDrawer from "./CartDrawer"

import api from "../../configs/api"

function Navbar() {
    const authContext = useContext(AuthContext)
    const cartContext = useContext(CartContext);
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    const [openCart, setOpenCart] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(()=> {
        api.get("/product")
        .then(response=> {
            let aux = []
            for (let i=0; i<response.data.length; i++) {
                if (!aux.includes(response.data[i].name)) {
                    aux.push(response.data[i].name)
                }
            }
            console.log(aux)
            setProducts(aux)
        })
        .catch(error => console.log(error))
    }, [])

    const handleClick = () => {
        setOpenCart(!openCart)
    }

    const handleChange =(e) => {
        console.log(e.target.value)
    }

    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <Link to="/">
                    <img 
                        src= {isSmallScreen? smallLogo : logo }
                        alt = "Logo Boomerang"
                        style={{height: "3rem"}}
                    />
                </Link>
                <Autocomplete 
                    options={products}
                    freeSolo
                    renderInput={params => <TextField {...params} label="Search"/>}
                    sx = {{width: "30vw"}}
                    onChange = {handleChange}
                />
                <Box>
                    {authContext.user?
                        <SignOutButton/>
                     :
                        <Link to="/signin" className="clean-link">Sign In</Link>
                    }
                    <ShoppingCartIcon onClick={handleClick}/>
                    <span sx={{verticalAlign: "top", margin: "0 0 -20 0"}}>{Object.keys(cartContext.cart).length}</span>
                </Box>
                <CartDrawer state={openCart} handleClick={handleClick}/>    
            </Toolbar>
        </AppBar>        
    )
}

export default Navbar