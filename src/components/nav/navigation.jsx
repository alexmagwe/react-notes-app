import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles'
// import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Button from '@material-ui/core/Button';
import Burger from './Burger'
import banner from '../../images/banner.png'
import { Themecontext } from '../../context'

const Navigation = (props) => {
  const { lighttheme } = useContext(Themecontext)
  let styles = useStyles()

  return (

    <div className={lighttheme ? 'nav-container light-bg' : 'nav-container'} >
      <div className='nav'>
        <Link to='/' ><Button><img className={styles.navHomeIcon} src={banner} alt='HOME' /></Button></Link>
        <Burger />
      </div>
    </div>




  );
};

export default Navigation;
