import React,{useState,useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Radio from './Radio'
import {Categories } from '../../helpers'


function ToUploadItem(props) {
    const {files,index,handleDelete,file}=props.state
    const [category,setCategory]=useState(Categories[0].category)
       useEffect(()=>{
        files[index].category=category        
    },[category,files,index])
    

    return (
       
             <div className='toupload-item' data-key={index}>
                                       <Radio chooseCategory={{category,setCategory}}/>
                                <span className='upload-item-name'>{file.name}</span>
                                <span>
                                    <IconButton key={index} onClick={(e) => handleDelete(e, index)} aria-label="delete" className='margins'>
                                        <DeleteIcon />
                                    </IconButton>
                                </span>
                            </div>
    )
}

export default ToUploadItem
