import React,{useState,useEffect} from 'react';
import './css/App.css';
import './css/landing.css';
import './css/notes.css'
import './css/upload.css'
import './css/search-modal.css'
import './css/contribute.css'
import './css/error.css'
import {Redirect,Switch,BrowserRouter as Router,Route} from 'react-router-dom'
import Navigation from './components/navigation'
import {Usercontext,Searchcontext,Loadingcontext,Datacontext} from './components/context'
import firebase from './firebase/index'
import Footer from './components/footer'
import Landing from './components/home/landing' 
// import Home from './components/home/Home' 
// import Login from './components/login'
import Contribute from './components/contribute/contribute'
import Upload from './components/upload/upload'
import About from './components/About'

// import AddUnits from './components/addunits'
import UpdateCourse from './components/home/UpdateCourse';
import axios from 'axios'
import ErrorPage from './components/errors/404';
import Support from './components/contribute/support';
import Loader from './components/Loader';

function App() {
    let [user,setUser]=useState({})
    let [data,setData] = useState({})
    let [loading,setLoading]=useState(true)
    let [course,setCourse]=useState({})
    let [updatecourse,setUpdatecourse]=useState(false)
    let [issignedin, setStatus]=useState(false)
    let [movetop,setMoveTop]=useState(false)
    const [loaderbg, setLoaderBackground] = useState('dark')
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
      <Loadingcontext.Provider value={{loading,setLoading,loaderbg, setLoaderBackground}}>
      <Usercontext.Provider value={{issignedin,results,setResults,setStatus,user,setUpdatecourse,updatecourse,course,setCourse}}>   
       <Searchcontext.Provider value={{selected,setSelected,movetop,setMoveTop}}>
        <Datacontext.Provider value={{data,setData}}>
        <div className="App">
          <Router>
        
              <Navigation/>
              <Loader bg={`${loaderbg}`}/>
            {updatecourse && issignedin?<UpdateCourse />:null}
            <Switch>
              <Route path='/contribute' exact component={Contribute}/>
               <Route path='/support' exact component={Support}/>
               <Route path='/' exact component={Landing}/>
                <Route path='/about' exact component={About}/>
              <Route path='/upload' exact component={Upload}/>
                <Route path='*' component={ErrorPage}/>


              {/* {issignedin?(<Route path='/home' exact component={Home}/>):(<Redirect from='/home' to='/'/>)}
              {!issignedin?(<Route path='/login' exact component={Login}/>):(<Redirect from='/login' to='/home'/>)} 
              <Route path='/upload' exact component={Upload}/>
              <Route path='/addunits' exact component={AddUnits}/>  */}
            </Switch>
            <Footer />
          </Router>
        </div>
        </Datacontext.Provider>
        </Searchcontext.Provider>
      </Usercontext.Provider>
    </Loadingcontext.Provider>);
 }

export default App;
