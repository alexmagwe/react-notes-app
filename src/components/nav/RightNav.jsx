import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useStyles from './styles'
import { Themecontext } from '../../context'
import DarkModeToggle from "react-dark-mode-toggle";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content:center;
  align-items:center;
  flex-flow: row nowrap;

  
  @media (max-width: 768px) {
    li {
      padding: 18px 10px;
      opacity: ${({ open }) => open ? 'auto' : '0'};
      transition:opacity 0.4s ease-in-out;
      pointer-events: ${({ open }) => open ? 'all' : 'none'};
    }
    flex-flow: column nowrap;
    background-color: #0D2538;
    position:fixed;
    height: ${({ open }) => open ? '100vh' : '0'};
    top: 0;
    width:100%;
    left:0;
    padding-top: ${({ open }) => open ? '3.5rem' : '0'};
    transition: height 0.4s ease-in-out;
  }
`;

const RightNav = ({ open, setOpen }) => {
  const { lighttheme,setLightTheme,} = useContext(Themecontext)
  let styles = useStyles()

  return (
    <Ul open={open}>
      {/* <ul className='nav-list'> */}

      <li>
        <Link className={!open && lighttheme && window.location.pathname !== '/' ? styles.navLinkDark : styles.navLinkLight} onClick={() => setOpen(false)} to='/about'>
          About</Link>
      </li>
      <li>
        <Link className={!open && lighttheme && window.location.pathname !== '/' ? styles.navLinkDark : styles.navLinkLight} onClick={() => setOpen(false)} to='/contribute'>
          Contribute</Link>
        
      </li>
        <DarkModeToggle
        onChange={setLightTheme}
        checked={lighttheme}
        size={60}
      />
          {/* <li>
        <Link className={!open && lighttheme && window.location.pathname !== '/' ? styles.navLinkDark : styles.navLinkLight} onClick={() => setOpen(false)} to='/login'>
          Sign in</Link>
      </li>
      */}
      {/* </ul> */}
    </Ul>
  )
}

export default RightNav
