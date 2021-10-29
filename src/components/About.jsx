import React, { useEffect, useContext } from 'react'
import { Loadingcontext } from '../context'

function About() {
    let { setLoading } = useContext(Loadingcontext)
    useEffect(() => {
        setLoading(false)

    }, [setLoading])
    return (
        <div className='about-container'>
            <p className='about-paragraph font-20 font-primary'>
                Biblioteka which is polish for 'Library' is a repository for accesing course content,
                it was made in 2020 by students for the students. The aim of the platform is to present a simple, intuitive user interface for accessing course content in a meaningful way.
                The platform serves to provide you with all the neccessary information related to the course units you are taking or interested in.
            </p> </div>
    )
}

export default About
