import React, { useRef } from 'react'
// import searchIcon from '../../images/icons/search.png'
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
      {/* <img className='fa-search' src={searchIcon} alt='' /> */}
      <ClipLoader color='#3edac5' css='position:absolute;top:7px;right:20px;' loading={loading} size={25} />
        </form>
    </div>
  )
}
export default SearchBar
