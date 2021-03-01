import React, { useContext } from 'react'
import { Datacontext } from '../../context'
import { isEmpty } from '../../helpers'
import { Link } from 'react-router-dom'

function Recent(props) {
    // we filter recent items to show only units that is not the current one
    const { page, unit } = props.data
    const { recentunits } = useContext(Datacontext)

    return (
        <div className='recent-container'>
            <ul className={`recent-grid ${page}-recent`}>
                {!isEmpty(recentunits) && recentunits ? (Object.keys(recentunits).filter(item => item !== unit).map((code, i) => {//hides the current unit from recent items list in unit page
                    return <li className='recent-item' key={i}><Link className='grey' to={`/unit/${code}`} >
                        <span className='font-12 light-grey'>{code}</span>
                        {recentunits[code].name.toLowerCase()}</Link></li>
                })) : null}
            </ul>


        </div>
    )
}

export default Recent
