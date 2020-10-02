import React,{useState,useEffect}from 'react';
import Search from '../search/Search.jsx'
import { Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const Landing = () => {
let url='/units/all'
const [data,setData] = useState()
 
useEffect(() => {
    axios.get(url).then(resp=>setData(resp.data))
    
    },[url])
   
useEffect(() => {
    console.log(data)
    
    },[data])
   
    return (
        <div className='landing'>
            <Search source={data}/>
            <div className='hero-banner'>
                <h2 className='hero-header'>Sign in to access personalized content</h2>
              <Link to='/login'>  <Button variant="contained" color="primary"> Sign in</Button></Link>
            </div>
        </div>
    );
};

export default Landing;
