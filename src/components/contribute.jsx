import React from 'react'
import Button from '@material-ui/core/Button';
import { Redirect,Link } from 'react-router-dom';

function Contribute() {
    let flexbox={
        display:'flex',
        width:'100%',
        flexWrap:'wrap',
        height:'20%',
        alignItems:'center',
        justifyContent:'space-around'

    }
    let card={
        width:'30%',
        textAlign:'center',
        // height:'20%',
        boxShadow:'2px 2px 15px 5px #111',
        paddingTop:'10%'

    }
    return (
        <div>
          <h2>Contribute</h2>
          <div style={flexbox}>
              <div style={card}>
                 <Link to='/upload'> <Button >Add Notes</Button></Link>
              </div>

              <div style={card}>
                 <Link to='/addunits'>
                      <Button >Add Unit</Button>
                      </Link>
                      </div>
          </div>
        </div>
    )
}

export default Contribute
