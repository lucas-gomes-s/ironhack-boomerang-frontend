
import {useMediaQuery, useTheme} from "@material-ui/core"
import {Typography, SwipeableDrawer, List, Button, Paper} from "@mui/material";
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
        console.log(aux)
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
                            <Typography>{item.name}</Typography>
                            <Typography>{moment(item.startDate).format("DD/MM/YYYY")}</Typography>
                            <Typography>{moment(item.endDate).format("DD/MM/YYYY")}</Typography>
                            <Typography>{`R$${item.price}`}</Typography>
                            <Button id = {item._id} onClick={handleClick} > <DeleteIcon color="primary"/> </Button>
                            </Paper>
                        )
                    })

                }
            </List>
            <Button onClick={cartContext.clearCart}>Clear Cart</Button>
            {authContext.user?
                <Link to = "/cart" className="clean-link" color="#F5F5F5"> Go to Cart</Link>
                :
                <Link to = "/signin" className="clean-link" color="#F5F5F5"> Sign in</Link>
            }    
        </Box>
    </SwipeableDrawer>
    )
}

export default CartDrawer