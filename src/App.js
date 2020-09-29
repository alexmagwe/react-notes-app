import React,{useState,useEffect} from 'react';
import './css/App.css';
import './css/home.css';

import {Redirect,Switch,BrowserRouter as Router,Route} from 'react-router-dom'
import Navigation from './components/navigation'
import Usercontext from './components/context'
import firebase from './firebase/index'
// import 'firebase/auth'
import Upload from './components/upload'
import Home from './components/home/home' 
// import useCourse
import Login from './components/login'
import Contribute from './components/contribute'
import AddUnits from './components/addunits'
import UpdateCourse from './components/home/UpdateCourse';
import axios from 'axios'
function App() {  
  let [user,setUser]=useState("")
  let [course,setCourse]=useState({})
  let [updatecourse,setUpdatecourse]=useState(true)
  let [issignedin, setStatus]=useState(false)
  // const users=[{email:"alexmagwe@gmail.com",course:"Btech"}]

const updateServer=()=>{
  let data={"email":user.email,"course_code":course.code}
  console.log(user)
  axios.post('add/mycourse',data).then(res=>console.log(res.data)).catch(err=>console.log(err))
}
  useEffect(()=>{
  if (course!=="" && course.name){
    setUpdatecourse(false);}
    updateServer()
},[course]
)

// const getcourse=(em)=>{
//   return new Promise((resolve,reject)=>{const userobj=users.find(u => {return u.email===em;})
//   if (userobj){
//    resolve(userobj.course);}
//    else{reject()}
  
//   }) 
// }
// runs after user has been set  
useEffect(()=>{
	if (user.email){
	  let data={"email":user.email}
    axios.post('/course/details',data).then(res=>{console.log('response',res.data);if (res.data.name){ setCourse({"name":res.data.name,"code":res.data.code})}}).catch(err=>console.alert(err));
  }},[user])
// runs when oauth is succesful
  useEffect(()=>{ firebase.auth().onAuthStateChanged(u=> {
    if (u.uid){
     setUser({"email":u.email,"name":u.displayName,"photo":u.photoURL});
     setStatus(true);
     return <Redirect to='/home'/>
      }
      
    else{
      console.log('status is signed out')
      setUser('')
      setCourse('')
      setUpdatecourse(true)
  }
 })},[issignedin])
 
  return (
  <Usercontext.Provider value={{issignedin,setStatus,user,course,setCourse}}>   
     <div className="App">
       <Router>
         <Navigation/>
        {updatecourse && issignedin?<UpdateCourse/>:null}
         <Switch>
         <Route path='/contribute' exact component={Contribute}/>
         {issignedin?(<Redirect from='/login' to='/home'/>):(<Route path='/login' exact component={Login}/>)}
         <Route path='/' exact component={Home}/>
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
