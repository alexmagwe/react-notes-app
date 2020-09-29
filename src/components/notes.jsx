import React,{useState,useEffect} from 'react'
import {List } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';



function Notes() {
    let[notes,setNotes]=useState([])
    useEffect(()=>{
        fetch('/notes/all').then(resp=>resp.json()).then(data=>{setNotes(data.notes)
        console.log(data.notes)
    })
},[])
    return (
        <div>
     <h2>Notes</h2>
      <List divided verticalAlign='middle'>
          {notes.map(el=>
          <List.Item>
          <List.Content>{el}</List.Content>
          <List.Content floated='right'><Button>Download</Button></List.Content>
          </List.Item>
    )}</List>

  <List.Item>
      <List.Content floated='right'>
        <Button>Add</Button>
      </List.Content>
      <List.Content>Lena</List.Content>
    </List.Item>
    
        </div>
    )
}

export default Notes
