import React, { useState, useEffect, useContext } from 'react'
import { Datacontext } from '../../context'
import { isEmpty } from '../../helpers'
import { Link } from 'react-router-dom'

function Recent(props) {
    const { page, unit } = props.data
    const { recent } = useContext(Datacontext)
    const [recentitems, setRecentItems] = useState([])
    useEffect(() => {
        if (!isEmpty(recent)) {
            setRecentItems(Object.keys(recent))
            console.log(recent)
        }
    }
        , [recent])
    return (
        <div className='recent-container'>
            <ul className={`recent-grid ${page}-recent`}>
                {recentitems.filter(item => item !== unit).map((code, i) => {//hides the current unit from recent items list in unit page
                    return <li className='recent-item' key={i}><Link className='grey' to={`/unit/${code}`} >{recent[code].name.toLowerCase()}</Link></li>
                })}
            </ul>


        </div>
    )
}

export default Recent
