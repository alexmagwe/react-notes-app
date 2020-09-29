import React,{useEffect} from 'react';
import SearchBar from '../SearchBar.jsx'
import Counter from '../counter';
import { Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Home = () => {
 
    return (
        <div className='home'>
            <SearchBar/>
            <div className='hero-banner'>
                <h2 className='hero-header'>Sign in to access personalized content</h2>
              <Link to='/login'>  <Button variant="contained" color="primary"> Sign in</Button></Link>
            </div>
        </div>
    );
};

export default Home;
