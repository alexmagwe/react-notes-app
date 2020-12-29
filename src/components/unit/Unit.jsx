import React, { useState, useEffect, useContext, useCallback } from "react";
import Search from "../search/Search";
import {
  Searchcontext,
  Loadingcontext,
  Datacontext,
  Themecontext,
} from "../../context";
import { isEmpty } from "../../helpers";
import axios from "axios";
import { useParams } from "react-router-dom";
import { allUnitsUrl, unitNotesUrl } from "../api/urls";
import Tabs from "./Tabs";
import Recent from './Recent'

function Unit(props) {
  const { code } = useParams();
  const { setLoading } = useContext(Loadingcontext);
  let { data, setData } = useContext(Datacontext);
  let { setTheme } = useContext(Themecontext);
  const { setSelected } = useContext(Searchcontext);
  const [notes, setNotes] = useState({});
  const getNotes = useCallback(
    async (code) => {
      setLoading(true);
      const resp = await axios.post(unitNotesUrl, { unit_code: code });
      setNotes(resp.data);
      setLoading(false);
    },
    [setLoading]
  );
  useEffect(() => {
    setTheme(true);
    if (isEmpty(data)) {
      setLoading(true);
      axios.get(allUnitsUrl).then((resp) => {
        setData(resp.data);
        setLoading(false);
      });
    }
    return () => {
      setSelected({});
      setTheme((theme) => (theme = false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading, setData]);

  useEffect(() => {
    getNotes(code);
  }, [getNotes, code]);

  return (
    <div className="grid-container">
      <div className="top-content-section">
        <div className="top-content-inner-section">
          <div className="inner-section-content">
            <h2 className="text-light mb-1">{notes.unit} </h2>
            <h3 className="grey">{notes.code}</h3>
          </div>
          <div className="search-container-top">
            <Search source={data} />
          </div>
        </div>
      </div>
      <Tabs properties={notes} />
      <Recent/>
    </div>
  );
}

export default Unit;
