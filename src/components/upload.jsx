import React,{useEffect,useState} from 'react'
import {store} from '../firebase'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import {useControlledInput,useUploadFile} from './hooks/myhooks';


function Upload() {
const[value,bindValue,resetValue]=useControlledInput('')
const[files,bindFiles,resetFiles]=useUploadFile([])

const styles={
    
hide:{
    display:'none'
},
buttontext:{
    fontWeight:'bold'},
form:{
    display:'flex',
justifyContent:'center',
    alignItems:'center',
    flexWrap:'wrap',
    // height:'50vh',
    width:'30%',
    // border:'1px solid red',
    position:'relative',
    // flexDirection:'column',
    padding:'1em'

},
flexbox:{
        display:'flex',
        padding:'1em 5em',
        width:'100%',
        margin:'auto',
        flexWrap:'wrap',
        flexDirection:'column',
        alignItems:'cenTer',
        justifyContent:'space-between   '

    },
input:{
    textTransform:'uppercase', 
    margin:'1em'
},
upload:{
    position:'relative',
    bottom:'0',
    margin:'1em',
    left:'0'
    
},
header:{
    marginBottom:'1em',
textAlign:'center'
},
container:{
paddingTop:'3%'},

center:{textAlign:'center'}
}

useEffect(()=>{
    console.log(files)
},[files])
// let [file,setFile]=useState({})
const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(value.toUpperCase())
    // handleupload(files)

    resetValue()
    resetFiles()
}

    let textstyles={
        textAlign:'center'
    }
  
    return (
        <div style={styles.container}>
<h2 style={styles.header}> Contribute by Adding notes</h2>  
<div style={styles.flexbox}>
    <form style={styles.form} onSubmit={handleSubmit}>      
    <label for='unit'>Unit Acronym</label>
    <input id='unit'placeholder='SPH_101' style={styles.input} {...bindValue} type='text'/>
    <input style={styles.hide} id='add_file' type='file' accept='file_extensions|pdf,docx'{...bindFiles} multiple/>
        <label htmlFor='add_file' ><Button variant='outlined' className={styles.buttontext} component='span'>&#43;</Button></label>
        <Button style={styles.upload}variant='outlined' aria-label='upload button'color='primary' type='submit' startIcon={<CloudUploadIcon />}>upload</Button>
 </form>
 
{/* <h3>{file.name}</h3> */}
    {files.length>0?(<ul>{files.map((book,i)=>(<li styles={textstyles} key={i}>{book.name}</li>))}</ul>):null}
</div>
</div>
    )
    }

export default Upload
