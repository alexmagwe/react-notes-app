import React,{useEffect,useRef} from 'react'

function Modal(props) {
    let {handleChange,searchTerm,label}={...props.binders}
    const inputref=useRef()
    useEffect(()=>{
        inputref.current.focus()
      },[])

    return (
    <div className='modal-input-box'>
        <label htmlFor='course'>{label}</label>
        <div className='modal'>
            <input ref={inputref} className='modal-input' id='modal-input' name='course' onChange={handleChange} value={searchTerm} />
        </div> 
    </div>
        )   
}

export default Modal
