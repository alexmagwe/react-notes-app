import { useState, useEffect } from 'react'
import { Search } from '../../helpers'
const allowedExts = ['pdf', 'docx', 'txt', 'epub', 'ppt', 'doc', 'pptx']
export function useControlledInput (initial = '') {
  const [value, setValue] = useState(initial)
  const resetValue = () => {
    setValue(initial)
  }
  const bindValue = {
    value,
    onChange: e => {
      setValue(e.target.value)
    }
  }
  return [value, bindValue, resetValue]
}

export function useUploadFile (initial = []) {
  const [files, setFiles] = useState(initial)
  const resetFiles = () => {
    setFiles(initial)
  }
  //find duplicates
  const exists = dropfile => {
    let exists = false
    files.map(el => {
      if (dropfile.name === el.name) exists = true
      return false
    })
    return exists
  }
  const handleDropFiles = dropfiles => {
    const filteredFiles = []
    if (files.length === 0) {
      setFiles([...dropfiles])
      return
    }

    dropfiles.map(file => {
      if (!exists(file)) {
        filteredFiles.push(file)
      }
      return file
    })
    setFiles([...files, ...filteredFiles])
  }

  const removeFile = i => {
    let copy = [...files]
    copy.splice(i, 1)
    setFiles(copy)
  }
  const isValid = name => {
    let fileExt = name.split('.').pop()
    return allowedExts.includes(fileExt)
  }
  const bindFiles = {
    files,
    onChange: e => {
      let valid = []
      let filelist = [...e.target.files]
      filelist.forEach(file => {
        if (isValid(file.name) & !exists(file)) {
          valid.push(file)
        }
        setFiles([...files, ...valid])
      })
    }
  }

  return [files, bindFiles, isValid, handleDropFiles, removeFile, resetFiles]
}

export const useSearch = (value, source, setResults, category, min = 2) => {
  useEffect(() => {
    if (value.length >= min) {
      let newvalue = value.replace(/\s/gi, '') //remove whitespaces
      let results = Search(newvalue, source, category)
      setResults(results)
    } else if (value.length === 0) setResults([])

    // else if setResults
  }, [value, source, category, setResults, min])
}
