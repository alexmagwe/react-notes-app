import React from 'react';
import { Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Logo from './logo'
import useStyles from './styles'
import 'firebase/auth'

const Navigation = (props) => {
  const classes=useStyles()


    return (
            
           <div className='nav' >
              <Link to='/'><Button><Logo/></Button></Link>
               <ul className='nav-list'>
                       <li>
                           <Link to='/about'>
                           <Button className={classes.navText}>About</Button></Link>
                    </li>
                      <li>
                        <Link to='/contribute'><Button  className={`${classes.contributeButton} ${classes.navText}`}>Contribute</Button></Link>
                     </li>

               </ul>
           </div>
         
       
    
 
    );
};

export default Navigation;
