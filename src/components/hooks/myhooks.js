import { useState } from 'react'

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
    const bindFiles = {
        files,
        onChange: e => { setFiles([...files, ...e.target.files]);
            console.log(files) }
    }


    return [files, bindFiles, resetFiles]
}