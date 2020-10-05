import React,{useState,useEffect,useContext}from 'react';
import Search from '../search/Search.jsx'
import {Searchcontext,Loadingcontext} from '../context'
import {isEmpty} from '../helpers'
import Notes from '../notes'
import axios from 'axios'

const Landing = () => {
    const {setLoading}=useContext(Loadingcontext)
    let units='/units/all'
    const [data,setData] = useState([])
    const [notes,setNotes]=useState({})
    const {selected}=useContext(Searchcontext)
    
    useEffect(() => {
        axios.get(units).then(resp=>{setData(resp.data)
        setLoading(false)
        })
        },[units,setLoading])

    useEffect(() => {
        let url='/notes/all'
        if (!isEmpty(selected)){
            setLoading(true)
            axios.post(url,{"unit_code":selected.code}).then(resp=>{setNotes(resp.data)
            setLoading(false)})
        }
    
    }, [selected,setLoading])

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
