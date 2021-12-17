import {useContext, useState, useEffect} from "react"

import { AppBar, Toolbar, Autocomplete, TextField, Button, Badge, IconButton} from "@mui/material";
import {useMediaQuery, useTheme} from "@material-ui/core"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Box} from "@mui/system"

import {AuthContext} from "../../contexts/authContext"
import {CartContext} from "../../contexts/cartContext"

import {Link, useNavigate} from "react-router-dom"

import logo from "../../imgs/logo_02.png"
import smallLogo from "../../imgs/logo_02_small.png"


import SignOutButton from "./SignOutButton";
import CartDrawer from "./CartDrawer"

import api from "../../configs/api"

function Navbar() {
    const authContext = useContext(AuthContext)
    const cartContext = useContext(CartContext);
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    const [openCart, setOpenCart] = useState(false)
    const [products, setProducts] = useState([])
    const [productNames, setProductNames] = useState([])

    useEffect(()=> {
        api.get("/product")
        .then(response=> {
            setProducts(response.data)
            let aux = []
            for (let i=0; i<response.data.length; i++) {
                if (!aux.includes(response.data[i].name)) {
                    aux.push(response.data[i].name)
                }
            }
            console.log(aux)
            setProductNames(aux)
        })
        .catch(error => console.log(error))
    }, [])

    const handleClick = () => {
        setOpenCart(!openCart)
    }


    const handleChange =(e) => {
        let value = e.currentTarget.innerHTML
        let filteredProducts = products.filter(product => {
            return (product.name === value)
        })
        console.log(e.currentTarget.innerHTML)
        console.log(filteredProducts)
        if (filteredProducts.length > 0) {
            navigate(`/product/${filteredProducts[0]._id}`, {replace: true})
        }
    }

    return (
        <AppBar position="static" color="primary" >
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <Link to="/">
                    <img 
                        src= {isSmallScreen? smallLogo : logo }
                        alt = "Logo Boomerang"
                        style={{height: "3rem"}}
                    />
                </Link>
                <Autocomplete 
                    options={productNames}
                    freeSolo
                    renderInput={params => <TextField {...params} label="Search" />}
                    sx = {{width: "30vw", backgroundColor: "white"}}
                    onChange = {handleChange}
                />
                <Box>
                    <IconButton sx={{mx: 2}}>
                        <Badge badgeContent={Object.keys(cartContext.cart).length} color="secondary">
                            <ShoppingCartIcon sx={{color: "white"}} onClick={handleClick}/>
                        </Badge>
                    </IconButton>
                    {authContext.user?
                        <SignOutButton/>
                     :
                        <Link to="/signin" className="clean-link">
                        
                        <Button variant="outlined" color="secondary"> Sign In </Button>
                        
                        </Link>
                    }
                </Box>
                <CartDrawer state={openCart} handleClick={handleClick}/>    
            </Toolbar>
        </AppBar>        
    )
}

export default Navbar