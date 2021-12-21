import { Typography, Paper, Grid, Button, TextField} from "@mui/material";
import {Box} from "@mui/system";
import {CartContext} from "../contexts/cartContext";
import {useContext, useState} from "react"
import {useLocation} from "react-router-dom"
import Navbar from "../components/Navigation/Navbar";
import api from "../configs/api"
import CenteredLoading from "../components/CenteredLoading"

function Checkout() {
    const [pixGenerated, setPixGenerated] = useState(false)
    const [pixLoading, setPixLoading] = useState(false)
    const [mercadoPago, setMercadoPago] = useState({})
    const cartContext = useContext(CartContext)
    const location = useLocation()


    let pixInfo = {
        transaction_amount: "1",
        description: "Título do produto",
        payment_method_id: "pix",
        payer: {
          email: "test@test.com",
          first_name: "Test",
          last_name: "User",
          identification: {
              type: "CPF",
              number: "19119119100"
          },
          address:  {
              zip_code: "06233200",
              street_name: "Av. das Nações Unidas",
              street_number: "3003",
              neighborhood: "Bonfim",
              city: "Osasco",
              federal_unit: "SP"
          }
          }
      }

    const handleClick = async () => {
        //pixInfo = {...pixInfo, transaction_amount: (cartContext.cart.reduce((a,b) => {return a+b.price}, 0) + location.state).toString()}
        console.log(pixInfo)
        setPixLoading(true)
        const response = await api.post("/checkout/pix", pixInfo)
        setMercadoPago(response.data)
        setPixLoading(false)
        setPixGenerated(true)
        
    }

    return(
        <>
            <Navbar/>
            <Paper sx={{my:2, width: "30vw", mx: "auto", p:2}}>
                <Grid container >
                    <Grid Item xs={12}>
                        <Typography variant="h5" color="#D32F7D" align="center">Transaction Information</Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent={"space-between"}>
                        <Typography variant="h6" color="#A56DFF">Items Cost</Typography>
                        <Typography variant="h6" >{`R$${cartContext.cart.reduce((a,b) => {
                                    return a+b.price
                                }, 0)}`}</Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent={"space-between"}>
                        <Typography variant="h6" color="#A56DFF">Freight Cost</Typography>
                        <Typography variant="h6" >{`R$${location.state}`}</Typography>
                    </Grid>
                    <Grid container sx={{backgroundColor:"#F5F5F5", py:2}} direction="row" justifyContent={"space-between"}>
                        <Typography variant="h5" color="#A56DFF">Total Cost</Typography>
                        <Typography variant="h5" >{`R$${cartContext.cart.reduce((a,b) => {
                                    return a+b.price
                                }, 0) + location.state}`}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        {pixLoading?
                        <CenteredLoading/>
                        :
                        <Button disabled={pixGenerated || pixLoading} onClick={handleClick} className="full-width" variant="contained">Generate Pix</Button>
                        }
                    </Grid>
                    <Grid sx={{py: 1}}>
                        {pixGenerated?
                            <>
                                <Typography align="center"> Order Generated, please pay using the following QR Code</Typography>
                                <img src={`data:image/jpeg;base64,${mercadoPago.body.point_of_interaction.transaction_data.qr_code_base64}`} className="full-width" alt="QR Code for payment"/>
                                <Typography align="center"> Or copy and paste the following code</Typography>
                                <Box className="flex-row-center">
                                    <TextField
                                        defaultValue={mercadoPago.body.point_of_interaction.transaction_data.qr_code}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    />
                                </Box>
                            </>
                        :
                            null
                        }
                    </Grid>
                
                </Grid>

            </Paper>
        </>
    )
}

export default Checkout