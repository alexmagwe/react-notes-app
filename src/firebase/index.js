import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
firebase.initializeApp({
        apiKey:process.env.REACT_APP_FIREBASE_APIKEY,
        authDomain:process.env.REACT_APP_FIREBASE_DOMAIN,
        databaseURL:process.env.REACT_APP_FIREBASE_DATABASEURL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
        storageBucket: process.env.REACT_APP_FIREBASE_PROJECTID,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,
        appId: process.env.REACT_APP_FIREBASE_APPID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
    }  

);
const storage = firebase.storage()
export { storage, firebase as default }