import React,{useEffect} from 'react'

import Button from '@material-ui/core/Button';


function Notes(props) {
    let {notes,setNotes}=props.notes;
    useEffect(() => {
    return () => {
        setNotes({})
    }
}, [setNotes])
    return (
       notes.notes.length>0?(<div className='notes'>
     <h4 className='notes-unit-name'>{notes.unit}</h4>
      <ul className='notes-list'>
          {notes.notes.map(el=>
          <li  className='notes-item'key={el.id}>
          <h4 className='notes-name'>{el.name}</h4>
        <Button href={`https://drive.google.com/file/d/${el.gid}/view`} target="_blank">View</Button></li>)}
        </ul>

    
        </div>):(<div className="unavailable"><h3>{notes.unit} resources not available yet</h3></div>
          )
          )
}

export default Notes
