import React from "react";
import NoteItem from "./NoteItem";
function Notes(props) {
  const data = props.currentData;
  const resources = data.resources;
  let showlink = props.showlink;

  return resources.length > 0 ? (
    <div className="notes">
      <ul className="notes-list">
        {resources.map((el, i) => (
          <NoteItem key={i} item={el} showlink={showlink} />
        ))}
      </ul>
    </div>
  ) : null;
}

export default Notes;
