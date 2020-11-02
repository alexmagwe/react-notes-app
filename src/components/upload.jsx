import React,{useEffect,useState,useContext,useRef} from 'react'
import Button from '@material-ui/core/Button';
import {useUploadFile} from './hooks/myhooks';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ProgressBar from './ProgressBar'
import  axios from 'axios';
import {isEmpty} from './helpers'
import {Searchcontext,Loadingcontext,Datacontext} from './context'
import Results from './search/Results'
import {allUnitsUrl,addNotesUrl,uploadUrl} from './urls'
import {useSearch} from './hooks/myhooks'

function Upload() {
    let [ref,desc]=['unit','name']
    const [history,setHistory]=useState({})
    const[files,bindFiles,removeFile,resetFiles]=useUploadFile([])
    const [uploadedfiles,setUploadedfiles]=useState([]);
    const[progress,setProgress]=useState(0);
    const [unitCode,setUnitCode]=useState('')
    const {setLoading}=useContext(Loadingcontext)
    const {selected,setSelected}=useContext(Searchcontext)
    const {data,setData}=useContext(Datacontext)
    const [results, setResults] = useState([])
    const [value, setValue] = useState('')



    let inputref=useRef()

    const [searchTerm,setSearchTerm]=useState('')
    
    useSearch(searchTerm,data,setResults,'code')

    useEffect(()=>{
      if (isEmpty(data)){
          axios.get(allUnitsUrl).then(res=>setData(res.data)).catch(err=>{alert(err)})
      }
      setLoading(false)
      inputref.current.focus()
        },[data,setData,setLoading])

    useEffect(()=>{
        if (!isEmpty(selected)){
        setUnitCode(selected.code)}


    },[selected])

      useEffect(()=>{
        return ()=>{
            setSelected(history)//set historical selcted value from landing page
        }
    },[history,setSelected])
    //RUNS AFTER FILES HAVE BEEN UPOADED IT UPDATES THE SERVER WITH THE NOTES  UPLOADED
    useEffect(()=>{
        if(uploadedfiles.length>0){
            setLoading(true)
            let payload={"notes":uploadedfiles,"unit_code":unitCode.toUpperCase()}
            axios.post(addNotesUrl,payload).then(resp=>{
            setLoading(false)
            setProgress(0)
            setSelected({})
        }).catch(err=>{alert(err)
        setLoading(false)}
        )
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[uploadedfiles,setLoading])
    async function serverupload(){
        const formData=new FormData()
        files.forEach(file=>formData.append('notes',file))

        try{
        let res=await axios.post(uploadUrl,formData,{
                headers:{"Content-Type":"multipart/form-data",
                    "unit_code":unitCode},onUploadProgress:snap=>{
                    let prog=Math.round(snap.loaded/snap.total*100)
                    setProgress(prog)
                    }       
                })
            return res  
        }
        catch(err){
            alert(err)
        }
    }
    const handleSubmit=async e=>{
        e.preventDefault()
       
    if (files.length>0){
         let res=await serverupload()
        if (res.status===200){
            setUploadedfiles(res.data)
            resetFiles()
        
        }
    }

    }
    const handleDelete=(e,i)=>{
        console.log(i)
        removeFile(i)
    }

    const handleChange=(e)=>{
        setSearchTerm(e.target.value)
        setValue(e.target.value)//to 
    }

    const handleClose = (el) => {  
        let prev=selected
        setHistory(prev)     
        setSelected(el)
        
        setValue(el.code)
        setResults([])
   };

    
    return (
        <div className='upload-container'>
            <h2 className='upload-header'> Contribute by Adding notes</h2>  
            <div className='upload-flexbox'>
                <form className='upload-form' onSubmit={handleSubmit}>      
                    <input id='unit' ref={inputref} placeholder={ref} className='upload-input' value={value} onChange={handleChange} oninvalid="inputref.current.setCustomValidity('Please enter the unit for the files')" required type='text'/>
                    {results.length>0 && searchTerm.length>0?(<Results props={{handleClose,results,ref,desc}}/>):null}
 
                   <input className='hide' id='add_file' type='file' {...bindFiles} multiple/>
                    <label className='upload-file-label' htmlFor='add_file' ><Button variant='outlined' className='buttontext' component='span'>&#43;</Button></label>
                    <Button variant='contained' aria-label='upload button' color='primary' type='submit'>Upload</Button>                
                    <ProgressBar value={progress}/>
                    </form>
                {files.length>0?(
                <div className='toupload-container'>
                        {files.map((book,i)=>(
                        <div className='toupload-item' data-key={i} key={i}>
                            <span  className='upload-item-name'>{book.name}</span> 
                                <span>
                                <IconButton key={i} data-key={i} onClick={(e)=>handleDelete(e,i)} aria-label="delete" className='margins'>
                                    <DeleteIcon />
                                </IconButton>
                                </span>
                            </div>
                        ))}
                </div> ):null}
        </div>
    </div>
    )
    }

export default Upload
