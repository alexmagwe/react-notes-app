import React, { useEffect, useContext } from 'react'
import Search from '../search/Search.jsx'
import { Loadingcontext, Datacontext } from '../../context'
import Recent from '../reusables/Recent'
const Landing = () => {
  const { setLoading } = useContext(Loadingcontext)
  const { data} = useContext(Datacontext)

  useEffect(() => {
    setLoading(false)
  }, [setLoading])

  return (
    <div className='landing'>
      <div className='landing-content'>
        <div className='landing-info'>
          <h4 className='text-primary'>
            <span className='u-line'>Access</span> all Course  
            Material
          </h4>
        </div>
        <div className='search-container'>
          <Search source={data} />
        </div>
        <Recent/>
      </div>
      {/* {!isEmpty(notes) ? (<Notes showlink={true} notes={{ notes, setNotes }} />) : null} */}
    </div>
  )
}

export default Landing
