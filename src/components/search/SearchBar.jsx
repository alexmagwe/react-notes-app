import React,{useState,useRef,useEffect} from 'react'

const SearchBar=(props)=>{
    const {handleSearch,searchTerm,ref} =props.form
    const [open, setState] = useState(false)
    let focusref=useRef()

    useEffect(() => {
        if (open){
            focusref.current.focus()}
    }, [open])

    const handleOpen=()=>{
        setState(current=>!current)
    }
        return (
            <div className='search-bar'>
                    <input ref={focusref} className={open?'open-search search-input':'search-input close-search'} onChange={handleSearch} value={searchTerm} placeholder={`${ref}`} />
                    <i  onClick={handleOpen}className='fa fa-search'></i>
            </div>
        )
}
export default SearchBar
