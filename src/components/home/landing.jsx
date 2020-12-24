import React, {useEffect, useContext } from 'react';
import Search from '../search/Search.jsx'
import { Searchcontext, Loadingcontext, Datacontext } from '../../context'
import { isEmpty } from '../../helpers'
import { allUnitsUrl} from '../api/urls'
import axios from 'axios'

const Landing = () => {
    const { setLoading } = useContext(Loadingcontext)
    const { data, setData } = useContext(Datacontext)
    const {movetop,setMoveTop } = useContext(Searchcontext)

    useEffect(() => {
        if (isEmpty(data)) {
            setLoading(true)
            axios.get(allUnitsUrl).then(resp => {
                setData(resp.data)
                setLoading(false)
            }
            )
        }
        return ()=>{
            setMoveTop(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setLoading, setData])


    return (
        <div className='landing'>
            <div className='landing-content'>

                <div className={!movetop ? 'landing-info' : 'hide'}>
                    <h4 className='text-primary'> <span className='u-line'>Access all</span> Course notes and other Resources from anywhere</h4>
                </div>
                <div className={!movetop?'search-container':'search-container-top'}>
                    <h4 className={!movetop?'text-primary font-20 mb-2':'hide'} >Search our catalogue for hundreds of resources</h4>
                    <Search source={data} />
                </div>
            </div>
            {/* {!isEmpty(notes) ? (<Notes showlink={true} notes={{ notes, setNotes }} />) : null} */}

        </div>
    );
};

export default Landing;
