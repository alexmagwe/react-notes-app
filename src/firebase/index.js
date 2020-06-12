import firebase from 'firebase/app'
import 'firebase/storage'

firebase.initializeApp({
        apiKey: "AIzaSyArSiJKrkZQHEJupRiHBDQCy4OBn3nLDBo",
        authDomain: "biblioteca-278611.firebaseapp.com",
        databaseURL: "https://biblioteca-278611.firebaseio.com",
        projectId: "biblioteca-278611",
        storageBucket: "biblioteca-278611.appspot.com",
        messagingSenderId: "206223867964",
        appId: "1:206223867964:web:e492cc35205e61d5aa0339",
        measurementId: "G-LQR9XD7KB5",
    }

);
const storage = firebase.storage()
export { storage as default }