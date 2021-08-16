import { useState, useEffect } from "react"
import { refreshTokenSetup } from '../../helpers';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'

const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID
export const useAuth = () => {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [userObj, setUserObj] = useState({})
    const [token, setToken] = useState("")
    useEffect(() => {
        console.log("auth log in value:", isLoggedIn
        )
    }, [isLoggedIn]);
    const onLoginSuccess = (res) => {
        setUserObj(res.profileObj)
        setLoggedIn(true)
        setToken(res.tokenId)
        console.log(res.profileObj)
        refreshTokenSetup(res)
    }
    const onLogoutSuccess = () => {
        setLoggedIn(false)
        console.log("logged out succesfully")
        setUserObj({})


    }
    const onFailure = (res) => {
        console.log('error occured:', res.error)
    }

    useGoogleLogin({
        clientId,
        onSuccess: onLoginSuccess,
        onFailure,
        isSignedIn: true
    })
    useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure


    })


    return { onLoginSuccess, onLogoutSuccess, onFailure, isLoggedIn, userObj, token }

}
