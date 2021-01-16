import React, { useEffect, useContext } from 'react'
import Search from '../search/Search.jsx'
import { Loadingcontext, Datacontext } from '../../context'

const Landing = () => {
  const { setLoading } = useContext(Loadingcontext)
  const { data } = useContext(Datacontext)

  useEffect(() => {
    setLoading(false)
  }, [setLoading])

  return (
    <div className='landing'>
      <div className='landing-content'>
        <div className='landing-info'>
          <h4 className='text-primary'>
            {' '}
            <span className='u-line'>Access all</span> Course notes and other
            Resources from anywhere
          </h4>
        </div>
        <div className='search-container'>
          <h4 className='text-primary font-20 mb-2'>
            Search the catalogue for hundreds of resources
          </h4>
          <Search source={data} />
        </div>
      </div>
      {/* {!isEmpty(notes) ? (<Notes showlink={true} notes={{ notes, setNotes }} />) : null} */}
    </div>
  )
}

export default Landing
