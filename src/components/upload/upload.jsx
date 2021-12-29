import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback
} from 'react'
import Button from '@material-ui/core/Button'
import { useUploadFile, useSearch } from '../hooks'
import ProgressBar from './ProgressBar'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Loadingcontext, Datacontext,Alertcontext } from '../../context'
import Results from '../search/Results'
import { addContentUrl, uploadUrl, unitNotesUrl } from '../api/urls'
import NoteItem from '../notes/NoteItem'
import { useDropzone } from 'react-dropzone'
import DragOverScreen from './DragOverScreen'
import ToUploadItem from './ToUploadItem'

const useStyles = makeStyles(theme => ({
  addBtn: {
    backgroundColor: '#71e1f0'
  }
}))

function Upload () {
  const classes = useStyles()
  let [reference, desc] = ['unit', 'name']
  const [
    files,
    bindFiles,
    isValid,
    handleDropFiles,
    removeFile,
    resetFiles
  ] = useUploadFile([])
  const [uploadedfiles, setUploadedfiles] = useState([])
  const [progress, setProgress] = useState(0)
  //disable upload button after submission
  const [disable, setDisable] = useState(false)
  const [unitCode, setUnitCode] = useState('')
  const { setLoading, setLoaderBackground } = useContext(Loadingcontext)
  const { setAlert,setShowAlert } = useContext(Alertcontext)
  const [selected, setSelected] = useState(null)
  const { data, setData } = useContext(Datacontext)
  const [results, setResults] = useState([])
  const [value, setValue] = useState('')
  const [notes, setNotes] = useState([])
  const [uploaded, setUploaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const onDrop = useCallback(
    acceptedFiles => {
      let validFiles = []
      // acceptedFiles.reverse()
      acceptedFiles.forEach(file => {
        if (isValid(file.name)) {
          validFiles.push(file)
        }
      })

      handleDropFiles(validFiles)
    },
    [isValid, handleDropFiles]
  )
  const { getRootProps, isDragActive } = useDropzone({
    onDrop
  })
  let inputref = useRef()

  useSearch(searchTerm, data, setResults, 'code')
  useEffect(() => {
    inputref.current.focus()

    setLoading(false)
  }, [data, setData, setLoading])
  //get current files from server
  useEffect(() => {
    if (selected || uploaded) {
      //update current files after selection and after upload
      setUnitCode(selected.code)
      let data = { unit_code: selected.code }
      // console.log(data)
      setLoading(true)
      axios
        .post(unitNotesUrl, data)
        .then(res => {
          const { document, video, assignment } = res.data.message.notes //res.data.notes is an object which we want to destructure to a list
          const allfiles = [...document, ...video, ...assignment]
          setNotes(allfiles)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          setAlert({message:err.message,type:"error"}) 
          setShowAlert(true) 
     })
    }
  }, [selected, uploaded, setLoading,setAlert,setShowAlert])

  useEffect(() => {
    setLoaderBackground('vague')
    return () => {
      setLoaderBackground('dark')
      setNotes({})
      setSelected(null)
    }
  }, [setLoaderBackground, setSelected])
  //RUNS AFTER FILES HAVE BEEN UPLOADED IT UPDATES THE SERVER WITH THE NOTES  UPLOADED
  useEffect(() => {
    if (uploadedfiles.length > 0) {
      setLoading(true)

      let payload = { files: uploadedfiles, unit_code: unitCode.toUpperCase() }
      axios
        .post(addContentUrl, payload)
        .then(resp => {
          setProgress(0)
          setUploaded(true)
          setDisable(false)
          setAlert({message:'Files added successfully',type:"success"}) 
          setShowAlert(true) 

        })
        .catch(err => {
          setLoading(false)
          setAlert({message:err.message,type:"error"}) 
          setShowAlert(true) 
          setDisable(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedfiles, setLoading])
  async function serverupload () {
    const formData = new FormData()
    let filescopy = [...files]
    filescopy.forEach(file => formData.append('notes', file))

    try {
      let res = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          unit_code: unitCode
        },
        onUploadProgress: snap => {
          let prog = Math.round((snap.loaded / snap.total) * 100)
          setProgress(prog)
        }
      })
      return res
    } catch (err) {
      setAlert({message:err.message,type:"error"}) 
      setShowAlert(true) 
      setDisable(false)
      return
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (files.length > 0) {
      setDisable(val => !val)
      let res = await serverupload()
      if (res && res.status === 200) {
        let data = res.data
        //asigns a categoru to each uploaded file
        await files.forEach((file, index) => {
          data[index].category = file.category
        })
        setUploadedfiles(data)
        resetFiles()
      }
    }
  }
  const handleDelete = (e, i) => {
    removeFile(i)
  }

  const handleChange = e => {
    setSearchTerm(e.target.value)
    setValue(e.target.value) //to
  }

  const handleClose = el => {
    setSelected(el)
    setValue(el.code)
    setResults([])
  }

  return (
    <div {...getRootProps()} className='upload-container'>
      {isDragActive ? <DragOverScreen /> : null}
      <h2 className='upload-header text-secondary'>
        {' '}
        Contribute by Adding notes
      </h2>

      <div className='upload-flexbox'>
        <form className='upload-form' onSubmit={handleSubmit}>
          <input
            id='unit'
            ref={inputref}
            placeholder={reference}
            className='upload-input'
            value={value}
            onChange={handleChange}
            onInvalid={() =>
              inputref.current.setCustomValidity(
                'Please enter the unit for the files'
              )
            }
            required
            type='text'
          />
          {results.length > 0 && searchTerm.length > 0 ? (
            <Results props={{ handleClose, results, reference, desc }} />
          ) : null}
          <input
            className='hide'
            id='add_file'
            type='file'
            {...bindFiles}
            multiple
          />
          <label className='upload-file-label' htmlFor='add_file'>
            <Button
              variant='contained'
              className={classes.addBtn}
              component='span'
            >
              &#43;
            </Button>
          </label>
          <Button
            variant='contained'
            disabled={disable}
            aria-label='upload button'
            color='primary'
            type='submit'
          >
            Upload
          </Button>
          <ProgressBar value={progress} />
        </form>
        {files.length > 0 ? (
          <div className='toupload-container'>
            {files.map((file, index) => (
              <ToUploadItem
                key={index}
                state={{ files, index, handleDelete, file }}
              />
            ))}
          </div>
        ) : null}
        {notes.length > 0 ? (
          <ul className='current-files-list'>
            <h3 className='faded'>
              Current available resources for {unitCode}
            </h3>
            {notes.map((note, i) => (
              <NoteItem key={i} item={note} showlink={true} />
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default Upload
