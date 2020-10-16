import React,{useEffect,useContext} from 'react'
import {Loadingcontext} from './context'

function About() {
    let {setLoading}=useContext(Loadingcontext)
    useEffect(() => {
        setLoading(false)
      
    }, [setLoading])
    return (
        <div className='about'>
            <h3 className='about-paragraph'>
            Biblioteka is a search platform for accessing University notes
       </h3> </div>
    )
}

export default About
