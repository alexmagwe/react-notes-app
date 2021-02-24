import React from "react";
import Button from "@material-ui/core/Button";
import Link from "../../images/icons/link.svg";
import Downloadicon from '../../images/icons/downloadicon.png'
import { geticonLink } from "../../helpers";
function NoteItem(props) {
  const note = props.item;
  const showlink = props.showlink;
  const [name, ext] = note.name.split(".");
  const icon = geticonLink(ext);
  return (
    <>
      <li className="notes-item" key={note.id}>
        <div class='left-item-section'>
          {icon ? <img className='icon' src={icon} alt="" /> : null}
          <h4 className="notes-name">{name.toLowerCase()}</h4>
        </div>
        <div className='right-item-section'>
        {note.size ? <h4>{parseInt(note.size) / 1024}</h4> : null}
        {showlink ? (
          <Button
          href={`https://drive.google.com/file/d/${note.gid}/view`}
          target="_blank"
          >
            <img className="link-icon" src={Link} alt="view" />
          </Button>
        ) : null}
  
          <Button target="_blank" href={`https://drive.google.com/uc?id=${note.gid}&export=download`}>
            <img className="link-icon" src={Downloadicon} alt="download" />

          </Button>
        </div>
      </li>
    </>
  );
}

export default NoteItem;
