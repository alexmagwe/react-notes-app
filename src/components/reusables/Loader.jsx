import React,{useContext} from 'react'
import {Loadingcontext} from '../../context'
// import { CircleToBlockLoading } from 'react-loadingg';
// import { TransverseLoading } from 'react-loadingg';

import {MagicSpinner} from "react-spinners-kit";
function Loader(props) {
    let bg=props.bg
    let {loading}=useContext(Loadingcontext)
    return (
    <div className={loading?`loading ${bg}-bg`:"loading loading-closed"}>
        <MagicSpinner size={100} color='skyblue' loading={loading}/>
    </div> 
    )
}

export default Loader
