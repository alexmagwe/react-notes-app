import React from 'react'
import {Link } from 'react-router-dom';

function Card(props) {
    console.log(props.values)
    let {desc,link,style}={...props.values}
    return (
              <div className={`card ${style}`}>
                 <Link to={`/${link}`}> 
                 <h3 className='card-text'>{desc}</h3>
                 </Link>
              </div> 
    )
}

export default Card
