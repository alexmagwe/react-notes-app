import React, { useState, useEffect } from 'react'
import './css/App.css'
import './css/landing.css'
import './css/notes.css'
import './css/upload.css'
import './css/responsive.css'
import './css/unit.css'
import './css/search-modal.css'
import './css/contribute.css'
import './css/error.css'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './components/nav/navigation'
import {
  Searchcontext,
  Loadingcontext,
  Datacontext,
  Themecontext
} from './context'
import Footer from './components/footer'
import Landing from './components/home/landing'
import { Redirect } from 'react-router'
// import Home from './components/home/Home'
// import Login from './components/login'
import Contribute from './components/contribute/contribute'
import Upload from './components/upload/upload'
import About from './components/About'
import { isEmpty, getLocalData, setLocalData } from './helpers'
import axios from 'axios'
import { allUnitsUrl } from './components/api/urls'
// import AddUnits from './components/addunits'
import ErrorPage from './components/errors/404'
import Support from './components/contribute/support'
import Loader from './components/reusables/Loader'
import Graphik from './components/Graphik'
import Unit from './components/unit/Unit'
function App () {
  let [data, setData] = useState({})
  let [loading, setLoading] = useState(true)
  let [movetop, setMoveTop] = useState(false)
  const [loaderbg, setLoaderBackground] = useState('dark')
  let [selected, setSelected] = useState({})
  const [expiry] = useState(72) //expiry time of data in terms of hours
  const [lighttheme, setLightTheme] = useState(false)
  const [recent,setRecent]=useState({})

  useEffect(() => {
    setRecent(getLocalData('recent'))
    if (isEmpty(data)) {
      setLoading(true)
      const localdata = getLocalData('units')
      if (localdata) {
        setData(localdata)
        setLoading(false)
      } else {
        axios.get(allUnitsUrl).then(resp => {
          setData(resp.data)
          setLocalData('units', { units: resp.data }, expiry)
          setLoading(false)
        })
      }
    }
  }, [data, expiry])
  return (
    <Loadingcontext.Provider
      value={{ loading, setLoading, loaderbg, setLoaderBackground }}
    >
      <Themecontext.Provider value={{ lighttheme, setLightTheme }}>
        <Searchcontext.Provider
          value={{ selected, setSelected, movetop, setMoveTop }}
        >
          <Datacontext.Provider value={{ data, setData ,recent,setRecent}}>
            <div className='App'>
              <Router>
                <Navigation />
                <Loader bg={`${loaderbg}`} />
                {!isEmpty(selected) ? (
                  <Redirect to={`/unit/${selected.code}`} />
                ) : null}

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
