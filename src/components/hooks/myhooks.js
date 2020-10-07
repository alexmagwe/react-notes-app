
import { useState,useEffect } from 'react'
import {Search} from '../helpers'
const allowedExts=['pdf','docx','txt','epub','ppt','doc','pptx']
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
    const isValid=(name)=>{
        let fileExt = name.split('.').pop();
        return allowedExts.includes(fileExt)
      
    }
    const bindFiles = {
        files,
        onChange: e => {
            let valid=[]
            let filelist=[...e.target.files]
            console.log(filelist)
            filelist.forEach(file=>{
                if (isValid(file.name)){
                    valid.push(file)
                }
            setFiles([...files,...valid])
            })
        }
    }


    return [files, bindFiles, removeFile, resetFiles,isValid]
}


export const useSearch=(value,source,setResults,category,min=2)=>{

    useEffect(()=>{
        if (value.length>=min){
            let results=Search(value,source,category)
            setResults(results)

        }
},[value,source,category,setResults,min])

}


