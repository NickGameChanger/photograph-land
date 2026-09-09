import { forwardRef, useState, useRef, useEffect } from 'react';
import "./Portfolio.css"
import {
  love_r1_p1, love_r1_p2, love_r1_p3, love_r1_p4,
  love_r2_p1, love_r2_p2, love_r2_p3, love_r2_p4,
  family_r1_p1, family_r1_p2, family_r1_p3, family_r1_p4,
  family_r2_p1, family_r2_p2, family_r2_p3, family_r2_p4,
  wed_r1_p1, wed_r1_p2, wed_r1_p3, wed_r1_p4,
  wed_r2_p1, wed_r2_p2, wed_r2_p3, wed_r2_p4
} from '../../assets';

// Категории в порядке перелистывания. Список зациклен: после последней снова первая.
// Фото в порядке показа: <вкладка>_r<ряд>_p<фото>.
const CATEGORIES = [
  {
    key: 'family',
    label: 'Family',
    alt: 'Family photo session in Belgrade by linanoon photography',
    sources: [
      family_r1_p1, family_r1_p2, family_r1_p3, family_r1_p4,
      family_r2_p1, family_r2_p2, family_r2_p3, family_r2_p4,
    ],
  },
  {
    key: 'love',
    label: 'Love, love, love',
    alt: 'Couple love story photo session in Belgrade by linanoon photography',
    sources: [
      love_r1_p1, love_r1_p2, love_r1_p3, love_r1_p4,
      love_r2_p1, love_r2_p2, love_r2_p3, love_r2_p4,
    ],
  },
  {
    key: 'wed',
    label: 'Now, wedding',
    alt: 'Wedding photography in Belgrade by linanoon photography',
    sources: [
      wed_r1_p1, wed_r1_p2, wed_r1_p3, wed_r1_p4,
      wed_r2_p1, wed_r2_p2, wed_r2_p3, wed_r2_p4,
    ],
  },
];

// Сетка всегда из 8 плиток. Если фото меньше — кадры повторяются с начала списка.
const buildGrid = (category, total = 8) =>
  Array.from({ length: total }, (_, i) => ({
    id: `${category.key}-${i + 1}`,
    imgSrc: category.sources[i % category.sources.length],
    alt: `${category.alt} — ${i + 1}`,
  }));

const SLIDES = CATEGORIES.map((category) => ({ ...category, photos: buildGrid(category) }));

const SWIPE_THRESHOLD = 50;   // px, короче — считаем случайным касанием
const ANIMATION_MS = 500;     // должно совпадать с длительностью в Portfolio.css

const Portfolio = forwardRef((props, ref) => {
  const [active, setActive] = useState(1);  // по умолчанию Love
  const [anim, setAnim] = useState(null);   // { from, dir } — пока едет анимация
  const animationTimer = useRef(null);

  useEffect(() => {
    SLIDES.forEach((slide) => {
      slide.photos.forEach((photo) => {
        const img = new Image();
        img.src = photo.imgSrc;
      });
    });
    return () => clearTimeout(animationTimer.current);
  }, []);

  const goTo = (nextIndex, dir) => {
    if (nextIndex === active || anim) return;
    setAnim({ from: active, dir });
    setActive(nextIndex);
    animationTimer.current = setTimeout(() => setAnim(null), ANIMATION_MS);
  };

  // dir: 1 — вперёд, -1 — назад. Остаток по длине списка и даёт зацикленность.
  const step = (dir) => goTo((active + dir + SLIDES.length) % SLIDES.length, dir);

  const selectTab = (index) => {
    if (index === active) return;
    const forward = (index - active + SLIDES.length) % SLIDES.length === 1;
    goTo(index, forward ? 1 : -1);
  };

  // жест на трекпаде приходит как wheel с горизонтальной дельтой.
  // Браузер по умолчанию трактует его как «назад/вперёд» по истории —
  // именно поэтому в адресной строке скакали #reviews и #pricing.
  // Ловим событие сами и гасим стандартное поведение.
  const viewportRef = useRef(null);
  const stepRef = useRef(null);
  const wheelAccum = useRef(0);
  const wheelLock = useRef(false);
  const wheelReset = useRef(null);

  stepRef.current = step;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      // вертикальную прокрутку не трогаем — страница должна скроллиться как обычно
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (wheelLock.current) return;

      wheelAccum.current += e.deltaX;
      clearTimeout(wheelReset.current);
      wheelReset.current = setTimeout(() => { wheelAccum.current = 0; }, 200);

      if (Math.abs(wheelAccum.current) > 80) {
        const dir = wheelAccum.current > 0 ? 1 : -1;
        wheelAccum.current = 0;
        wheelLock.current = true;
        setTimeout(() => { wheelLock.current = false; }, ANIMATION_MS + 150);
        stepRef.current(dir);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearTimeout(wheelReset.current);
    };
  }, []);

  const pointerStart = useRef(null);

  const handlePointerDown = (e) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (!pointerStart.current) return;
    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;
    pointerStart.current = null;
    // горизонтальный жест только если он длиннее вертикального — иначе это скролл страницы
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
  };

  const renderGrid = (slide) => (
    <div className='gallery' key={slide.key}>
      {slide.photos.map((photo) => (
        <div className='photo_cell' key={photo.id}>
          <img src={photo.imgSrc} alt={photo.alt} loading='lazy' draggable='false' />
        </div>
      ))}
    </div>
  );

  // во время перехода в ленте лежат обе галереи целиком и едут вместе
  let trackClass = 'gallery_track';
  let panels = [SLIDES[active]];
  if (anim) {
    if (anim.dir > 0) {
      trackClass += ' slide-forward';
      panels = [SLIDES[anim.from], SLIDES[active]];
    } else {
      trackClass += ' slide-back';
      panels = [SLIDES[active], SLIDES[anim.from]];
    }
  }

  return (
    <section id='portfolio' ref={ref}>
      <div className='wrapper'>

        <div className='header_section' data-reveal>
          <h2>Photos always have their voice</h2>
        </div>

        <div className='photos_menu' data-reveal style={{ '--reveal-delay': '100ms' }}>
          {SLIDES.map((slide, index) => (
            <button
              type='button'
              key={slide.key}
              className={index === active ? 'tab active' : 'tab'}
              onClick={() => selectTab(index)}
            >
              {slide.label}
            </button>
          ))}
        </div>

        <div
          className='gallery_viewport'
          data-reveal
          style={{ '--reveal-delay': '200ms' }}
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStart.current = null; }}
          onPointerLeave={() => { pointerStart.current = null; }}
        >
          <div className={trackClass} key={anim ? `${anim.from}-${active}` : `still-${active}`}>
            {panels.map((slide) => renderGrid(slide))}
          </div>
        </div>

      </div>
    </section>
  )
});

Portfolio.displayName = 'Portfolio';

export default Portfolio
