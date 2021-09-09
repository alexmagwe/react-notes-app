import React, { useContext } from 'react'
import Alert from '@material-ui/lab/Alert';
import { Alertcontext } from '../context';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Alertbox = (props) => {
    //alert types:warning,error,success,info
    const { alert, setShowAlert } = useContext(Alertcontext)
    return (
        <div {...props} className='alert'>
            <Alert onClose={() => { setShowAlert(false) }} severity={alert.type}>{alert.message}</Alert>
        </div>
    )
}
export default Alertbox