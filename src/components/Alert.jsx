import React, { useContext } from 'react'
import Alert from '@material-ui/lab/Alert';
import { Alertcontext } from '../context';

const Alertbox = () => {

    const { alert, setshowAlert } = useContext(Alertcontext)
    return (
        <div class='alert'>
            <Alert onClose={() => { setshowAlert(false) }} severity={alert.type}>{alert.message}</Alert>
        </div>

    )
}
export default Alertbox