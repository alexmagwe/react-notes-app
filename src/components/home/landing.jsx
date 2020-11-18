import React,{useState,useEffect,useContext}from 'react';
import Search from '../search/Search.jsx'
import {Searchcontext,Loadingcontext,Datacontext} from '../context'
import {isEmpty} from '../helpers'
import {allUnitsUrl,unitNotesUrl} from '../urls'
import logo from '../../images/logo.png'

import Notes from '../notes'
import axios from 'axios'

const Landing = () => {
    const {setLoading}=useContext(Loadingcontext)
    const {data,setData} = useContext(Datacontext)
    const [notes,setNotes]=useState({})
    const {selected,setSelected,movetop}=useContext(Searchcontext)
    
    useEffect(() => {
        if(isEmpty(data)){
        setLoading(true)
        axios.get(allUnitsUrl).then(resp=>{setData(resp.data)
        setLoading(false)}
        )}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[setLoading,setData])
useEffect(()=>{
    return ()=>{
        setSelected({})
    }
},[setSelected])
    useEffect(() => {
        
        if (!isEmpty(selected)){
            setLoading(true)
            axios.post(unitNotesUrl,{"unit_code":selected.code}).then(resp=>{setNotes(resp.data)
             setLoading(false)})
        }
      
    }, [selected,setLoading])

        return (
            <div className='landing'>
                <p className={!movetop?'landing-info':'hide'}>
                    <img className='landing-banner' src={logo} alt='Biblioteka'/>
                   <span className='text-dark font-lg'> Access Course Resources</span>
                </p>
                <Search source={data} />
                {!isEmpty(notes) ?(<Notes showlink={true} notes={{notes,setNotes}}/>):null}
            </div>
        );
    };

export default Landing;
