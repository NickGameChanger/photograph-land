import React from 'react'
import "./Approach.css"
import { forwardRef } from 'react';

const Approach = forwardRef((props, ref) => {
  return (
    <section ref={ref} id='approach'>
      <div className='wrapper2'>
        <div className='wrapper'>
          <div className="header_section">
            <div className='icon'>
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="39" viewBox="0 0 38 39" fill="none">
                <path d="M30.9795 27.7651L20.1436 26.3438C20.1436 26.3438 19.9405 27.8917 20.4099 30.3152C20.8793 32.7387 21.8373 34.439 21.8373 34.439L27.2552 35.1497C27.2552 35.1497 28.6192 33.754 29.6978 31.5336C30.7764 29.3131 30.9795 27.7651 30.9795 27.7651Z" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M25.5623 27.0585L27.6943 10.8047" stroke="#515151" strokeWidth="2" strokeLinecap="round" />
                <path d="M25.2061 5.75391L31.398 6.56613L29.2408 11.007L26.1449 10.6009L25.2061 5.75391Z" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5573 3.95668L9.81738 2.94141L9.20822 7.58536L16.9481 8.60064L17.5573 3.95668Z" stroke="#515151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.98242 7.45117L6.98242 31.6973L12.3162 32.4961L12.3162 27.8093L14.7542 25.8099L13.7544 20.4357L17.0037 18.6237L15.6915 13.687L18.6284 11.875L19.1045 9.0085L6.98242 7.45117Z" stroke="#515151" strokeWidth="2" />
              </svg>
            </div>
            <h2>How I work with you</h2>
          </div>
          <div className='stepsContainer'>
            <div className='draw_line'>
              <div className='circle' id='1circle'>
                <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63" fill="none">
                  <circle cx="31.7109" cy="31.8105" r="30.5" fill="white" stroke="#F3692E" />
                </svg>
                <div className='number' id='1number'>1</div>
                <div className='line' id='1line'></div>
              </div>

              <div className='circle' id='2circle'>
                <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63" fill="none">
                  <circle cx="31.7109" cy="31.8105" r="30.5" fill="white" stroke="#F3692E" />
                </svg>
                <div className='number' id='2number'>2</div>
                <div className='line' id='2line'></div>
              </div>
              <div className='circle' id='3circle'>
                <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63" fill="none">
                  <circle cx="31.7109" cy="31.8105" r="30.5" fill="white" stroke="#F3692E" />
                </svg>
                <div className='number' id='3number'>3</div>
                <div className='line' id='3line'></div>
              </div>
              <div className='circle' id='4circle'>
                <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63" fill="none">
                  <circle cx="31.7109" cy="31.8105" r="30.5" fill="white" stroke="#F3692E" />
                </svg>
                <div className='number' id='4number'>4</div>
              </div>
            </div>

            <div className='steps'>
              <div className="container">
                <div className="header">Talk</div>
                <div className="cell">The key is to build a connection. I want to know your needs to make the best experience. We talk, and then you can decide.</div>
              </div>
              <div className="container">
                <div className="header">Shoot</div>
                <div className="cell">We take a lot of photos, from which you get 100-150 with color and light correction, as well as 15-20 photos with detailed retouching</div>
              </div>
              <div className="container">
                <div className="header">Editing</div>
                <div className="cell">I edit photos by applying neat and unnoticeable retouching, and only on those photos that you pre-select. My crucial work principle – you get your photos in 2 weeks</div>
              </div>
              <div className="container">
                <div className="header">Delivery</div>
                <div className="cell">You can get your photos using a link I send you. I can give you photo sources only if we have an agreement before a session and you have a single color on Instagram</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
});

export default Approach