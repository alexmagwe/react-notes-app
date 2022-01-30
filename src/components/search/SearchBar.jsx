import React, { useRef } from 'react'
import searchIcon from '../../images/icons/search.png'
import ClipLoader from "react-spinners/ClipLoader";
const SearchBar = props => {
  const { handleSearch, searchTerm,handleSubmit,formSubmissionLoading:loading, placeholder} = props.form
  const inputbox = useRef(null)
  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit}>

      <input
        autoComplete='off'
        ref={inputbox}
        autoFocus={props.focus}
        className='open-search font-16 search-input'
        onChange={handleSearch}
        value={searchTerm}
        // autoFocus
        placeholder={`${placeholder}`}
        />
        <button type='submit' className='fa-search-container'>
          <i class="fa fa-search"></i>
      <ClipLoader color='#fff' css='position:absolute;' loading={loading} size={30} />
        </button>
        </form>
    </div>
  )
}
export default SearchBar
