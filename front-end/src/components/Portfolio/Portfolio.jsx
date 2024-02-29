import React from 'react'
import "./Portfolio.css"
import { forwardRef, useState, useEffect } from 'react';
import Group from '../Svg/Group';
import { VectorIcon } from '../Svg/VectorIcon';
import {
  love_ver1, love_hor1,
  love_hor2, wed_hor1, wed_hor2, wed_hor3, wed_ver1, wed_ver2, wed_ver3,
  family_hor1, family_hor2, family_ver2, family_ver3, family_ver1, mob_love_photo3
} from '../../assets';
const Portfolio = forwardRef((props, ref) => {
  let family = [
    {
      id: 13,
      imgSrc: family_hor2
    },
    {
      id: 14,
      imgSrc: family_ver3
    },
    {
      id: 11,
      imgSrc: family_ver1
    },


    {
      id: 12,
      imgSrc: family_hor1
    },

    {
      id: 16,
      imgSrc: family_hor2
    },
    {
      id: 15,
      imgSrc: family_ver2
    },
  ]

  let wed = [
    {
      id: 21,
      imgSrc: wed_ver1
    },

    {
      id: 23,
      imgSrc: wed_hor2
    },

    {
      id: 24,
      imgSrc: wed_ver3
    },
    {
      id: 22,
      imgSrc: wed_hor1
    },
    {
      id: 25,
      imgSrc: wed_ver2
    },
    {
      id: 26,
      imgSrc: wed_hor3
    }
  ]


  let love = [
    {
      id: 31,
      imgSrc: love_ver1
    },

    {
      id: 33,
      imgSrc: love_hor2
    },

    {
      id: 34,
      imgSrc: mob_love_photo3
    },
    {
      id: 32,
      imgSrc: love_hor1
    },
    {
      id: 35,
      imgSrc: love_ver1
    },
    {
      id: 36,
      imgSrc: love_hor1
    },
  ]

  let mobLove = [
    {
      id: 41,
      imgSrc: love_ver1
    },

    {
      id: 42,
      imgSrc: love_hor1
    },
    {
      id: 43,
      imgSrc: mob_love_photo3
    },
    {
      id: 44,
      imgSrc: love_hor2
    },

  ]
  useEffect(() => {
    const preloadImages = (imageArray) => {
      imageArray.forEach((image) => {
        const img = new Image();
        img.src = image.imgSrc;
      });
    };

    preloadImages(family);
    preloadImages(wed);
    preloadImages(love);
  }, []);

  const [photoData, setPhotoData] = useState(love);

  const [mobPhotoData, setMobPhotoData] = useState(mobLove);
  const [activeMenu, setActiveMenu] = useState('love');

  const handleClick = (photoData, mobPhotoData, menu) => {
    setTimeout(() => {
      setPhotoData(photoData);
      setMobPhotoData(mobPhotoData);
      setActiveMenu(menu);
    }, 100); // время анимации должно соответствовать времени CSS-транзиции
  };

  return (
    <section id='portfolio' ref={ref}>
      <div className='wrapper'>
        <div className='wrapper2'>

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
            <div className={activeMenu === 'family' ? 'left_section active' : 'left_section'} onClick={() => handleClick(family, family, 'family')}>Family</div>
            <div className={activeMenu === 'love' ? 'middle_section active' : 'middle_section'} onClick={() => handleClick(love, mobLove, 'love')}>Love, love, love</div>
            <div className={activeMenu === 'wedding' ? 'right_section active' : 'right_section'} onClick={() => handleClick(wed, wed, 'wedding')}>Now, wedding</div>
          </div>
          <div className='photosAlwaysHaveTheirVoiceLove'>
            Photos always have their voice. Love stories are calling for you. Feel them. Immerse in them
          </div>
          <div className='gallery'>
            <div className='pics_line' key="1">
              <img src={photoData[0].imgSrc}></img>
              <img src={photoData[3].imgSrc}></img>
            </div>
            <div className='pics_line' key="1">
              <img src={photoData[1].imgSrc}></img>
              <img src={photoData[4].imgSrc}></img>
            </div>
            <div className='pics_line' key="1">
              <img src={photoData[2].imgSrc}></img>
              <img src={photoData[5].imgSrc}></img>
            </div>
          </div>
          <div className='mobile_gallery'>
            <img src={mobPhotoData[0].imgSrc}></img>
            <img src={mobPhotoData[1].imgSrc}></img>
            <img src={mobPhotoData[2].imgSrc}></img>
            <img src={mobPhotoData[3].imgSrc}></img>

          </div>

        </div>
      </div >
      {/* <div><VectorSvg /> <PersonSvg/></div> */}
    </section >

  )
});

export default Portfolio