import React, { useEffect } from "react";
import NoteItem from "./NoteItem";

function Notes(props) {
  const data = props.properties;
  let showlink = props.showlink;
  useEffect(() => {
    console.log("recieved data", data);
  }, []);

  //  useEffect(() => {
  //    return () => {
  //       setNotes({})
  //   }
  // }, [setNotes])
  return data.notes.length > 0 ? (
    <div className="notes">
      <ul className="notes-list">
        {data.notes.map((el, i) => (
          <NoteItem key={i} item={el} showlink={showlink} />
        ))}
      </ul>
    </div>
  ) : (
      <div className="unavailable">
        <h3>{data.unit} resources not available yet</h3>
      </div>
    );
}

export default Notes;
