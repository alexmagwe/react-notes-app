import React from "react";
import Button from "@material-ui/core/Button";
import Link from "../../images/icons/link.svg";
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
        {note.size ? <h4>{parseInt(note.size) / 1024}</h4> : null}
        {showlink ? (
          <Button
            href={`https://drive.google.com/file/d/${note.gid}/view`}
            target="_blank"
          >
            <img className="link-icon" src={Link} alt="view" />
          </Button>
        ) : null}
        {note.webContentLink ? (
          <Button href={note.webContentLink}>download</Button>
        ) : null}
      </li>
    </>
  );
}

export default NoteItem;
