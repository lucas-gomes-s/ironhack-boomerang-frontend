import {uiConfig} from "../configs/firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import Navbar from "../components/Navigation/Navbar"


function Signin() {
    return (
        <div>
            <Navbar/>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}

export default Signin