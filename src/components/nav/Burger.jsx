import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import RightNav from './RightNav';
import { Themecontext } from '../../context'


const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 10px;
  z-index: 20;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ lighttheme, open }) => lighttheme && !open ? '#111' : '#fff'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }

    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Burger = () => {
  const [open, setOpen] = useState(false)
  const { lighttheme } = useContext(Themecontext)


  return (
    <>
      <StyledBurger open={open} lighttheme={lighttheme} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} setOpen={setOpen} />
    </>
  )
}

export default Burger
