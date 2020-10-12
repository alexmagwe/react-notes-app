import React from 'react';
import { Link} from 'react-router-dom';

// import HomeIcon from '@material-ui/icons/Home';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Button from '@material-ui/core/Button';
// import {Usercontext} from './context'
// import firebase from '../firebase/index' 
import 'firebase/auth'

const Navigation = (props) => {

  
// let {issignedin,setStatus,user}=useContext(Usercontext)
//     const signOutHandler=()=>{
//       firebase.auth().signOut().then(()=>setStatus(false)
//       )
//     }
    return (
            
           <div className='nav' >
              <Link to='/'><Button><HomeRoundedIcon/></Button></Link>
               <ul className='nav-list'>
                {/* {issignedin||user.email?(
                <>
                    <li>
                     <Link to='/contribute'><Button>Contribute</Button></Link>
                    </li>
                    <li>
                       <Button onClick={signOutHandler}>Logout</Button>
                    </li>
                   </>)
                   :(<>
                      <li>
                        <Link style={navstyle}  to= '/login' ><Button>Login</Button></Link>
                      </li>
                      <li>
                        <Link style={navstyle} to='/contribute'><Button>Contribute</Button></Link>
                     </li>
                </>
                   )
                
                } */}
                       <li>
                           <Link to='/about'>
                           <Button>About</Button></Link>
                    </li>
                      <li>
                        <Link to='/contribute'><Button>Contribute</Button></Link>
                     </li>

               </ul>
           </div>
         
       
    
 
    );
};

export default Navigation;
