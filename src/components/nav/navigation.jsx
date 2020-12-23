import React from 'react';
import { Link} from 'react-router-dom';
import useStyles from './styles'
// import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Button from '@material-ui/core/Button';
import banner from '../../images/banner.png'
const Navigation = (props) => {
  let styles=useStyles()

    return (
            
           <div className='nav' >
              <Link to='/' ><Button><img className={styles.navHomeIcon} src={banner} alt='HOME'/></Button></Link>
               <ul className='nav-list'>
 
                       <li>
                           <Link className={styles.navLink} to='/about'>
                           About</Link>
                    </li>
                      <li>
                        <Link className={styles.navLink} to='/contribute'>Contribute</Link>
                     </li>

               </ul>
           </div>
         
       
    
 
    );
};

export default Navigation;
