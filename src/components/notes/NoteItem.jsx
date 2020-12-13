import React from 'react'
import Button from '@material-ui/core/Button'
function NoteItem(props) {
    const note=props.item
    const showlink=props.showlink
    return (
        <div>
        <li  className='notes-item'key={note.id}>
        <h4 className='notes-name'>{note.name}</h4>
        {showlink?(<Button href={`https://drive.google.com/file/d/${note.gid}/view`} target="_blank">View</Button>):null }
        </li>
        </div>
    )
}

export default NoteItem
