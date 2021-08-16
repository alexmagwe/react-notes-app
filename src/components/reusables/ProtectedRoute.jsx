import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { Authcontext } from '../../context'

function ProtectedRoute({ component: Component, path, history, ...otherProps }) {
    const { isLoggedIn: isAuthenticated } = useContext(Authcontext)
    console.log("props", path)
    return (
        <Route
            {...otherProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            } />
    )


}

export default ProtectedRoute
