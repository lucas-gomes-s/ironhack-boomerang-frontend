import { createContext, useState, useEffect } from "react";
import {app} from "../configs/firebase"

const AuthContext = createContext({})

function AuthContextProvider(props) {
    const [user, setUser] = useState({});
    //const [loadingAuthState, setLoadingAuthState] = useState(true);

    useEffect(()=>{
        app.auth().onAuthStateChanged((user)=> {
            setUser(user);
        })
    }, [])

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthContextProvider}