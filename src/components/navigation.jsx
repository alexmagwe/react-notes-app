import React from 'react';
import { Link} from 'react-router-dom';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Button from '@material-ui/core/Button';
import 'firebase/auth'

const Navigation = (props) => {

    return (
            
           <div className='nav' >
              <Link to='/'><Button><HomeRoundedIcon/></Button></Link>
               <ul className='nav-list'>
 
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
