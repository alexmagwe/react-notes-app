import React, { useRef } from 'react'
// import searchIcon from '../../images/icons/search.png'

const SearchBar = props => {
  const { handleSearch, searchTerm,handleSubmit, placeholder} = props.form
  const inputbox = useRef(null)

  // useEffect(() => {
  //   inputbox.current.focus()
  // }, [])

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
        </form>
    </div>
  )
}
export default SearchBar
