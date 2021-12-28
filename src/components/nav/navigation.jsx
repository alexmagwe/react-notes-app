import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles'
// import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Button from '@material-ui/core/Button';
import Burger from './Burger'
import logo from '../../images/logo.png'
import { Themecontext } from '../../context'

const Navigation = (props) => {
  const { lighttheme,inDashboard } = useContext(Themecontext)
  let styles = useStyles()

  return (

    inDashboard?<div className={lighttheme && window.location.pathname!=='/'? 'nav-container light-bg' : 'nav-container darkMode '} >
    
      <div className='nav'>
        <Link to='/' ><Button><img className={styles.navHomeIcon} src={logo} alt='HOME' /></Button></Link>
        <Burger />
      </div>
    </div>
    :
    <div className={lighttheme && window.location.pathname!=='/'? 'nav-container light-bg' : 'nav-container'} >
      <div className='nav'>
        <Link to='/' ><Button><img className={styles.navHomeIcon} src={logo} alt='HOME' /></Button></Link>
        <Burger />
      </div>
    </div>

  );
};

export default Navigation;
