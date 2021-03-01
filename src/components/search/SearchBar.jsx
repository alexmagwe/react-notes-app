import React, { useRef } from 'react'
// import searchIcon from '../../images/icons/search.png'

const SearchBar = props => {
  const { handleSearch, searchTerm, ref } = props.form
  const inputbox = useRef(null)

  // useEffect(() => {
  //   inputbox.current.focus()
  // }, [])

  return (
    <div className='search-bar'>
      <input
        autoComplete='off'
        ref={inputbox}
        className='open-search search-input'
        onChange={handleSearch}
        value={searchTerm}
        // autoFocus
        placeholder={`${ref}`}
      />
      {/* <img className='fa-search' src={searchIcon} alt='' /> */}
    </div>
  )
}
export default SearchBar
