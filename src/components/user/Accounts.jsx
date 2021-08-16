import { Container } from '@material-ui/core';
import React, { useContext } from 'react'
import { Usercontext, Authcontext } from './../../context';
import { GoogleLogout } from 'react-google-login';
function Accounts() {
    let { userEmail, userProfilePic, userName, userCourse, userRole } = useContext(Usercontext)
    const { onLogoutSuccess, onFailure } = useContext(Authcontext)

    return (
        userEmail.length > 0 ? (<Container>
            <section>
                <img src={userProfilePic} alt=""></img>
                <h3>
                    {userName}
                </h3>
                <h2>
                    {userCourse}
                </h2>
                <h4>
                    {userEmail}
                </h4>
            </section>

            <GoogleLogout
                clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={onLogoutSuccess}
                onFailure={onFailure}
            ></GoogleLogout>

        </Container>
        ) : <h1>Loading...</h1>
    )
}

export default Accounts