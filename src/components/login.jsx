import React,{useContext} from 'react';
import firebase from '../firebase/index';
import {Usercontext} from './context';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router';
const Login = () => {
let {issignedin,setStatus,user}=useContext(Usercontext)
const uiConfig={
    signinFlow:'popup',
    signInOptions:[
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks:{signInSuccessWithAuthResult:()=>{
        setStatus(true);
        return <Redirect to ="/home"/>;}}

    }
        let styles={
        font:{"fontFamily":"Roboto"},
        text:{
            fontFamily:'Alata,sans-serif',
        textAlign:'center'        
            }
        }

return (
        <div className='login-container'>
        {issignedin || user.email?(<h1>welcome {user.displayName}</h1>):(<><h2 style={styles.text}>Login</h2>
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    </>)}
            
        </div>
    );


};
export default Login;
