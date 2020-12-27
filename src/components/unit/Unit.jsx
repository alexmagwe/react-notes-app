import React, { useState, useEffect, useContext, useCallback } from "react";
import Search from "../search/Search";
import { Searchcontext, Loadingcontext, Datacontext } from "../../context";
import { isEmpty } from "../../helpers";
import axios from "axios";
import { useParams } from "react-router-dom";
import { allUnitsUrl, unitNotesUrl } from "../api/urls";
import Tabs from './Tabs'

function Unit(props) {
    const { code } = useParams();
    const { setLoading } = useContext(Loadingcontext);
    let { data, setData } = useContext(Datacontext);
    const { selected, setSelected } = useContext(Searchcontext);
    const [notes, setNotes] = useState({});
    const [unit, setUnit] = useState(code)
    const getNotes = useCallback(async code => {
        setLoading(true);
        const resp = await axios.post(unitNotesUrl, { unit_code: code })
        setNotes(resp.data);
        setLoading(false);
    }, [setLoading])
    useEffect(() => {
        if (isEmpty(data)) {
            setLoading(true);
            axios.get(allUnitsUrl).then((resp) => {
                setData(resp.data);
                setLoading(false);
            });
        }
        return () => {
            setSelected({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setLoading, setData]);

    useEffect(() => {
        getNotes(code);
    }, [getNotes, code])

    return (
        <div className="grid-container">
            <div className='top-content-section'>
                <div className='top-content-inner-section'>

                    <div className='inner-section-content'>
                        <h2>{notes.unit} </h2>
                        <h3 className='grey'>{notes.code}</h3>
                    </div>
                    <div className="search-container-top">
                        <Search source={data} />
                    </div>
                </div>
            </div>
            <Tabs properties={notes} />
            {/* {!isEmpty(notes) ? (
                <div className='notes-section'>
                    <Notes showlink={true} properties={{ notes, setNotes }} />
                </div>
            ) : (
                    "no notes found"
                )} */}
        </div>
    );
}

export default Unit;
