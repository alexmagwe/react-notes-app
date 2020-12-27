import React, { useEffect, useState } from 'react';
import './css/App.css';
import './css/landing.css';
import './css/notes.css'
import './css/upload.css'
import './css/responsive.css'
import './css/unit.css'
import './css/search-modal.css'
import './css/contribute.css'
import './css/error.css'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './components/nav/navigation'
import { Searchcontext, Loadingcontext, Datacontext } from './context'
import Footer from './components/footer'
import Landing from './components/home/landing'
import { Redirect } from 'react-router'
// import Home from './components/home/Home' 
// import Login from './components/login'
import Contribute from './components/contribute/contribute'
import Upload from './components/upload/upload'
import About from './components/About'
import { isEmpty } from './helpers'

// import AddUnits from './components/addunits'
import ErrorPage from './components/errors/404';
import Support from './components/contribute/support';
import Loader from './components/reusables/Loader';
import Graphik from './components/Graphik';
import Unit from './components/unit/Unit';

function App() {
  let [data, setData] = useState({})
  let [loading, setLoading] = useState(true)
  let [movetop, setMoveTop] = useState(false)
  const [loaderbg, setLoaderBackground] = useState('dark')
  let [selected, setSelected] = useState({})

  return (
    <Loadingcontext.Provider value={{ loading, setLoading, loaderbg, setLoaderBackground }}>
      <Searchcontext.Provider value={{ selected, setSelected, movetop, setMoveTop }}>
        <Datacontext.Provider value={{ data, setData }}>
          <div className="App">
            <Router>

              <Navigation />
              <Loader bg={`${loaderbg}`} />
              {!isEmpty(selected) ? <Redirect to={`/unit/${selected.code}`} /> : null}


              <Switch>
                <Route path='/contribute' exact component={Contribute} />
                <Route path='/unit/:code' component={Unit} />
                <Route path='/support' exact component={Support} />
                <Route path='/' exact component={Landing} />
                <Route path='/about' exact component={About} />
                <Route path='/upload' exact component={Upload} />
                <Route path='*' component={ErrorPage} />
              </Switch>
              <Graphik />

              <Footer />
            </Router>
          </div>
        </Datacontext.Provider>
      </Searchcontext.Provider>
    </Loadingcontext.Provider>);
}

export default App;
