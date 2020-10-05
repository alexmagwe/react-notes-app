import React from 'react'

import Button from '@material-ui/core/Button';


function Notes(props) {
    let notes=props.notes
    return (
        <div className='notes'>
     <h4 className='notes-unit-name'>{notes.unit}</h4>
      <ul className='notes-list'>
          {notes.notes.map(el=>
          <li  className='notes-item'key={el.id}>
          <h4 className='notes-name'>{el.name}</h4>
        <Button href={`https://drive.google.com/file/d/${el.gid}/view`} target="_blank">View</Button></li>)}
        </ul>

    
        </div>
    )
}

export default Notes
