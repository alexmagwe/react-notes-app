import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';


const SearchBar=()=>{
    const [searchTerm, setsearchTerm] = useState('')

    const handleChange=(e)=>{
        setsearchTerm(e.target.value)
    }
        return (
            <div className='search-bar'>
                    <input className='search-input' onChange={handleChange} value={searchTerm} placeholder="Unit" />
                    <i className='fa fa-search'></i>
            </div>

        )
}

export default SearchBar
