import React from 'react'
import "./Portfolio.css"
import { forwardRef, useState, useEffect } from 'react';
import {
  love_r1_p1, love_r1_p2, love_r1_p3, love_r1_p4,
  love_r2_p1, love_r2_p2, love_r2_p3, love_r2_p4,
  family_r1_p1, family_r1_p2, family_r1_p3, family_r1_p4,
  family_r2_p1, family_r2_p2, family_r2_p3, family_r2_p4,
  wed_r1_p1, wed_r1_p2, wed_r1_p3, wed_r1_p4,
  wed_r2_p1, wed_r2_p2, wed_r2_p3, wed_r2_p4
} from '../../assets';

// Photos in display order: <tab>_r<row>_p<photo>.
// The grid shows 8 tiles (2 rows x 4). If a list below has fewer entries,
// buildGrid repeats them from the start so the grid never breaks.
const loveSources = [
  love_r1_p1, love_r1_p2, love_r1_p3, love_r1_p4,
  love_r2_p1, love_r2_p2, love_r2_p3, love_r2_p4,
];

const familySources = [
  family_r1_p1, family_r1_p2, family_r1_p3, family_r1_p4,
  family_r2_p1, family_r2_p2, family_r2_p3, family_r2_p4,
];

const wedSources = [
  wed_r1_p1, wed_r1_p2, wed_r1_p3, wed_r1_p4,
  wed_r2_p1, wed_r2_p2, wed_r2_p3, wed_r2_p4,
];

const buildGrid = (prefix, sources, total = 8) =>
  Array.from({ length: total }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    imgSrc: sources[i % sources.length],
  }));

const Portfolio = forwardRef((props, ref) => {
  const family = buildGrid('family', familySources);
  const wed = buildGrid('wed', wedSources);
  const love = buildGrid('love', loveSources);
  const mobLove = buildGrid('mob-love', loveSources, 4);

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

        <div className='header_section'>
          <div className='header_left'>
            <div className='eyebrow'>Portfolio</div>
            <h2>Photos always have their voice</h2>
          </div>
          <div className='header_right'>
            <p>Love stories are calling for you. Feel them. Immerse in them. Pick a category below and take a look at the recent sessions.</p>
          </div>
        </div>

        <div className='photos_menu'>
          <div className={activeMenu === 'family' ? 'tab active' : 'tab'} onClick={() => handleClick(family, family, 'family')}>Family</div>
          <div className={activeMenu === 'love' ? 'tab active' : 'tab'} onClick={() => handleClick(love, mobLove, 'love')}>Love, love, love</div>
          <div className={activeMenu === 'wedding' ? 'tab active' : 'tab'} onClick={() => handleClick(wed, wed, 'wedding')}>Now, wedding</div>
        </div>

        <div className='gallery'>
          {photoData.map((photo) => (
            <div className='photo_cell' key={photo.id}>
              <img src={photo.imgSrc} alt='' />
            </div>
          ))}
        </div>

        <div className='mobile_gallery'>
          <img src={mobPhotoData[0].imgSrc}></img>
          <img src={mobPhotoData[1].imgSrc}></img>
          <img src={mobPhotoData[2].imgSrc}></img>
          <img src={mobPhotoData[3].imgSrc}></img>
        </div>

      </div>
    </section>
  )
});

export default Portfolio
