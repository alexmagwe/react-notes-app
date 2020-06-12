import React,{useReducer} from 'react'
import Button from '@material-ui/core/Button';


function Counter() {
    const reducer=(state,action)=>{
 switch(action){
     case 'add':
         return state+1    
    case 'decrement':
        if (state<=0){
            return 0
        }
        else{
        return state-1}
    case 'reset':
        return 0
    default:
        return state
 }   
}
    const initialstate=0
 let[count,dispatch]=useReducer(reducer,initialstate)   
    return (
        <div>
            <div><Button onClick={()=>dispatch('reset')}>reset</Button><Button onClick={()=>dispatch('decrement')}>-</Button><h2>{count}</h2><Button onClick={()=>dispatch('add')}>+</Button></div>
        </div>
    )
}

export default Counter
