import React from 'react'
import "./About.css"
import { forwardRef } from 'react';

const About_ref = forwardRef((props, ref) => {

    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth'
        });
    };
    return (
        <div className='last_line'>
            <div className='sign'>linanoon</div>
            <div onClick={() => scrollToSection(ref)} className="work-btn">Let’s talk</div>
        </div>
    )
});

export default About_ref