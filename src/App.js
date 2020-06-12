import React,{useState,useEffect} from 'react';
import './App.css';
import {Redirect,Switch,BrowserRouter as Router,Route} from 'react-router-dom'
import Navigation from './components/navigation'
import Usercontext from './components/context'
import firebase from 'firebase/app'
import 'firebase/auth'
import Upload from './components/upload'
import Home from './components/home' 
import Login from './components/login'
import Contribute from './components/contribute'
import AddUnits from './components/addunits'
function App() {  
  let [user,setUser]=useState({})
  let [issignedin, setStatus]=useState(false)

    useEffect(()=>{ firebase.auth().onAuthStateChanged(u=> {
    if (u){
      console.log('user islogged in')
       setUser(u)
      return <Redirect to='/home'/>
    }
    else{
      console.log('status is signed out')
      setUser({})
}

 })},[issignedin])
 
  return (
  <Usercontext.Provider value={{issignedin,setStatus,user}}>   
     <div className="App">
       <Router>
         <Navigation/>
         <Switch>
         <Route path='/contribute' exact component={Contribute}/>
         <Route path='/login' exact component={Login}/>
         <Route path='/home' exact component={Home}/>
         <Route path='/upload' exact component={Upload}/>
         <Route path='/addunits' exact component={AddUnits}/>

         </Switch>
         </Router>
      </div>
  </Usercontext.Provider>
);
}

export default App;
