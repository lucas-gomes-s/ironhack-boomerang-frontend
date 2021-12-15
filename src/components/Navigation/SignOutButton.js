import { getAuth, signOut } from "firebase/auth";
import {Button} from "@mui/material";

function SignOutButton() {
    
    const auth = getAuth();


    const onClick = () => {
        signOut(auth)
        .then(() => {
        })
        .catch((error) => {
        });
    }


    return (
        <Button onClick={onClick} color="secondary">
            Log Out
        </Button>
    )
}

export default SignOutButton