import { useRef } from 'react';
import React from 'react'
import { forwardRef } from 'react';
import "./Navbar.css"

export const Navbar = ({ about_ref, portfolio_ref, approach_ref, contact_ref, request_ref }) => {
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    });
  };
  return (
    <div className="navbar" >
      <div className="logo">
        <div className="text-wrapper">Alina Gromova</div>
        <div className="phot">PHOTOGRAPHY</div>
      </div>
      <div className="navbar-2">
        <div className="text-wrapper-2">Home</div>
        <div onClick={() => scrollToSection(portfolio_ref)} className="text-wrapper-2">Portfolio</div>
        <div onClick={() => scrollToSection(approach_ref)} className="text-wrapper-2">Approach</div>
        <div onClick={() => scrollToSection(about_ref)} className="text-wrapper-2">About</div>
        <div onClick={() => scrollToSection(contact_ref)} className="text-wrapper-2">Contact</div>
      </div>
      {/* <div className="languagae">
        <div className="select">
          <a href="#" className="text-wrapper-3">EN /</a>
          <a href="#" className="text-wrapper-4">RU</a>
        </div>
      </div> */}
      <>
        <div onClick={() => scrollToSection(request_ref)} className="work-btn">let's work</div>
      </>
    </div >

  );
};
