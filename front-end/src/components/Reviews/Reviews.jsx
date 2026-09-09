import { forwardRef, useState } from 'react';
import "./Reviews.css"

const reviews = [
  { name: 'Rezeda', text: 'Our second session with you, and this time we came as a family, with our son. I was worried he would not make it through the whole shoot — turns out I should have worried about my husband! Everything was easy and natural. You caught exactly the moments I wanted to keep: the glances, the smiles, a family portrait of pure happiness.' },
  { name: 'Lana', text: 'Thank you from the bottom of my heart for this incredible work — you captured the atmosphere and the emotions, and I keep coming back to these photos again and again. I recommend you completely, and I am ready to shout about it at every step!' },
  { name: 'mariam', text: 'alina you are the best! <3 love your work and it was awesome experience!!' },
];

const Reviews = forwardRef((props, ref) => {
  const [active, setActive] = useState(0);
  const review = reviews[active];

  return (
    <section ref={ref} id='reviews'>
      <div className='wrapper'>
        <div className='header_section' data-reveal>
          <h2>Reviews</h2>
        </div>

        <div className='review_single' data-reveal style={{ '--reveal-delay': '120ms' }}>
          <span className='quote_mark' aria-hidden='true'>“</span>

          {/* key заставляет React пересоздать узел — так отрабатывает появление */}
          <p className='review_text' key={`text-${active}`}>{review.text}</p>
          <div className='review_name' key={`name-${active}`}>{review.name}</div>

          {reviews.length > 1 && (
            <div className='review_nav'>
              <button
                type='button'
                className='nav_arrow'
                onClick={() => setActive((active - 1 + reviews.length) % reviews.length)}
                aria-label='Предыдущий отзыв'
              >
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
                  <path d='M10 2.5 4.5 8l5.5 5.5' stroke='currentColor' strokeWidth='1.2'
                    strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </button>
              <button
                type='button'
                className='nav_arrow'
                onClick={() => setActive((active + 1) % reviews.length)}
                aria-label='Следующий отзыв'
              >
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
                  <path d='M6 2.5 11.5 8 6 13.5' stroke='currentColor' strokeWidth='1.2'
                    strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
});

Reviews.displayName = 'Reviews';

export default Reviews
