import React,{useState,useEffect,useContext}from 'react';
import Search from '../search/Search.jsx'
import { Link} from 'react-router-dom';
import {Searchcontext} from '../context'
import {isEmpty} from '../helpers'
import Notes from '../notes'
import Button from '@material-ui/core/Button';
import axios from 'axios'

const Landing = () => {

    let url='/units/all'
    const [data,setData] = useState([])
    const [notes,setNotes]=useState({})
    const {selected,setSelected}=useContext(Searchcontext)
    
    useEffect(() => {
        axios.get(url).then(resp=>setData(resp.data))
        
        },[url])

    useEffect(() => {
        let url='/notes/all'
        if (!isEmpty(selected)){
            axios.post(url,{"unit_code":selected.code}).then(resp=>setNotes(resp.data))
        }
    
    }, [selected])

    useEffect(() => {
        console.log(data)
        
        },[data])
    
        return (
            <div className='landing'>
                <Search source={data} />
                {!isEmpty(notes) ?(<Notes notes={notes}/>):null}
            </div>
        );
    };

export default Landing;
