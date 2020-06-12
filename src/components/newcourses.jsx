import React,{useState,useEffect} from 'react'

function Newcourse() {
   let[course,setCourse]=useState('')
   
   let handleSubmit=(e)=>{
    e.preventDefault()
    console.log(course)
    
   }
   return (
        <div>
<form onSubmit={handleSubmit} action="" >
    <label for='course'></label>
    <input id='course' onChange={(event)=>{setCourse(event.target.value)}} value={course} type='text'></input>
    </form>            
        </div>
    )
}

export default Newcourse
