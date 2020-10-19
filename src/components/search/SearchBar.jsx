import React,{useRef} from 'react'

const SearchBar=(props)=>{
    const {handleSearch,searchTerm,ref} =props.form

    let focusref=useRef()

   
        return (
            <div className='search-bar'>
                    <input autoComplete='off' ref={focusref} className='open-search search-input' onChange={handleSearch} value={searchTerm} placeholder={`${ref}`} />
            </div>
        )
}
export default SearchBar
