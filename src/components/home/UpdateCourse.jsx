import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';
import Results from '../search/Results' 
import Modal from '../Modal';
import {useSearch} from '../hooks/myhooks'

import {Usercontext} from '../context';

const UpdateCourse=props=>{
  let [ref,desc]=['course code','name']
  const {user,setUpdatecourse,updatecourse,setCourse}=useContext(Usercontext)
  // const {selected,setSelected}=useContext(Searchcontext)
  const [courses,setData]=useState([])
  const [results, setResults] = useState([])
  const [searchTerm,setSearchTerm]=useState('')

  useEffect(() => {
    let url='/api/courses/all'
    axios.get(url).then(resp=>setData(resp.data)).catch(err=>alert(err))
  
  }, [])  
const updateServer=(details)=>{
  let data={"email":user.email,"course_code":details.code}
  
  axios.post('/api/add/mycourse',data).then(res=>setCourse(res.data)).catch(err=>alert(err))

}
  useSearch(searchTerm,courses,setResults,'code')

  const handleClose = (el) => {        
      setCourse(el)
      localStorage.setItem('course',JSON.stringify(el))
      updateServer(el)
      setUpdatecourse(false);
      setSearchTerm('')
      setResults([])
      // updateServer()//send course info to server


   };

  const handleChange=(e)=>{
    setSearchTerm(e.target.value)
  }


  return (
    <div>
      {/* <Button style={error} className='message-box' onClick={handleClickOpen} variant='outlined'>update course details for personalized content</Button> */}
        <div className={updatecourse?"opened modal-container":"closed"}>
        <div className='modal-box'>
          <Modal binders={{updatecourse,searchTerm,handleChange,label:`Welcome ${user.name} Enter your course code`}} />
          
        {results.length>0 && searchTerm.length>0?(<Results props={{handleClose,results,ref,desc}}/>):null}
       </div>
        </div>
   </div>
  );
        
}
export default UpdateCourse
