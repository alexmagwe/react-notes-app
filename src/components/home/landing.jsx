import React,{useState,useEffect,useContext}from 'react';
import Search from '../search/Search.jsx'
import {Searchcontext} from '../context'
import {isEmpty} from '../helpers'
import Notes from '../notes'
import axios from 'axios'

const Landing = () => {

    let url='/units/all'
    const [data,setData] = useState([])
    const [notes,setNotes]=useState({})
    const {selected}=useContext(Searchcontext)
    
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
    // setLoading(false)
        
        },[data])
    
        return (
            <div className='landing'>
                <Search source={data} />
                {!isEmpty(notes) ?(<Notes notes={{notes,setNotes}}/>):null}
            </div>
        );
    };

export default Landing;
