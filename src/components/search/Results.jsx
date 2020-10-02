
import React from 'react'
import Button from '@material-ui/core/Button';

function Results(props) {
    const {handleClose,results,ref,desc}={...props.props}
    return (
        <div className='results-container'>
             <ul className='results-list'>{results.map((el,i)=>
                <Button key={i} onClick={()=>handleClose(el)}>
                    <li className='single-result result-text'>
                        <small>{el[ref]}</small>
                        {el[desc]}
                     </li>
                </Button>
                )}
               
            </ul>

        </div>
  
 )}
export default Results

