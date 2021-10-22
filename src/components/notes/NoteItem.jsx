import React from "react";
import Button from "@material-ui/core/Button";
import Link from "../../images/icons/link.svg";
import Downloadicon from "../../images/icons/downloadicon.png";
import { geticonLink } from "../../helpers";

function NoteItem(props) {
  const note = props.item;
  const showlink = props.showlink;
  const [name, ext] = note.name.split(".");
  let icon = null;
  icon = geticonLink(ext);
  if (note.category === "video") {
    icon =
      "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.video";
  }

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
          {showlink && note.gid && (
            <Button
              href={`https://drive.google.com/file/d/${note.gid}/view`}
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
              href={`https://drive.google.com/uc?id=${note.gid}&export=download`}
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
