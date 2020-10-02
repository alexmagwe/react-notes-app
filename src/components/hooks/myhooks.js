
import { useState,useEffect } from 'react'
import {Search} from '../helpers'

export function useControlledInput(initial = "") {
    
    const [value, setValue] = useState(initial)
    const resetValue = () => {
        setValue(initial)
    }
    const bindValue = {
        value,
        onChange: e => { setValue(e.target.value) }
    }
    return [value, bindValue, resetValue]
}

export function useUploadFile(initial = []) {
    
    const [files, setFiles] = useState(initial)
    const resetFiles = () => {
        setFiles(initial)
    }
    const removeFile = (i) => {
        let copy = [...files]
        copy.splice(i, 1)
        setFiles(copy)
    }
    const bindFiles = {
        files,
        onChange: e => {setFiles([...files, ...e.target.files]);
        }
    }


    return [files, bindFiles, removeFile, resetFiles]
}


export const useSearch=(value,source,setResults,category,min=2)=>{

    useEffect(()=>{
        if (value.length>=min){
            let results=Search(value,source,category)
            setResults(results)

        }
},[value,source,category,setResults,min])

}


