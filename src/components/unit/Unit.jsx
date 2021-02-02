import React, { useState, useEffect, useContext, useCallback } from 'react'
import Search from '../search/Search'
import {
  Searchcontext,
  Loadingcontext,
  Datacontext,
  Themecontext
} from '../../context'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { unitNotesUrl } from '../api/urls'
import Tabs from './Tabs'
import Recent from './Recent'

function Unit (props) {
  const { code } = useParams()
  const { setLoading } = useContext(Loadingcontext)
  let { data, setData } = useContext(Datacontext)
  let { setLightTheme } = useContext(Themecontext)
  const { setSelected } = useContext(Searchcontext)
  const [notes, setNotes] = useState({})
  const getNotes = useCallback(
    async code => {
      setLoading(true)
      const resp = await axios.post(unitNotesUrl, { unit_code: code })
      setNotes(resp.data)
      setLoading(false)
    },
    [setLoading]
  )
  useEffect(() => {
    setLightTheme(true)
    setLoading(false)
    return () => {
      setSelected({})
      setLightTheme(theme => (theme = false))
    }
  }, [setLoading, setData, setLightTheme, setSelected])

  useEffect(() => {
    getNotes(code)
  }, [getNotes, code])

  return (
    <div className='grid-container'>
      <div className='top-content-section'>
        <div className='top-content-inner-section'>
          <div className='inner-section-content'>
            <h2 className='text-light mb-1'>{notes.unit} </h2>
            <h3 className='grey'>{notes.code}</h3>
          </div>
          <div className='search-container-top'>
            <Search source={data} />
          </div>
        </div>
      </div>
      <Tabs properties={notes} />
      <Recent />
    </div>
  )
}

export default Unit
