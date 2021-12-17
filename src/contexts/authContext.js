import { createContext, useState, useEffect } from "react";
import {app} from "../configs/firebase"
import api from "../configs/api"

const AuthContext = createContext({})

function AuthContextProvider(props) {
    const [user, setUser] = useState({});
    //const [loadingAuthState, setLoadingAuthState] = useState(true);

    useEffect(()=>{
        app.auth().onAuthStateChanged(async (user)=> {
            setUser(user);
            if (user) {
                let dbUser = await api.get(`/user?firebase=${user.uid}`)
                if (dbUser.data.length === 0) {
                    let newUser = await api.post(`/user`, {
                        firebaseId: user.uid
                    })
                    setUser({...user.auth.currentUser, ...newUser.data})
                    console.log({...user.auth.currentUser, ...newUser.data})

                } 
                else {
                    setUser({...user.auth.currentUser, ...dbUser.data[0]})
                    console.log({...user.auth.currentUser, ...dbUser.data[0]})
                }
            }
        })
    }, [])

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthContextProvider}