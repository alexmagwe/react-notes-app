import React,{useContext} from 'react'
import Button from '@material-ui/core/Button'
import NoteItem from '../notes/NoteItem';
import useStyles from "./styles";

import {
  Themecontext,
} from "../../context";
function Results (props) {
  let {lighttheme, } = useContext(Themecontext);
  const styles = useStyles();

  const { handleClose, results, desc } = { ...props.props }
  return (
    <div className={lighttheme?'results-container lightMode':"results-container darkMode"}>
      <ul className='results-list'>
        {results.map((el, i) => (
          el.kind &&el.kind==="drive#file"?
          (<NoteItem key={i} item={el} showlink={true} />)
          :(<Button className={lighttheme?styles.light:styles.dark} key={i} onClick={() => handleClose(el)}>
            <li className='single-result result-text'>
              <small >{el['code']}</small>
              {el[desc]}
            </li>
          </Button>)
        ))}
      </ul>
    </div>
  )
}
export default Results
