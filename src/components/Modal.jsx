import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


function Modal(props) {
    const {open,value,handleChange,label}=props.psd
    return (
    <>
        <label htmlFor='course'>{label}</label>
        <div className='modal'>
            <input autoFocus className='modal-input' id='modal-input' name='course' onChange={handleChange} value={value} />
        </div> 
    </>
        )   
}

export default Modal
