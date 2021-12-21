
import {useMediaQuery, useTheme} from "@material-ui/core"
import {Typography, SwipeableDrawer, List, Button, Paper, Grid} from "@mui/material";
import {Box} from "@mui/system"
import {CartContext} from "../../contexts/cartContext";
import {AuthContext} from "../../contexts/authContext";
import {useContext} from "react";
import moment from "moment"
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom"

function CartDrawer(props) {
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
    const cartContext = useContext(CartContext)
    const authContext = useContext(AuthContext)

    const handleClick = (e) => {
        let aux = cartContext.cart
        aux = aux.filter(item => item._id !== e.currentTarget.id)
        cartContext.setCart(aux)
        localStorage.setItem(
            "boomerangCart",
            JSON.stringify(aux)
        );
    } 

    return(
        <SwipeableDrawer
        open = {props.state}
        anchor = "right"
        onClose = {props.handleClick}
        onOpen={props.handleClick}
    > 
        <Box
            role="presentation"
            sx={{width: isSmallScreen ? "50vw" : "20vw"  }}
        >
            <List>
                {  cartContext.cart.map(item=> {
                        return(
                            <Paper key={item._id}>
                                <Grid container sx={{m:1}}>
                                    <Grid item xs={12}>
                                        <Typography sx={{fontWeight: "bold"}}>{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <img
                                            src={item.img}
                                            width="100%"
                                            alt={item.name}
                                        />
                                    </Grid>
                                    <Grid container xs={5} direction="column" justifyContent="center">
                                        <Typography>{moment(item.startDate).format("DD/MM/YYYY")}</Typography>
                                        <Typography>{moment(item.endDate).format("DD/MM/YYYY")}</Typography>
                                        <Typography>{`Price: R$${item.price}`}</Typography>
                                    </Grid>
                                    <Grid container justifyContent="center" xs={2}>
                                        <Button id = {item._id} onClick={handleClick} > <DeleteIcon color="primary"/> </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    })

                }
            </List>
            <Grid container justifyContent={"space-around"}>
                <Button onClick={cartContext.clearCart} variant="outlined">Clear Cart</Button>
                {authContext.user?
                    
                    <Link to = "/cart" className="clean-link" color="#F5F5F5" > 
                        <Button variant="contained">Go to Cart</Button>
                    </Link>
                    :
                    <Link to = "/signin" className="clean-link" color="#F5F5F5"> 
                        <Button variant="contained">Sign In</Button>
                    </Link>
                }    
            </Grid>
        </Box>
    </SwipeableDrawer>
    )
}

export default CartDrawer