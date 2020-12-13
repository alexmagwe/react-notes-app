import React,{useState} from 'react';
import './css/App.css';
import './css/landing.css';
import './css/notes.css'
import './css/upload.css'
import './css/search-modal.css'
import './css/contribute.css'
import './css/error.css'
import {Switch,BrowserRouter as Router,Route} from 'react-router-dom'
import Navigation from './components/nav/navigation'
import {Searchcontext,Loadingcontext,Datacontext} from './context'
import Footer from './components/footer'
import Landing from './components/home/landing' 
// import Home from './components/home/Home' 
// import Login from './components/login'
import Contribute from './components/contribute/contribute'
import Upload from './components/upload/upload'
import About from './components/About'
// import AddUnits from './components/addunits'
import ErrorPage from './components/errors/404';
import Support from './components/contribute/support';
import Loader from './components/reusables/Loader';

function App() {
    let [data,setData] = useState({})
    let [loading,setLoading]=useState(true)
    let [movetop,setMoveTop]=useState(false)
    const [loaderbg, setLoaderBackground] = useState('dark')
    let [selected, setSelected] = useState({})


    return (
      <Loadingcontext.Provider value={{loading,setLoading,loaderbg, setLoaderBackground}}>
       <Searchcontext.Provider value={{selected,setSelected,movetop,setMoveTop}}>
        <Datacontext.Provider value={{data,setData}}>
        <div className="App">
          <Router>
        
              <Navigation/>
              <Loader bg={`${loaderbg}`}/>
  
            <Switch>
              <Route path='/contribute' exact component={Contribute}/>
               <Route path='/support' exact component={Support}/>
               <Route path='/' exact component={Landing}/>
                <Route path='/about' exact component={About}/>
              <Route path='/upload' exact component={Upload}/>
                <Route path='*' component={ErrorPage}/>
            </Switch>
            <Footer />
          </Router>
        </div>
        </Datacontext.Provider>
        </Searchcontext.Provider>
    </Loadingcontext.Provider>);
 }

export default App;
