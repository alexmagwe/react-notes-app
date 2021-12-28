import React,{useEffect,useState,useContext} from "react";
import { SearchQuerycontext } from "../../context";
import NoteItem from "./NoteItem";
import { Link } from 'react-router-dom';
function Notes(props) {
  const {filteredNotes,setfilteredNotes}=useContext(SearchQuerycontext)
  const data = props.currentData;
  const resources = data.resources;
  const [ids, setIds] = useState([])
  let showlink = props.showlink;

 useEffect(()=>{
    if (filteredNotes.length>0){
      setIds(filteredNotes.map(file=>{return file.gid}))

    }
  },[filteredNotes])

  useEffect(()=>{

    return ()=>{
            setfilteredNotes([])
    }
  },[setfilteredNotes])

  return resources.length > 0 ? (
    <div className="notes">
      <ul className="notes-list">
        {resources.map((el, i) => {
          let highlight=false
          if(ids.includes(el.gid)){
            highlight=true
          }
         return <NoteItem key={i} highlight={highlight} item={el} showlink={showlink} />
        }
          )}
      </ul>
    </div>

  ) :  
	<h2 className='notesTagLine'>No content current available here,we are working hard to make sure you never have to see this place empty again,if you have any content,you can also <Link to='/contribute'>contribute</Link> and help others! </h2>

}

export default Notes;
