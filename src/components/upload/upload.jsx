import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import Button from '@material-ui/core/Button';
import { useUploadFile,useSearch} from '../hooks';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ProgressBar from './ProgressBar'
import ReactGA from 'react-ga'
import axios from 'axios';
import { isEmpty } from '../../helpers'
import { Loadingcontext, Datacontext } from '../../context'
import Results from '../search/Results'
import { allUnitsUrl, addNotesUrl, uploadUrl, unitNotesUrl } from '../api/urls'
import NoteItem from '../notes/NoteItem';
import { useDropzone } from 'react-dropzone'
import DragOverScreen from './DragOverScreen'

function Upload() {
    let [ref, desc] = ['unit', 'name']
    const [files, bindFiles, isValid,handleDropFiles, removeFile, resetFiles,] = useUploadFile([])
    const [uploadedfiles, setUploadedfiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [unitCode, setUnitCode] = useState('')
    const { setLoading, setLoaderBackground } = useContext(Loadingcontext)
    const [selected, setSelected] = useState(null)
    const { data, setData } = useContext(Datacontext)
    const [results, setResults] = useState([])
    const [value, setValue] = useState('')
    const [notes, setNotes] = useState([])
    const [uploaded, setUploaded] = useState(false)

    const onDrop = useCallback(acceptedFiles => {
        let validFiles = []
        acceptedFiles.forEach(file => {
            if (isValid(file.name)) {
                validFiles.push(file)
            }
        })

        handleDropFiles(validFiles)
    }, [isValid,handleDropFiles])
    const { getRootProps, isDragActive } = useDropzone({
        onDrop
    })


    let inputref = useRef()

    const [searchTerm, setSearchTerm] = useState('')

    useSearch(searchTerm, data, setResults, 'code')
    useEffect(() => {
        if (isEmpty(data)) {
            setLoading(true)
            axios.get(allUnitsUrl).then(res => {
                setData(res.data)
                setLoading(false)
            }

            ).catch(err => {
                setLoading(false)
                alert(err)
            })
        }
        inputref.current.focus()
    }, [data, setData, setLoading])

    useEffect(() => {
        if (selected || uploaded) {
            setUnitCode(selected.code)
            let data = { "unit_code": selected.code }
            setLoading(true)
            axios.post(unitNotesUrl, data)
                .then(res => {
                    setNotes(res.data)
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                    alert(err)
                })
        }


    }, [selected, uploaded, setLoading])

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
            let payload = { "notes": uploadedfiles, "unit_code": unitCode.toUpperCase() }
            axios.post(addNotesUrl, payload).then(resp => {
                setProgress(0)
                setUploaded(true)
            }).catch(err => {
                alert(err)
                setLoading(false)
            }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedfiles, setLoading])
    async function serverupload() {
        const formData = new FormData()
        let filescopy = [...files]
        filescopy.forEach(file => formData.append('notes', file))

        try {
            let res = await axios.post(uploadUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "unit_code": unitCode
                }, onUploadProgress: snap => {
                    let prog = Math.round(snap.loaded / snap.total * 100)
                    setProgress(prog)
                }
            })
            return res
        }
        catch (err) {
            alert(err)
        }
    }
    const handleSubmit = async e => {
        e.preventDefault()
        ReactGA.event({
            category:'Button',
            action:'someone uploaded notes'
        });
        if (files.length > 0) {
            let res = await serverupload()
            if (res.status === 200) {
                setUploadedfiles(res.data)
                resetFiles()

            }
        }

    }
    const handleDelete = (e, i) => {
        removeFile(i)
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
        setValue(e.target.value)//to 
    }

    const handleClose = (el) => {
        setSelected(el)
        setValue(el.code)
        setResults([])
    };


    return (
        <div {...getRootProps()} className='upload-container'>
            {
                isDragActive ?
                    <DragOverScreen /> : null
            }
            <h2 className='upload-header text-secondary'> Contribute by Adding notes</h2>

            <div className='upload-flexbox'>
                <form className='upload-form' onSubmit={handleSubmit}>
                    <input id='unit' ref={inputref} placeholder={ref} className='upload-input'
                        value={value} onChange={handleChange} onInvalid={() => inputref.current.setCustomValidity('Please enter the unit for the files')} required type='text' />
                    {results.length > 0 && searchTerm.length > 0 ? (<Results props={{ handleClose, results, ref, desc }} />) : null}
                    <input className='hide' id='add_file' type='file' {...bindFiles} multiple />
                    <label className='upload-file-label' htmlFor='add_file' ><Button variant='outlined' className='buttontext' component='span'>&#43;</Button></label>
                    <Button variant='contained' aria-label='upload button' color='primary' type='submit'>Upload</Button>
                    <ProgressBar value={progress} />
                </form>
                {files.length > 0 ? (
                    <div className='toupload-container'>
                        {files.map((book, i) => (
                            <div className='toupload-item' data-key={i} key={i}>
                                <span className='upload-item-name'>{book.name}</span>
                                <span>
                                    <IconButton key={i} data-key={i} onClick={(e) => handleDelete(e, i)} aria-label="delete" className='margins'>
                                        <DeleteIcon />
                                    </IconButton>
                                </span>
                            </div>
                        ))}
                    </div>) : null}
                {!isEmpty(notes) && notes.notes.length > 0 ?
                    (<ul className='current-files-list'>
                        <h3 className='faded'>Current available resources for {unitCode}</h3>
                        {notes.notes.map((note, i) => <NoteItem key={i} item={note} showlink={false} />)}
                    </ul>)
                    : null
                }
                {/* <input {...getInputProps()} /> */}


            </div>
        </div>
    )
}

export default Upload
