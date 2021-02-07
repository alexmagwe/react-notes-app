import React,{useState,useEffect,useContext} from 'react'
import { Datacontext,Searchcontext } from '../../context'
import { isEmpty } from '../../helpers'
import {Link} from 'react-router-dom'

function Recent() {
    const { recent } = useContext(Datacontext)
    const [recentitems, setRecentItems] = useState([])
    const { selected } = useContext(Searchcontext)
    useEffect(()=>{
        console.log('here:')
        if(!isEmpty(recent)){
            setRecentItems(Object.keys(recent))
        }
    }
,[recent])
    return (
    <div className='recent-container'>
        <ul className='recent-ul'>
        {recentitems.map((item,i)=>{
            return <li className='recent-item' key={i}><Link className='text-primary' to={`/unit/${item}`} >{item}</Link></li>
        })}
        </ul>
        

    </div>
    )
}

export default Recent
