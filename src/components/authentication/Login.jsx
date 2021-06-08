import React from "react";
import googleIcon from "../../images/icons/google.svg";
// refresh token
import Button from "@material-ui/core/Button";

const Login = () => {
  return (
    <div class="light-bg signin-container">
      <Button color="primary">
        <span>Sign in with google</span>
        <img className="google-icon" src={googleIcon} alt="" />
      </Button>
    </div>
  );
};

export default Login;
