import React from 'react'
import Button from '@material-ui/core/Button';
import {Link } from 'react-router-dom';

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
        width:'45%',
        border:"1px solid silver",
        textAlign:'center',
    //    background: "#a8ff78", /* fallback for old browsers */
        // background: "-webkit-linear-gradient(to right, #78ffd6, #a8ff78)", /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #78ffd6, #a8ff78)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        // height:'20%',
        // boxShadow:'2px 2px 15px 5px #111',
        paddingTop:'10%'

    }
    let buttonText={
         fontFamily: "sans-serif, Helvetica , monospace",
    fontWeight: "700"
    }
let center={
    textAlign:"center",
    marginBottom:"4em"
}

    return (
        <div>
          <h2 style={center}>Improve the site by adding more content</h2>
          <div style={flexbox}>
              <div style={card}>
                 <Link to='/upload'> <Button style={buttonText} >Add Notes</Button></Link>
              </div>

              <div style={card}>
                 <Link to='/addunits'>
                      <Button style={buttonText}>Add Unit</Button>
                      </Link>
                      </div>
          </div>
        </div>
    )
}

export default Contribute
