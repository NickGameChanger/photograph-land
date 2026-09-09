import { forwardRef, useState, useRef, useEffect } from 'react';
import "./Portfolio.css"
import {
  love_r1_p1, love_r1_p3, love_r2_p2, love_r2_p3,
  family_r1_p3, family_r2_p2,
  wed_r1_p2, wed_r2_p1,
} from '../../assets';

// Одна подборка вместо трёх категорий. Порядок = порядок в ленте.
// Заменить кадр — поменять импорт и строку здесь.
const PHOTOS = [
  { src: love_r1_p1,   alt: 'Couple with their dog, love story session in Belgrade' },
  { src: family_r1_p3, alt: 'Family photo session in Belgrade' },
  { src: wed_r1_p2,    alt: 'Wedding photography in Belgrade' },
  { src: love_r2_p3,   alt: 'Love story photo session in Belgrade' },
  { src: family_r2_p2, alt: 'Family portrait session in Belgrade' },
  { src: love_r1_p3,   alt: 'Couple session in natural light, Belgrade' },
  { src: wed_r2_p1,    alt: 'Wedding day photography in Belgrade' },
  { src: love_r2_p2,   alt: 'Love story session by linanoon photography' },
].map((p, i) => ({ ...p, id: `photo-${i + 1}` }));

const MOBILE_QUERY = '(max-width: 720px)';
const AUTOPLAY_MS = 4500;

const Portfolio = forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Лента зациклена: по краям лежат копии крайних кадров. На телефоне видно
  // один кадр — хватает одной копии с каждой стороны; на десктопе видно
  // четыре — копируем по четыре, чтобы на стыке не было пустоты.
  const count = PHOTOS.length;
  const clones = isMobile ? 1 : 4;
  const loop = [
    ...PHOTOS.slice(count - clones).map((p) => ({ ...p, id: `${p.id}-before` })),
    ...PHOTOS,
    ...PHOTOS.slice(0, clones).map((p) => ({ ...p, id: `${p.id}-after` })),
  ];

  const stripRef = useRef(null);
  const wrapRef = useRef(null);
  const rawIndex = useRef(clones);      // позиция в ленте с учётом копий
  const settleTimer = useRef(null);
  const pauseTimer = useRef(null);
  const [index, setIndex] = useState(0); // настоящий номер кадра для точек
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  const step = () => {
    const el = stripRef.current;
    if (!el || !el.firstElementChild) return 0;
    return el.firstElementChild.getBoundingClientRect().width
      + parseFloat(getComputedStyle(el).columnGap || 0);
  };

  // встаём на первый настоящий кадр при показе и при смене раскладки
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const el = stripRef.current;
      if (el) el.scrollTo({ left: clones * step(), behavior: 'instant' });
      rawIndex.current = clones;
      setIndex(0);
    });
    return () => cancelAnimationFrame(raf);
  }, [clones]);

  // автопрокрутка только пока лента на экране
  useEffect(() => {
    if (!wrapRef.current || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.4 });
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => {
    clearTimeout(settleTimer.current);
    clearTimeout(pauseTimer.current);
  }, []);

  const handleScroll = () => {
    const el = stripRef.current;
    const s = step();
    if (!el || !s) return;
    const raw = Math.round(el.scrollLeft / s);
    rawIndex.current = raw;
    setIndex(((raw - clones) % count + count) % count);

    // остановились на копии — незаметно перепрыгиваем на настоящий кадр
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      if (raw < clones) el.scrollTo({ left: (raw + count) * s, behavior: 'instant' });
      else if (raw >= clones + count) el.scrollTo({ left: (raw - count) * s, behavior: 'instant' });
    }, 120);
  };

  const scrollToRaw = (raw, smooth = true) => {
    const el = stripRef.current;
    const s = step();
    if (el && s) el.scrollTo({ left: raw * s, behavior: smooth ? 'smooth' : 'instant' });
  };

  const next = () => scrollToRaw(rawIndex.current + 1);
  const prev = () => scrollToRaw(rawIndex.current - 1);
  const goTo = (i) => scrollToRaw(clones + i);

  const pause = () => { clearTimeout(pauseTimer.current); setPaused(true); };
  const resume = () => {
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 1800);
  };

  const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoplay = onScreen && !reduceMotion;

  return (
    <section id='portfolio' ref={ref}>
      <div className='wrapper'>

        <div className='header_section' data-reveal>
          <h2>Photos always have their voice</h2>
          <p className='header_sub'>Selected work · Belgrade</p>
        </div>

        <div className='strip_wrap' data-reveal style={{ '--reveal-delay': '120ms' }} ref={wrapRef}>
          <div
            className='strip'
            ref={stripRef}
            onScroll={handleScroll}
            onPointerDown={pause}
            onPointerUp={resume}
            onPointerCancel={resume}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onTouchStart={pause}
            onTouchEnd={resume}
          >
            {loop.map((photo) => (
              <div className='strip_cell' key={photo.id}>
                <img src={photo.src} alt={photo.alt} loading='lazy' draggable='false' />
              </div>
            ))}
          </div>

          <div className={paused ? 'strip_nav is-paused' : 'strip_nav'}>
            <button type='button' className='strip_arrow' onClick={prev} aria-label='Предыдущее фото'>
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
                <path d='M12 7H2m4-4L2 7l4 4' stroke='currentColor' strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
            <div className='strip_dots' aria-hidden='true'>
              {PHOTOS.map((photo, i) => (
                <button
                  type='button'
                  key={photo.id}
                  className={i === index ? 'strip_dot is-active' : 'strip_dot'}
                  onClick={() => goTo(i)}
                  tabIndex={-1}
                >
                  {i === index && autoplay && (
                    <span
                      className='strip_fill'
                      key={`fill-${index}`}
                      style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                      onAnimationEnd={next}
                    />
                  )}
                </button>
              ))}
            </div>
            <button type='button' className='strip_arrow' onClick={next} aria-label='Следующее фото'>
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
                <path d='M2 7h10M8 3l4 4-4 4' stroke='currentColor' strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
});

Portfolio.displayName = 'Portfolio';

export default Portfolio
