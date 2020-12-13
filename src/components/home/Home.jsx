import React,{useEffect,useContext} from 'react';
import axios from 'axios'
// import Button from '@material-ui/core/Button';
import {isEmpty} from '../../helpers'
import Search from '../search/Search'
import {Usercontext,Searchcontext} from '../../context.js';
import {courseUnitsUrl} from '../api/urls'

const Home = () => {
    const {course,units,setUnits}=useContext(Usercontext)
    const{selected}=useContext(Searchcontext)
useEffect(() => {
    if (!isEmpty(selected)){
        console.log('selected',selected)
    }
 
}, [selected])
  useEffect(()=>{
     if (course.code){
         let payload={course_code:course.code}
        axios.post(courseUnitsUrl,payload).then(res=>setUnits(res.data)).catch(err=>console.error(err))
     }
     },[course,setUnits])

    return (
        <div className='home'>
            <Search source={units}/>
            <div>
                <h2 className="course-header">{course.name}</h2>
            </div>
    </div>
    );
};

export default Home;
