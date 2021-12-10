import uiConfig from "../configs/firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { AppBar, Toolbar, Typography } from "@mui/material";


function Signin() {
    return (
        <div>
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography>
                    Boomerang
                </Typography>
            </Toolbar>
        </AppBar>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}

export default Signin