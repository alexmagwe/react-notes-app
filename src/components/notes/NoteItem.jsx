import React from "react";
import Button from "@material-ui/core/Button";
import Link from "../../images/icons/linkDark.png";
import Downloadicon from "../../images/icons/downloadIcon.png";
import { getLinks } from "../../helpers";

function NoteItem(props) {
  const note = props.item;
  const showlink = props.showlink;
  let name=note.name
  let ext=".pdf"
  const nameparts= note.name.split(".");
  if(nameparts.length>1){
    ext=nameparts[nameparts.length-1]
    name=nameparts.slice(0,nameparts.length-1)
    name=name.join(".")
  }
  let {icon,link,downloadLink} = getLinks({ext:ext,gid:note.gid || note.id,category:note.category});
  
  return (
    <>
      <li
        className={props.highlight ? "highlight notes-item" : "notes-item"}
        key={note.id}
      >
        <div className="left-item-section">
          {icon ? <img className="icon" src={icon} alt="" /> : null}
          <h4 className="notes-name">{name.toLowerCase()}</h4>
        </div>
        <div className="right-item-section">
          {note.size ? <h4>{parseInt(note.size) / 1024}</h4> : null}
          {showlink && (note.gid || note.id) && (
            <Button
              href={link}
              target="_blank"
            >
              <img className="link-icon" src={Link} alt="view" />
            </Button>
          )}
          {note.link && note.link.length > 0 && (
            <Button href={`${note.link}`} target="_blank">
              <img className="link-icon" src={Link} alt="view" />
            </Button>
          )}

          {note.category !== "video" ? (
            <Button
              target="_blank"
              href={downloadLink}
            >
              <img className="link-icon" src={Downloadicon} alt="download" />
            </Button>
          ) : null}
        </div>
      </li>
    </>
  );
}

export default NoteItem;
