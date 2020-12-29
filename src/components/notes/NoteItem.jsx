import React from 'react'
import Button from '@material-ui/core/Button'
import Link from '../../images/icons/link.svg'
function NoteItem(props) {
    const note=props.item
    const showlink=props.showlink
    const name=note.name.split('.')[0]
    return (
        <div>
        <li  className='notes-item'key={note.id}>
        <h4 className='notes-name'>{name.toLowerCase()}</h4>
    {showlink?(<Button href={`https://drive.google.com/file/d/${note.gid}/view`} target="_blank"><img className='link-icon' src={Link} alt='view'/></Button>):null }
        </li>
        </div>
    )
}

export default NoteItem
