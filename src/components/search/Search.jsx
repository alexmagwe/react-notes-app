import React, { useState, useContext } from 'react'
import SearchBar from './SearchBar.jsx'
import Results from './Results'
import { Searchcontext,Datacontext } from '../../context'
import { getLocalData, setLocalData } from '../../helpers'
import { useSearch } from '../hooks'

const Search = props => {
  let [ref, desc] = ['Enter Course Code or Name', 'name'] //change this to what your data returns,ref is what will be searched for as user types, desc is what will bew displayed
  const [results, setResults] = useState([])
  const { setSelected } = useContext(Searchcontext)
  const {recent,setRecent}=useContext(Datacontext)
  const [searchTerm, setSearchTerm] = useState('')
  useSearch(searchTerm, props.source, setResults, 'code', 3) //last argument specifies min characters typed for it to start searching

  const handleSearch = e => {
    setSearchTerm(e.target.value)
  }

  const handleClose = async choice => {
    setResults([])
    console.log('choice',choice)
    setSelected(choice)
    setLocalData('recent', choice, null)//saves search to local storage for more personalization:param null is for no expiry 
    setSearchTerm('')
  }
  return (
    <>
      <SearchBar form={{ handleSearch, searchTerm, ref }} />
      {results.length > 0 && searchTerm.length > 0 ? (
        <Results props={{ handleClose, setResults, results, ref, desc }} />
      ) : null}
    </>
  )
}

export default Search
