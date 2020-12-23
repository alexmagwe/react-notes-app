import React from 'react'
import plus from '../../images/icons/plus.png'
function DragOverScreen() {
    const classes = {
        container: {
            width: '100%',
            position: 'absolute',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            zIndex:'100000',
            alignItems: 'center',
            backgroundColor: '#1117',
            boxShadow: '0 0 10000 #1118',
        },
        icon: {
            objectFit: 'cover',
            width: '50px',
        }
    }
    return (
        <div style={classes.container}>
            <img style={classes.icon}  className='center-30' src={plus} alt='&#43' />
        </div>
    )
}

export default DragOverScreen
