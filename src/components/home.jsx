import React,{useEffect} from 'react';
import Notes from './notes'
import Counter from './counter';
const Home = () => {
useEffect(() => {
        console.log('reloading')
 
})
    return (
        <div className='home'>
            <h1>Home</h1>
        <Counter/>
        </div>
    );
};

export default Home;
