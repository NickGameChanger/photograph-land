import { forwardRef } from 'react';
import "./About.css"

const About_ref = forwardRef((props, ref) => {

    const scrollToSection = (elementRef) => {
        if (!elementRef || !elementRef.current) return;
        window.scrollTo({
            top: Math.max(elementRef.current.offsetTop - (window.innerWidth <= 720 ? 0 : 84), 0),
            behavior: 'smooth'
        });
    };

    return (
        <div className='btn_line'>
            <button type='button' onClick={() => scrollToSection(ref)} className="work-btn">
                Let’s talk
            </button>
        </div>
    )
});

About_ref.displayName = 'About_ref';

export default About_ref
