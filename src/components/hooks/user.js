import { useState } from "react"
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'
import { refreshTokenSetup } from '../../helpers';

const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID
export const useAuth = () => {
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [course, setCourse] = useState("")
    const [role, setRole] = useState("")

    const onLoginSuccess = (res) => {
        console.log("logged in succesfully")
        setUser(res.profileObj)
        setLoggedIn(true)
        console.log(res.profileObj)
        refreshTokenSetup(res)
    }
    const onLogoutSuccess = () => {
        console.log("logged out succesfully")
    }
    const onFailure = (res) => {
        alert('login failed:', res.error)

    }

    const { signIn } = useGoogleLogin({
        clientId,
        onSuccess: onLoginSuccess,
        onFailure,
        isSignedIn: true
    })
    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure


    })
    const updateCourse = () => {

    }


    return { signIn, signOut, updateCourse }

}
