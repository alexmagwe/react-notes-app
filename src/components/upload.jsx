import React,{useEffect,useState} from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import {useControlledInput,useUploadFile} from './hooks/myhooks';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ProgressBar from './ProgressBar'
import  axios from 'axios';
import {storage} from '../firebase'
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import {List } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
function Upload() {
const[unit,bindValue,resetValue]=useControlledInput('')
const[files,bindFiles,removeFile,resetFiles]=useUploadFile([])
const [uploadedfiles,setUploadedfiles]=useState([]);
const[progress,setProgress]=useState(0);
const[urls,setUrls]=useState([])
const [uploading,isUploading]=useState(false);
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
    flexboxh:{
        display:'flex',
        padding:'1em 5em',
        width:'100%',
        margin:'auto',
        flexWrap:'wrap',
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
margins:{
    margin:'10px'
},
header:{
    marginBottom:'1em',
textAlign:'center'
},
container:{
paddingTop:'3%'},

center:{textAlign:'center'},

   textstyles:{
        textAlign:'center'
    }

}
useEffect(()=>{
    console.log('use efect ran:',files)
    
},[files])
useEffect(()=>{
     axios.get('/getids').then(resp=>resp.json()).then(data=>{setUploadedfiles(data.files)})


},[])
// let [file,setFile]=useState({})
const uploadit= file=>{
    console.log("name:",file.name)
    const uploadTask=storage.ref('notes').child(file.name).put(file);
    uploadTask.on('state_changed',snapshot=>{
        let prog=Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100)
    setProgress(prog)
    },
    error=>{
        console.log(error)
    },()=>{
        storage.ref("notes").child(file.name).getDownloadURL()
        .then(url=>{setUrls([...urls,url]);
        setProgress(0);
        })

    })
}
async function serverupload(){
    // try{
    const formData=new FormData()
    console.log(files)
    files.forEach(file=>formData.append('notes',file))
     
    let res=await axios.post('/upload',formData,{
            headers:{"Content-Type":"multipart/form-data",
                unit},onUploadProgress:snap=>{
                let prog=Math.round(snap.loaded/snap.total*100)
                setProgress(prog)
                                               }
})
     
    return res



    
}
const handleSubmit=async e=>{
    e.preventDefault()
    console.log(unit.toUpperCase())

    //  await files.forEach(file=>serverupload(file).then(res=>console.log(res)).catch(err=>console.error(err)))
    let res=await serverupload()
    if (res.status===200){
        resetFiles()
        resetValue()
        setUploadedfiles(res.data.files)
    }
    console.log(typeof res.status)
  
 
  
}
const handleDelete=(e,i)=>{
    // const notes=document.querySelector('#notes')
    console.log(i)
        // notes.childNodes[i].style.opacity='0'
    removeFile(i)
console.log(e.target)
}

  
    return (
        <div style={styles.container}>
<h2 style={styles.header}> Contribute by Adding notes</h2>  
<div style={styles.flexbox}>
    <form style={styles.form} onSubmit={handleSubmit}>      
        <label htmlFor='unit'>Unit code</label>
        <input id='unit' placeholder='eg SPH101' style={styles.input} {...bindValue} required type='text'/>
        <input style={styles.hide} id='add_file' type='file' accept='file_extensions|*/pdf,*/docx'{...bindFiles} multiple/>
        <label htmlFor='add_file' ><Button variant='outlined' style={styles.buttontext}component='span'>&#43;</Button></label>
        <Button style={styles.upload}variant='outlined' aria-label='upload button'color='primary' type='submit' startIcon={<CloudUploadIcon />}>upload</Button>
    </form>
 <ProgressBar value={progress}/>
    {files.length>0?(
    <div id='notes'>
            {files.map((book,i)=>(
            <div style={styles.flexboxh} data-key={i} key={i}>
                <li >{book.name}</li> 
                    <span>
                    <IconButton key={i} data-key={i} onClick={(e)=>handleDelete(e,i)} aria-label="delete" style={styles.margins}>
                        <DeleteIcon />
                    </IconButton>
                    </span>
                </div>
            ))}
            </div> ):null}
        </div>
           {uploadedfiles.length>0?(
           <div>
                <List divided verticalAlign='middle'>
                {uploadedfiles.map(el=>
                <List.Item>
                <List.Content>{el.id}</List.Content>
                <List.Content floated='right'>
                          <a href={`https://drive.google.com/file/d/${el.id}/view`} target="_blank" rel="noopener">view</a>
                </List.Content>
                </List.Item>
                )}</List>)
        </div>):null}
 
    </div>
    )
    }

export default Upload
