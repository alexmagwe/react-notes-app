import React,{useRef,useEffect,useContext} from 'react'
import {Loadingcontext} from '../../context'
function ErrorPage() {
    const {setLoading}=useContext(Loadingcontext)
    const mouseref=useRef()

    // function mulika(event){
    //     console.log(event)
    //     console.log(mouseref.current)
    //   mouseref.current.style.top=`${event.pageY}px`
    //   mouseref.current.style.left=`${event.pageX}px`
    //   }
    
    useEffect(()=>{
        setLoading(false)
    //    document.addEventListener('mousemove',mulika)
    //   return()=>{
    //       document.removeEventListener('mousemove',mulika)
    //   }
},
    
    [setLoading])
    return (
        <div className='error-container'>
        <div className="text">
            <h1>404</h1>
	    <h2>Uh, Ohh</h2>
        </div>
        <div ref={mouseref} className="torch"></div>
   </div> )
}

export default ErrorPage
