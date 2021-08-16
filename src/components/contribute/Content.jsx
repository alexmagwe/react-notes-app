import React from 'react'
import Card from './Card'

function Content() {
    return (
        <div className='cards-container'>
            <Card values={{ desc: "Notes & Asignments", link: "upload", style: "files-img" }} />
            <Card values={{ desc: "Videos", link: "upload/videos", style: "videos-img" }} />
            <Card values={{ desc: "Courses", link: "upload/courses", style: "courses-img" }} />
        </div>
    )
}

export default Content
