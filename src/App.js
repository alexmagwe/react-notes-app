import React, { useState, useEffect } from 'react'
import './css/App.css'
import './css/landing.css'
import './css/notes.css'
import './css/upload.css'
import './css/responsive.css'
import './css/forms.css'
import './css/unit.css'
import './css/search-modal.css'
import './css/contribute.css'
import './css/error.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './components/nav/navigation'
import { AnimatedSwitch } from 'react-router-transition';

import {
  Searchcontext,
  Loadingcontext,
  Datacontext,
  Themecontext
} from './context'
import Footer from './components/footer'
import Landing from './components/home/landing'
import { Redirect } from 'react-router'
import { useBeforeunload } from 'react-beforeunload';

// import Home from './components/home/Home'
// import Login from './components/login'
import Contribute from './components/contribute/contribute'
import Upload from './components/upload/upload'
import About from './components/About'
import { isEmpty, getLocalData, setLocalData, recent } from './helpers'
import axios from 'axios'
import { allUnitsUrl } from './components/api/urls'
// import AddUnits from './components/addunits'
import ErrorPage from './components/errors/404'
import Contact from './components/contribute/Contact'
import Loader from './components/reusables/Loader'
import Graphik from './components/Graphik'
import { useLocalData } from './components/hooks'
import Unit from './components/unit/Unit'
function App() {
  let [data, setData] = useState({})
  let [loading, setLoading] = useState(true)
  let [movetop, setMoveTop] = useState(false)
  const [loaderbg, setLoaderBackground] = useState('dark')
  let [selected, setSelected] = useState({})
  const [expiry] = useState(72) //expiry time of data in terms of hours
  const [lighttheme, setLightTheme] = useState(false)
  const [recentunits, setRecent] = useState(null)
  const { updateRecent } = useLocalData({ recentunits, setRecent })
  useBeforeunload((event) => {
    // event.preventDefault()
    setLocalData(recent, recentunits)
  })
    ;

  //enables changing of background image depending on the page you are on
  useEffect(() => {
    let Background = {
      backgroundImage: `linear-gradient(#0002, #0002), url(${bgImage})`,
    }
    setBg(Background)
  }, [bgImage, setBg,])
  //fetches and stores unit data in local storage 
  useEffect(() => {
    if (getLocalData(recent)) {
      localStorage.removeItem('recent')
    }
    if (getLocalData('data')) {
      localStorage.removeItem('data')
    }
    setRecent(getLocalData(recent))
    if (isEmpty(data)) {
      setLoading(true)
      const localdata = getLocalData('units')//get data from local storage
      if (localdata) {
        setData(localdata)
        setLoading(false)
      } else {
        axios.get(allUnitsUrl).then(resp => {
          setData(resp.data)
          setLocalData('units', { units: resp.data }, expiry)//expiry is a limit  to time how old the data can get before we refresh 
          setLoading(false)
        })
      }
    }
  }, [data, expiry])

  return (
    <Loadingcontext.Provider
      value={{ loading, setLoading, loaderbg, setLoaderBackground }}
    >
      <Themecontext.Provider value={{ lighttheme, setLightTheme, bgImage, setBgImage }}>
        <Searchcontext.Provider
          value={{ selected, setSelected, movetop, setMoveTop }}
        >
          <Datacontext.Provider value={{ data, setData, recentunits, setRecent, updateRecent }}>
            <div className='App'>
              <Router>

                <Navigation />
                <Loader bg={`${loaderbg}`} />
                {!isEmpty(selected) ? (
                  <Redirect to={`/unit/${selected.code}`} />
                ) : null}

                <AnimatedSwitch
                  atEnter={{ opacity: 0 }}
                  atLeave={{ opacity: 0 }}
                  atActive={{ opacity: 1 }}
                  className="switch-wrapper"
                >
                  <Route path='/contribute' exact component={Contribute} />
                  <Route path='/unit/:code' component={Unit} />
                  <Route path='/support' exact component={Support} />
                  <Route path='/' exact component={Landing} />
                  <Route path='/about' exact component={About} />
                  <Route path='/upload' exact component={Upload} />
                  <Route path='*' component={ErrorPage} />
                </AnimatedSwitch>
                <Graphik />

                {/* </Navigation> */}
              </Router>
              <Footer />
            </div>
          </Datacontext.Provider>
        </Searchcontext.Provider>
      </Themecontext.Provider>
    </Loadingcontext.Provider>
  )
}

export default App
