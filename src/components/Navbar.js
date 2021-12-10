import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../imgs/logo_02.png"

function Navbar() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <img 
                    src= {logo}
                    alt = "Logo Boomerang"
                    style={{height: "3rem"}}
                />
            </Toolbar>
        </AppBar>        
    )
}

export default Navbar