import React,{useEffect} from 'react'
import NoteItem from './NoteItem';


function Notes(props) {
    let {notes,setNotes}=props.notes;
    let showlink=props.showlink
  
    useEffect(() => {
    return () => {
        setNotes({})
    }
}, [setNotes])
    return (
       notes.notes.length>0?(<div className='notes'>
     <h4 className='notes-unit-name'><span className='unit-code'>{notes.code}</span> {notes.unit}</h4>
      <ul className='notes-list'>
          {notes.notes.map((el,i)=>

          <NoteItem key={i} item={el} showlink={showlink} />
          )} 
        </ul>

    
        </div>):(<div className="unavailable"><h3>{notes.unit} resources not available yet</h3></div>
          )
          )
}

export default Notes
