import { Button } from "@material-ui/core";
import React, { useState, useEffect,useContext } from "react";
import Notes from "../notes/notes";
import useStyles from "./styles";
import {
  Themecontext,
} from "../../context";
import { isEmpty, Categories } from "../../helpers";

function Tabs(props) {
  const data = props.properties;
  const [active, setActive] = useState(0);
  const styles = useStyles();
  let {lighttheme, } = useContext(Themecontext);
  const [activeData, setActiveData] = useState({ category: "", resources: [] });
  const handleClick = (i) => {
    setActive(i);
  };
  useEffect(() => {
    if (!isEmpty(data)) 
    {
      setActiveData({
        category: Categories[active].category,
        resources: data.notes[Categories[active].category], //fil;ter the data by category
      });
    }
  }, [active, data, setActiveData]);
  return (
    <div className={lighttheme?"notes-section ":"notes-section darkMode"}>
      <ul className="tab-navigation font-primary font-16">
        {Categories.map((tab, i) => (
          <Button
            key={i}
            className={lighttheme?styles.tabNav:styles.tabNavDark}
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
        <div className={lighttheme?"notes-container lightMode":"notes-container darkMode"}>
          <Notes showlink={true} currentData={activeData} />
        </div>
      ) :null}
    </div>
  );
}

export default Tabs;
