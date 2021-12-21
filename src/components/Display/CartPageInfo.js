import { Typography, Paper, Grid, Button} from "@mui/material";
import {Box} from "@mui/system";
import moment from "moment";
import {Link} from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import {useMediaQuery, useTheme} from "@material-ui/core"





function CartPageInfo(props) {
    
    const isSmallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));


    return (
        isSmallScreen ?
                
            <Paper sx={{my: 2, p: 2}} style={{maxHeight: "50vh"}} key={props.item._id}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="h5">{props.item.name}</Typography>
                        <Typography>
                                {Object.keys(props.item.filteredVariant[0].specification).map(spec => {
                                    return (
                                        `${spec} : ${props.item.filteredVariant[0].specification[spec]} `
                                    )
                                })}
                            </Typography>
                            <Typography>
                                Rented by {props.item.stores[0].name}
                            </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{display: "flex", alignItems: "center"}}>
                        <Button id = {props.item._id} onClick={props.handleClick} > <DeleteIcon color="primary" sx={{fontSize: "2rem"}}/> </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to = {`/product/${props.item._id}`} >
                            <img 
                                src={props.item.img}
                                className="img-contain"
                                style={{maxWidth: "100%"}}
                                alt={props.item.name}
                            />
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>From: {moment(props.item.startDate, "YYYY-MM-DD").format("DD/MM/YYYY")}</Typography>
                        <Typography>To: {moment(props.item.endDate, "YYYY-MM-DD").format("DD/MM/YYYY")}</Typography>
                    </Grid>
                    <Grid className="flex-row-center">
                        <Typography color="primary" variant = "h6" >
                                {moment(props.item.endDate, "YYYY-MM-DD").diff(moment(props.item.startDate, "YYYY-MM-DD"), "days")} days X R${props.item.price/moment(props.item.endDate, "YYYY-MM-DD").diff(moment(props.item.startDate, "YYYY-MM-DD"), "days")} a day = R${props.item.price}
                        </Typography>
                    </Grid>


                </Grid>
            </Paper>

        :

            <Paper sx={{my: 2, p: 2}} style={{maxHeight: "30vh"}} key={props.item._id}>
                <Grid container spacing={2} className="flex-row between">
                    <Grid item xs={2}>
                        <Link to = {`/product/${props.item._id}`} >
                            <img 
                                src={props.item.img}
                                className="img-contain"
                                style={{maxWidth: "100%"}}
                                alt={props.item.name}
                            />
                        </Link>
                    </Grid>
                    <Grid item xs={5} sx={{display: "flex", flexDirection:"column", justifyContent:"space-around"}} >
                        <Box>
                            <Typography variant="h5">{props.item.name}</Typography>
                            <Typography>
                                {Object.keys(props.item.filteredVariant[0].specification).map(spec => {
                                    return (
                                        `${spec} : ${props.item.filteredVariant[0].specification[spec]} `
                                    )
                                })}
                            </Typography>
                            <Typography>
                                Rented by {props.item.stores[0].name}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>From: {moment(props.item.startDate, "YYYY-MM-DD").format("DD/MM/YYYY")}</Typography>
                            <Typography>To: {moment(props.item.endDate, "YYYY-MM-DD").format("DD/MM/YYYY")}</Typography>
                        </Box>            
                    </Grid>
                    <Grid className="flex-row-center">
                        <Typography color="primary" variant = "h5" >
                                {moment(props.item.endDate, "YYYY-MM-DD").diff(moment(props.item.startDate, "YYYY-MM-DD"), "days")} days X R${props.item.price/moment(props.item.endDate, "YYYY-MM-DD").diff(moment(props.item.startDate, "YYYY-MM-DD"), "days")} a day = R${props.item.price}
                        </Typography>
                    </Grid>
                    <Grid sx={{display: "flex", alignItems: "center"}}>
                        <Button id = {props.item._id} onClick={props.handleClick} > <DeleteIcon color="primary" sx={{fontSize: "3rem"}}/> </Button>
                    </Grid>
                </Grid>
            </Paper>
        
    )
}

export default CartPageInfo