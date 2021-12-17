import {uiConfig} from "../configs/firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import Navbar from "../components/Navigation/Navbar"
import { Typography } from "@mui/material";
import { Box } from "@mui/system";


function Signin() {
    return (
        <>
            <Navbar/>
            <Box sx={{width:"30%", height: "50vh", mx:"auto", py:2, my:2}} className="bgc-0">
                <Typography variant="h5" color="#D32F7D" align="center"> Choose a Sign-in/Sing-up option</Typography>
                <Box sx={{my: "auto"}}>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </Box>
            </Box>
        </>
    )
}

export default Signin