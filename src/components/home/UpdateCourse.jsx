import React,{useState,useEffect,useContext} from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Results from '../Results' 
import Modal from '../Modal';
import Search from '../Search'
import Usercontext from '../context';

const UpdateCourse=props=>{
  const {user,course,setCourse}=useContext(Usercontext)
  const [courses,setData]=useState("")
const getCourses=()=>{
         axios.get('/courses/all').
         then(res=>setData(res.data)).
         catch(err=>(console.alert(err)))
      
}
let styles={
  error:{
    color:"crimson"
  }
}

useEffect(() => {
  getCourses()
}, [])

  const [open, setOpen] = useState(true);
  const [value,setValue]=useState('')
  const [matched,setMatched]=useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

// const updateServer=()=>{
//   let data={"email":user.email,"course_code":course.code}
//   console.log(user)
//   axios.post('add/mycourse',data).then(res=>console.log(res.data)).catch(err=>console.log(err))
// }

  const handleClose = (el) => {        
      setCourse(el)
      setMatched([])
      setOpen(false);
      setMatched([])
      setValue('')
      // updateServer()//send course info to server


   };

  const handleChange=(e)=>{
    setValue(e.target.value)
    if (value.length>0 && courses.length>0){
       let result= Search(value,courses,"code")
       setMatched(result)
    }
  }


  return (
    <div>
      {/* <Button style={error} className='message-box' onClick={handleClickOpen} variant='outlined'>update course details for personalized content</Button> */}
        <div className={open?"opened modal-container":"closed"}>
        <div className='modal-box'><Modal psd={{open,value,handleChange,label:`Welcome ${user.name} Enter your course code`}} /></div>
        {matched.length>0|value===''?(<Results props={{handleClose,matched}}/>):<span style={styles.error}>course not found</span>}
        </div>
   </div>
  );
        
}
export default UpdateCourse
