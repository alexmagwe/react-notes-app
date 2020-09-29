
import React from 'react'
import Button from '@material-ui/core/Button';

function Results(props) {
    const {handleClose,matched}={...props.props}
    return (
        <div>
             <ul className='search-box'>{matched.map((el,i)=>
                <Button key={i} onClick={()=>handleClose(el)}>{el.name}</Button>)}
            </ul>

        </div>
  
 )}
export default Results

