import React, { useState, useEffect, useContext, useCallback } from "react";
import Search from "../search/Search";
import {
  Searchcontext,
  Alertcontext,
  SearchQuerycontext,
  Loadingcontext,
  Datacontext,
  Themecontext,
} from "../../context";
import axios from "axios";
import { useParams } from "react-router-dom";
import { unitNotesUrl } from "../api/urls";
import Tabs from "./Tabs";
import Recent from "../reusables/Recent";
import InfiniteBackground from '../reusables/infiniteBackground';
function Unit(props) {
  const { code } = useParams();
  const { setLoading } = useContext(Loadingcontext);
  const { filteredNotes,setfilteredNotes} = useContext(SearchQuerycontext)
  const { setAlert,setShowAlert} = useContext(Alertcontext)
  let { data, setData } = useContext(Datacontext);
  let {lighttheme,setLightTheme,setInDashboard } = useContext(Themecontext);
  const { setSelected } = useContext(Searchcontext);
  const [notes, setNotes] = useState({});
  const getNotes = useCallback(
    async (code) => {
      setLoading(true);
      try{

        const resp = await axios.post(unitNotesUrl, { unit_code: code });
        setNotes(resp.data.message);
        setLoading(false);
      }
      catch(err){
        setLoading(false)
        setAlert({message:err.message,type:"error"})
        setShowAlert(true)
      }
    },
    [setLoading,setAlert,setShowAlert]
  );
//   useEffect(()=>{
//     console.log('changed unit')
// setfilteredNotes([])
//   },[code, setfilteredNotes])
  useEffect(() => {
    setInDashboard(true)
    setLoading(false);
    return () => {
      setSelected({});
      setInDashboard(false);
      setfilteredNotes([])
    };
  }, [setLoading, setData, setLightTheme, setSelected, setfilteredNotes,setInDashboard]);

  useEffect(() => {
    getNotes(code);
  }, [getNotes, code]);

  return (
      <div className={lighttheme? "unit-container lightMode":'unit-container darkMode'}>
        <div className="grid-container">
          <div className="top-content-section">
          <InfiniteBackground/>
            <div className="top-content-inner-section">
              <div className="inner-section-content">
                <h2 >{notes.unit} </h2>
                <h3 className="light-grey">{notes.code}</h3>
              </div>
              <div className="search-container-top">
                <Search
                  location={props.location.pathname}
                  source={data}
                  clear={true}
	  	placeholder={"Search"}
                  data={notes}
                />
              </div>
            </div>
          </div>
          <Tabs properties={notes} matchingNotes={filteredNotes} />
          <Recent data={{ page: "unit", unit: notes.code }} />
        </div>
      </div>
  );
}

export default Unit;
