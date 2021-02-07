import React,{useState,useEffect,useContext} from 'react'
import {Loadingcontext,Themecontext} from '../context'
import img from '../images/cylindricallibrary.jpg'
function About() {
    const {bgImage,setBgImage}=useContext(Themecontext)
    let {setLoading}=useContext(Loadingcontext)
    let [previousBg] = useState(bgImage)
    useEffect(() => {
        setLoading(false)
        setBgImage(img)
        return ()=>{
            setBgImage(previousBg)
        }
      
    }, [setLoading,setBgImage,previousBg])

    return (
        <div className='about-container'>
            <p className='about-paragraph center-20 font-20 font-primary'>
           Biblioteka which is polish meaning 'Library' is a platform for accesing course resources,it was created in 2020 and the main aim of the website was to allow easy access to course resources
       </p> </div>
    )
}

export default About
