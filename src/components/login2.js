import React, { useContext, useEffect } from 'react';
import firebase from '../firebase';
import Usercontext from './context';
const Login = () => {
    let { issignedin, setStatus, user } = useContext(Usercontext)
    let styles = {
        backgroundcolor: '#eee',
        font: { "fontFamily": "Lato" }
    }
    let signInHandler = () => {
        let provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('profile')
        provider.addScope('email')
        firebase.auth().signInWithPopup(provider).then(result => {
            console.log(result.user)
            setStatus(true);

        }).catch(e => {
            console.log(e)
        })
    }
    return ( <
        div >

        {
            issignedin || user.email ? ( < h1 > welcome { user.displayName } < /h1>):(<><h2 style={styles.font}>login</h
                2 >
                <
                div >
                <
                button onClick = { signInHandler } > Sign in with Google < /button> <
                /div></ > )
        }

        <
        /div>
    );
};



export default Login;