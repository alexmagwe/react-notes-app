import React,{useEffect,useState,useContext} from "react";
import { SearchQuerycontext } from "../../context";
import NoteItem from "./NoteItem";
function Notes(props) {
  const {filteredNotes,setfilteredNotes}=useContext(SearchQuerycontext)
  const data = props.currentData;
  const resources = data.resources;
  const [ids, setIds] = useState([])
  let showlink = props.showlink;

 useEffect(()=>{
    console.log('mounting',filteredNotes)
    if (filteredNotes.length>0){
      setIds(filteredNotes.map(file=>{return file.gid}))

    }
    return ()=>{
      console.log('unmounting')

    }
  },[filteredNotes])

  useEffect(()=>{

    console.log('mounting notes component ')
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
  ) : null;
}

export default Notes;
