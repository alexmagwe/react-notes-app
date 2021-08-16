import React, { useEffect, useContext } from "react";
import { GoogleLogin } from 'react-google-login';
import { Authcontext } from '../../context'

const Login = (props) => {

  const { onLoginSuccess, onFailure, isLoggedIn } = useContext(Authcontext)
  useEffect(() => {
    if (isLoggedIn) {
      props.history.goBack()

    }

  }, [isLoggedIn, props.history]);
  return (
    <div className="light-bg container">
      <GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={onLoginSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;
