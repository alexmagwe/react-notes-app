import React,{useRef} from 'react'
import searchIcon from '../../images/icons/search.png'

const SearchBar=(props)=>{
    const {handleSearch,searchTerm,ref} =props.form

    let focusref=useRef()

   
        return (
            <div className='search-bar'>
                    <input autoComplete='off' ref={focusref} className='open-search search-input' onChange={handleSearch} value={searchTerm} placeholder={`${ref}`} />
                    <img className='fa-search' src={searchIcon}/>
            </div>
        )
}
export default SearchBar
