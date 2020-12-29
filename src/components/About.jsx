import React,{useEffect,useContext} from 'react'
import {Loadingcontext} from '../context'

function About() {
    let {setLoading}=useContext(Loadingcontext)
    useEffect(() => {
        setLoading(false)
      
    }, [setLoading])
    return (
        <div className='about-container'>
            <p className='about-paragraph center-20 font-20 font-primary'>
           Biblioteka which is polish meaning 'Library' is a platform for accesing course resources,it was created in 2020 and the main aim of the website was to allow easy access to course resources
       </p> </div>
    )
}

export default About
