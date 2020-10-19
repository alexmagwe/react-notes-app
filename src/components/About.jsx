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
           <p>Biblioteka which is polish meaning 'Library' is a platform for accesing course resources,it was created in 2020 and the main aim of the website was to allow easy access to course resources like pdfs          </p>
       </h3> </div>
    )
}

export default About
