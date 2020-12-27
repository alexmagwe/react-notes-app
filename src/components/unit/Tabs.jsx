import { Button } from "@material-ui/core";
import React, { useState,useEffect } from "react";
import Notes from "../notes/notes";
import useStyles from './styles'
import { isEmpty } from "../../helpers";

function Tabs(props) {
  const tablabels = ["notes", "assignments", "videos"];
  const [active, setActive] = useState(0);
  const styles=useStyles()
  const data=props.properties
    const handleClick=(i)=>{
        setActive(i)
    }
    useEffect(() => {
        console.log('data in tabs',data)
      
    }, [data,props])
  return (
    <div>
      <ul className='tab-navigation font-primary font-16'>
        {tablabels.map((label, i) => (
          <Button key={i}className={styles.tabNav}onClick={()=>{handleClick(i)}}>
          <li  className='tab-nav-item font' key={i}>{label}
          <span className={active===i?'active slider':'slider'}></span>
          </li>
        </Button>
        ))}
      </ul>

     {!isEmpty(data)?(
         <div className='notes-container'>
          <Notes showlink={true} properties={data}/>
      </div>):null
     }
    </div>
  );
}

export default Tabs;
