import React, { useState, useEffect, useContext } from 'react';
import Search from '../search/Search.jsx'
import { Searchcontext, Loadingcontext, Datacontext } from '../../context'
import { isEmpty } from '../../helpers'
import { allUnitsUrl, unitNotesUrl } from '../api/urls'
import Notes from '../notes/notes'
import axios from 'axios'

const Landing = () => {
    const { setLoading } = useContext(Loadingcontext)
    const { data, setData } = useContext(Datacontext)
    const [notes, setNotes] = useState({})
    const { selected, movetop } = useContext(Searchcontext)

    useEffect(() => {
        if (isEmpty(data)) {
            setLoading(true)
            axios.get(allUnitsUrl).then(resp => {
                setData(resp.data)
                setLoading(false)
            }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setLoading, setData])

    useEffect(() => {

        if (!isEmpty(selected)) {
            setLoading(true)
            axios.post(unitNotesUrl, { "unit_code": selected.code }).then(resp => {
                setNotes(resp.data)
                setLoading(false)
            })
        }

    }, [selected, setLoading])

    return (
        <div className='landing'>
            <div className='landing-content'>

                <div className={!movetop ? 'landing-info' : 'hide'}>
                    <h4 className='text-primary'> <span className='u-line'>Access all</span> Course notes and other Resources from anywhere</h4>
                </div>
                <div className='search-container'>
                    <h4 className='text-primary font-20 mb-2'>Search our catalogue for hundreds of resources</h4>
                    <Search source={data} />
                </div>
            </div>
            {!isEmpty(notes) ? (<Notes showlink={true} notes={{ notes, setNotes }} />) : null}
        </div>
    );
};

export default Landing;
