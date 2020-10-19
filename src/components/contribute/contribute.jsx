import React,{useEffect,useContext} from 'react'
import {Loadingcontext} from '../context'
import {Link } from 'react-router-dom';

function Contribute() {
    const {setLoading}=useContext(Loadingcontext)
    
useEffect(()=>{
    setLoading(false)
},[setLoading])
    return (
        <div>
          {/* <h2 className='center md pd2 primary'>Improve the site by adding more content</h2> */}
          <div className='cards-container'>
              <div className='card card1'>
                 <Link to='/upload'> 
                 <h3 className='card-text'>Add Notes</h3>
                 </Link>
              </div>

            <div className='card card2'>
                <Link to='/support'> 
                    <h3 className='card-text'>Support the developer</h3>
                </Link> 
            </div>
           
          </div>
        </div>
    )
}

export default Contribute
