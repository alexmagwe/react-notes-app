import React,{useState,useEffect} from 'react';
import './App.css';
import {Redirect,Switch,BrowserRouter as Router,Route} from 'react-router-dom'
import Navigation from './components/navigation'
import Usercontext from './components/context'
import firebase from './firebase/index'
// import 'firebase/auth'
import Upload from './components/upload'
import Home from './components/home' 
// import useCourse
import Login from './components/login'
import Contribute from './components/contribute'
import AddUnits from './components/addunits'
import UpdateCourse from './components/UpdateCourse';
import axios from 'axios'
function App() {  
  let [user,setUser]=useState("")
  let [course,setCourse]=useState('')
  let [updatecourse,setUpdatecourse]=useState(true)
  let [issignedin, setStatus]=useState(false)
  const users=[{email:"alexmagwe@gmail.com",course:"Btech"}]
useEffect(()=>{
  if (course!=="" && course){
    setUpdatecourse(false);}
    console.log('coursename:',course);
},[course]
)
const getcourse=(em)=>{
  return new Promise((resolve,reject)=>{const userobj=users.find(u => {return u.email===em;})
  if (userobj){
   resolve(userobj.course);}
   else{reject()}
  
  }) 
}
useEffect(()=>{
	if (user){
	let data={"email":user}
axios.post('/course_details',data).then(res=>{console.log('response',res.data);setCourse(res.data.course)}).catch(err=>console.error(err));
	}},[user])
    useEffect(()=>{ firebase.auth().onAuthStateChanged(u=> {
      if (u){
      // console.log('user islogged in')
        setUser(u.email);
        setStatus(true);
      // getcourse(u.email).then(resp=>{
        //  setCourse(resp);
        // }).catch(err=>{ if (err===undefined){
       // setUpdatecourse(true);}})
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
  <Usercontext.Provider value={{issignedin,setStatus,user}}>   
     <div className="App">
       <Router>
         <Navigation/>
        {updatecourse && issignedin?<UpdateCourse/>:null}
         <Switch>
         <Route path='/contribute' exact component={Contribute}/>
         {issignedin?(<Redirect from='/login' to='/home'/>):(<Route path='/login' exact component={Login}/>)}
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
