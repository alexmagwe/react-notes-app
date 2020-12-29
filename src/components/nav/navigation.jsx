import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles'
// import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Button from '@material-ui/core/Button';
import banner from '../../images/banner.png'
import { Themecontext } from '../../context'

const Navigation = (props) => {
  const { lighttheme } = useContext(Themecontext)
  let styles = useStyles()

  return (

    <div className={lighttheme ? 'nav light-bg' : 'nav'} >
      <Link to='/' ><Button><img className={styles.navHomeIcon} src={banner} alt='HOME' /></Button></Link>
      <ul className='nav-list'>

        <li>
          <Link className={lighttheme && window.location.pathname !== '/' ? styles.navLinkDark : styles.navLinkLight} to='/about'>
            About</Link>
        </li>
        <li>
          <Link className={lighttheme && window.location.pathname !== '/' ? styles.navLinkDark : styles.navLinkLight} to='/contribute'>
            Contribute</Link>
        </li>

      </ul>
    </div>




  );
};

export default Navigation;
