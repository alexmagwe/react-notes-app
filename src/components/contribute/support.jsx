import React,{useEffect,useContext} from 'react'
import {Loadingcontext} from '../context'

function Support() {
    const {setLoading}=useContext(Loadingcontext)
    useEffect(()=>{
    setLoading(false)
    },[setLoading])
    return (
    <div className='dark full'>
            <p className='support-paragraph'>
                The website is currently hosted on netlify and heroku which are free hosting platforms,the free hosting limits the speed and storage capabilities of the website.the plan is to move it to a paid hosting service and also buy a custom domain for it.show your support by donating any amount to the developer so that they can continue improving the website
                
                <h4>telephone:<a className='primary' href="tel:0796914452">0796914452</a></h4>

            </p>
        </div>
    )
}

export default Support
