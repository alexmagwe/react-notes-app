import React, { useState, useEffect, useContext } from 'react'
import Search from '../search/Search'
import { Searchcontext, Loadingcontext, Datacontext } from '../../context'
import { isEmpty } from '../../helpers'
import axios from 'axios'
import { allUnitsUrl, unitNotesUrl } from '../api/urls'
import Notes from '../notes/notes'

function Unit(props) {
    const { setLoading } = useContext(Loadingcontext)
    let { data, setData } = useContext(Datacontext)
    const { selected,setSelected } = useContext(Searchcontext)
    const [notes, setNotes] = useState({})


    useEffect(() => {
        if (isEmpty(data)) {
            setLoading(true)
            axios.get(allUnitsUrl).then(resp => {
                setData(resp.data)
                setLoading(false)
            }
            )
        }
        return ()=>{
            setSelected({})
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
        <div className='text-dark'>
            <div className='search-container'>

                <Search source={data} />
            </div>
            { !isEmpty(notes) ? <div>
                <p>{notes.unit} </p>
                <Notes showlink={true} notes={{ notes, setNotes }} />
            </div> : 'no notes found'}

        </div>
    )
}

export default Unit
