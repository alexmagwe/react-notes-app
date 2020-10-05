import React,{useState,useEffect} from 'react';
import './css/App.css';
import './css/landing.css';
import './css/notes.css'
import './css/search-modal.css'
import {Redirect,Switch,BrowserRouter as Router,Route} from 'react-router-dom'
import Navigation from './components/navigation'
import {Usercontext,Searchcontext,Loadingcontext} from './components/context'
import firebase from './firebase/index'
// import { TransverseLoading } from 'react-loadingg';
import { CircleToBlockLoading } from 'react-loadingg';
import Landing from './components/home/landing' 
// import Home from './components/home/Home' 
// import Login from './components/login'
// import Contribute from './components/contribute'
import About from './components/About'
// import AddUnits from './components/addunits'
import UpdateCourse from './components/home/UpdateCourse';
import axios from 'axios'

function App() {  
    let [user,setUser]=useState({})
    let [units, setUnits] = useState([])
    let [loading,setLoading]=useState(true)
    let [course,setCourse]=useState({})
    let [updatecourse,setUpdatecourse]=useState(false)
    let [issignedin, setStatus]=useState(false)
    let [selected, setSelected] = useState({})

    const [results, setResults] = useState([])

    useEffect(()=>{ firebase.auth().onAuthStateChanged(u=> {  
      if (u){
        console.log('runnig if')
        setUser({"email":u.email,"name":u.displayName,"photo":u.photoURL});
        setStatus(true);
      return <Redirect to='/home'/>
        }
        
      else{
        console.log('runnig ELSE')
        setUser({})
        setCourse({})
    }
  })},[])
  //runs third after user has been set  
    useEffect(()=>{
      if (user.email){
        let data={"email":user.email}
        let c=JSON.parse(localStorage.getItem('course'))
        if (c){
          setCourse(c)
        }
        else{
          axios.post('/api/course/details',data).then(res=>{console.log('response',res.data);
            if  (res.data.code){
              localStorage.setItem('course',JSON.stringify(res.data))
              setCourse({"name":res.data.name,"code":res.data.code})
              setLoading(false)
            }
            else{
              setUpdatecourse(true)
              setLoading(false)
            }
              })
          .catch(err=>alert(err));
          }
    
        }
    },[user])


    return (
      <Loadingcontext.Provider value={{loading,setLoading}}>
      <Usercontext.Provider value={{issignedin,results,setResults,setStatus,user,setUpdatecourse,updatecourse,course,setCourse,units,setUnits}}>   
       <Searchcontext.Provider value={{selected,setSelected}}>
        <div className="App">
          <Router>
        
              <Navigation/>
                <div className={loading?"loading dark-loading":"loading loading-closed"}>
             <CircleToBlockLoading/></div>
            {updatecourse && issignedin?<UpdateCourse />:null}
            <Switch>
              {/* <Route path='/contribute' exact component={Contribute}/> */}
               <Route path='/' exact component={Landing}/>
                <Route path='/about' exact component={About}/>

              {/* {issignedin?(<Route path='/home' exact component={Home}/>):(<Redirect from='/home' to='/'/>)}
              {!issignedin?(<Route path='/login' exact component={Login}/>):(<Redirect from='/login' to='/home'/>)} 
              <Route path='/upload' exact component={Upload}/>
              <Route path='/addunits' exact component={AddUnits}/>  */}
            </Switch>
          </Router>
        </div>
        </Searchcontext.Provider>
      </Usercontext.Provider>
    </Loadingcontext.Provider>);
 }

export default App;
