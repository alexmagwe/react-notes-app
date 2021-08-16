import React, { useState, useEffect } from "react";
import "./css/App.css";
import "./css/landing.css";
import "./css/notes.css";
import "./css/upload.css";
import "./css/responsive.css";
import "./css/forms.css";
import "./css/unit.css";
import "./css/search-modal.css";
import "./css/contribute.css";
import "./css/error.css";
import "./css/auth.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/nav/navigation";
import { AnimatedSwitch } from "react-router-transition";

import {
  Searchcontext,
  SearchQuerycontext,
  Loadingcontext,
  Datacontext,
  Themecontext,
  Alertcontext,
  Authcontext,
  Usercontext,
} from "./context";
import Footer from "./components/footer";
import Landing from "./components/home/landing";
import { Redirect } from "react-router";
import { useBeforeunload } from "react-beforeunload";

// import Home from './components/home/Home'
import Contribute from "./components/contribute/contribute";
import Upload from "./components/upload/upload";
import About from "./components/About";
import Alertbox from "./components/Alert";
import { isEmpty, getLocalData, setLocalData, recent } from "./helpers";
import axios from "axios";
import { allUnitsUrl } from "./components/api/urls";
// import AddUnits from './components/addunits'
import ErrorPage from "./components/errors/404";
import Contact from "./components/contribute/Contact";
import Loader from "./components/reusables/Loader";
// import Graphik from "./components/Graphik";
import { useLocalData } from "./components/hooks";
import Unit from "./components/unit/Unit";
import Content from "./components/contribute/Content";
import AddVideos from "./components/contribute/AddVideo";
import Login from "./components/authentication/Login";
import { useAuth } from './components/hooks/auth';
import { useUser } from './components/hooks/user';
import Accounts from "./components/user/Accounts"
import ProtectedRoute from './components/reusables/ProtectedRoute';

function App() {
  let [data, setData] = useState({});
  let [loading, setLoading] = useState(true);
  let [movetop, setMoveTop] = useState(false);
  const [filteredNotes, setfilteredNotes] = useState([]);
  const [loaderbg, setLoaderBackground] = useState("dark");
  let [selected, setSelected] = useState({});
  const [expiry] = useState(72); //expiry time of data in terms of hours
  const [lighttheme, setLightTheme] = useState(false);
  const [recentunits, setRecent] = useState(null);
  const { updateRecent } = useLocalData({ recentunits, setRecent });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [showAlert, setshowAlert] = useState(false);


  const { onLoginSuccess, onLogoutSuccess, onFailure, isLoggedIn, userObj, token } = useAuth()
  const { userName, userProfilePic, userCourse, userRole, userEmail, updateUserInfo, courseMissing, getUserDetails } = useUser()

  useBeforeunload((event) => {
    // event.preventDefault()
    setLocalData(recent, recentunits);
  });

  //fetches and stores unit data in local storage
  useEffect(() => {
    if (getLocalData(recent)) {
      localStorage.removeItem("recent");
    }
    if (getLocalData("data")) {
      localStorage.removeItem("data");
    }
    setRecent(getLocalData(recent));
    if (isEmpty(data)) {
      setLoading(true);
      const localdata = getLocalData("units"); //get data from local storage
      if (localdata) {
        setData(localdata);
        setLoading(false);
      } else {
        axios.get(allUnitsUrl).then((resp) => {
          setData(resp.data);
          setLocalData("units", { units: resp.data }, expiry); //expiry is a limit  to time how old the data can get before we refresh
          setLoading(false);
        });
      }
    }
  }, [data, expiry]);

  useEffect(() => {
    if (isLoggedIn) {
      if (!isEmpty(userObj)) {
        updateUserInfo(userObj,)
      }
    }
  }, [isLoggedIn, updateUserInfo, userObj])

  useEffect(() => {
    if (userEmail.length > 0 && userCourse === "") {
      getUserDetails()
    }
  }, [userEmail, getUserDetails, userCourse])

  useEffect(() => {
    if (courseMissing) {
    }
  }, [courseMissing])



  return (
    <Authcontext.Provider value={{ onLoginSuccess, onLogoutSuccess, onFailure, isLoggedIn, userObj, token }}>
      <Usercontext.Provider value={{ userName, userProfilePic, userCourse, userRole, userEmail }}>

        <Loadingcontext.Provider
          value={{ loading, setLoading, loaderbg, setLoaderBackground }}
        >
          <SearchQuerycontext.Provider value={{ filteredNotes, setfilteredNotes }}>
            <Themecontext.Provider value={{ lighttheme, setLightTheme }}>
              <Searchcontext.Provider
                value={{ selected, setSelected, movetop, setMoveTop }}
              >
                <Datacontext.Provider
                  value={{ data, setData, recentunits, setRecent, updateRecent }}
                >
                  <Alertcontext.Provider value={{ alert, setAlert, setshowAlert }}>
                    <div className="App">
                      <Router>
                        <Navigation />
                        {showAlert ? <Alertbox /> : null}
                        <Loader bg={`${loaderbg}`} />
                        {!isEmpty(selected) && selected.changeRoute ? (
                          <Redirect to={`/unit/${selected.code}`} />
                        ) : null}

                        <AnimatedSwitch
                          atEnter={{ opacity: 0 }}
                          atLeave={{ opacity: 0 }}
                          atActive={{ opacity: 1 }}
                          className="switch-wrapper"
                        >

                          <Route path="/contribute" exact component={Contribute} />
                          <Route path="/unit/:code" component={Unit} />
                          <Route path="/contact" exact component={Contact} />
                          <Route path="/" exact component={Landing} />
                          <Route path="/about" exact component={About} />
                          <ProtectedRoute path="/upload/*" exact component={Upload} />
                          <Route path="/login" exact component={Login} />
                          <Route path="/upload/content" component={Content} />
                          <Route path="/upload/videos" component={AddVideos} />
                          <ProtectedRoute path="/account" component={Accounts} />
                          <Route path="*" component={ErrorPage} />
                        </AnimatedSwitch>

                        {/* </Navigation> */}
                      </Router>
                      <Footer />
                    </div>
                  </Alertcontext.Provider>
                </Datacontext.Provider>
              </Searchcontext.Provider>
            </Themecontext.Provider>
          </SearchQuerycontext.Provider>
        </Loadingcontext.Provider>
      </Usercontext.Provider>
    </Authcontext.Provider>
  );
}

export default App;
