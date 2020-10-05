import React,{useEffect,useContext} from 'react'
import {Loadingcontext} from './context'

function About() {
    let {setLoading}=useContext(Loadingcontext)
    useEffect(() => {
        setLoading(false)
      
    }, [setLoading])
    return (
        <div className='about'>
            Biblioteka is a platform for accessing University notes
        </div>
    )
}

export default About
