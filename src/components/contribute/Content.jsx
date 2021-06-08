import React from 'react'
import Card from './Card'

function Content() {
    return (
        <div className='cards-container'>
            <Card values={{desc:"Notes & Asignments",link:"upload",style:"files-img"}}/>
            <Card values={{desc:"Videos",link:"add/videos",style:"videos-img"}}/>
            <Card values={{desc:"Courses",link:"add/courses",style:"courses-img"}}/>            
        </div>
    )
}

export default Content
