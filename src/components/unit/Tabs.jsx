import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Notes from "../notes/notes";
import useStyles from "./styles";
import { isEmpty } from "../../helpers";

const tabinfo = [
  { label: "notes", category: "document" },
  { label: "assignments", category: "assignment" },
  { label: "videos", category: "video" },
];
function Tabs(props) {
  const data = props.properties;
  const [active, setActive] = useState(0);
  const styles = useStyles();
  const [activeData, setActiveData] = useState({ category: "", resources: [] });
  const handleClick = (i) => {
    setActive(i);
  };
  useEffect(() => {
    if (!isEmpty(data)) {
      setActiveData({
        category: tabinfo[active].category,
        resources: data.notes[tabinfo[active].category],
      });
    }
  }, [active, data, setActiveData]);
  return (
    <div className="notes-section">
      <ul className="tab-navigation font-primary font-16">
        {tabinfo.map((tab, i) => (
          <Button
            key={i}
            className={styles.tabNav}
            onClick={() => {
              handleClick(i);
            }}
          >
            <li className="tab-nav-item font" key={i}>
              {tab.label}
              <span
                className={active === i ? "active slider" : "slider"}
              ></span>
            </li>
          </Button>
        ))}
      </ul>

      {!isEmpty(data) ? (
        <div className="notes-container">
          <Notes showlink={true} currentData={activeData} />
        </div>
      ) : null}
    </div>
  );
}

export default Tabs;
