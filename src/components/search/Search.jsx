import React,{useState,useContext} from 'react';
import SearchBar from './SearchBar.jsx'
import  Results from './Results'
import {Searchcontext} from '../../context'
import {useSearch} from '../hooks'

const Search = (props) => {
    let [ref,desc]=['Search Unit Code or Name','name']//change this to what your data returns,ref is what will be searched for as user types, desc is what will bew displayed
    const [results,setResults]=useState([])
    const {setSelected,movetop,setMoveTop}=useContext(Searchcontext)
    const [searchTerm,setSearchTerm]=useState('')
    useSearch(searchTerm,props.source,setResults,'code',3)//last argument specifies min characters typed for it to start searching

     const handleSearch=e=>{
        setSearchTerm(e.target.value)
     }

    const handleClose = (choice) => {        
        setResults([])
        setSelected(choice)
        setSearchTerm('')
        setMoveTop(true)
    };
    return (
        <div className={movetop?'search-container-top':"search-container"}>
            <SearchBar form={{handleSearch,searchTerm,ref}}/>
            {results.length>0 && searchTerm.length>0?(<Results props={{handleClose,results,ref,desc}}/>):null}
        </div>
    );
};

export default Search;
