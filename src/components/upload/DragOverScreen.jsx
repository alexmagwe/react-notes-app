import { grey } from '@material-ui/core/colors'
import React from 'react'
import plus from '../../images/icons/plus.png'
function DragOverScreen() {
    const classes = {
        container: {
            width: '100%',
            position: 'absolute',
            height: '100%',
            top:'0',
            left:'0',
            display: 'flex',
            justifyContent: 'center',
            zIndex:'100',
            alignItems: 'center',
            backgroundColor: '#fff8',
        },
        icon: {
            objectFit: 'cover',
            width: '50px',
        }
    }
    return (
        <div style={classes.container}>
            {/* <img style={classes.icon}  className='center-30' src={plus} alt='&#43' /> */}
        </div>
    )
}

export default DragOverScreen
