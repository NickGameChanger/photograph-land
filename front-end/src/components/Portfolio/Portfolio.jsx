import React from 'react'
import "./Portfolio.css"
import { forwardRef } from 'react';
import Group from '../Svg/Group';
import { VectorIcon } from '../Svg/VectorIcon';
import { photo_vert1, photo_hor1, photo_hor2 } from '../../assets';
const Portfolio = forwardRef((props, ref) => {
  return (
    <section id='portfolio' ref={ref}>
      <div className='wrapper2'>
        <div className='wrapper'>

          <div className="header_section">

            <div className="svgcomp">
              <div className='vector'>
                <VectorIcon />
              </div>
              <div className='group19'>
                <Group />
              </div>
            </div>

            <div className='my_header'>
              <h2>Portfolio</h2>
            </div>
          </div>
          <div className='photos_menu'>
            <div className='left_section'>All photos</div>
            <div className='middle_section'>Love, love, love</div>
            <div className='right_section'>Now, wedding</div>

          </div>
          <div className='photosAlwaysHaveTheirVoiceLove'>
            Photos always have their voice. Love stories are calling for you. Feel them. Immerse in them
          </div>

          <div className='photo_line' id='first'>
            <div className='vert_photo'>
              <img src={photo_vert1} alt='My Image1' />
            </div>
            <div className='hor_photo'>
              <img src={photo_hor1} alt='My Image2' />
            </div>
          </div>

          <div className='photo_line'>
            <div className='hor_photo'>
              <img src={photo_hor2} alt='My Image3' />
            </div>
            <div className='vert_photo'>
              <img src={photo_vert1} alt='My Imag4' />
            </div>
          </div>

          <div className='photo_line' id='last'>
            <div className='vert_photo'>
              <img src={photo_vert1} alt='My Image5' />
            </div>
            <div className='hor_photo'>
              <img src={photo_hor1} alt='My Image6' />
            </div>
          </div>

        </div>
      </div>
      {/* <div><VectorSvg /> <PersonSvg/></div> */}
    </section >

  )
});

export default Portfolio