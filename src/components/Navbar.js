import { AppBar, Toolbar, Typography} from "@mui/material";
import logo from "../imgs/logo_02.png"
import smallLogo from "../imgs/logo_02_small.png"
import {AuthContext} from "../contexts/authContext"
import {useContext} from "react"
import SignOutButton from "./SignOutButton";
import {Link} from "react-router-dom"
import {useMediaQuery, useTheme} from "@material-ui/core"
import {CartContext} from "../contexts/cartContext"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Box} from "@mui/system"

function Navbar() {
    const authContext = useContext(AuthContext)
    const cartContext = useContext(CartContext);
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    console.log(cartContext)

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
                <Box>
                    {authContext.user?
                        <SignOutButton/>
                     :
                        <Link to="/signin" className="clean-link">Sign In</Link>
                    }
                    <ShoppingCartIcon/>
                    <span sx={{verticalAlign: "top", margin: "0 0 -20 0"}}>{Object.keys(cartContext.cart).length}</span>
                </Box>
            </Toolbar>
        </AppBar>        
    )
}

export default Navbar