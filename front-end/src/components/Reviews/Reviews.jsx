import React from 'react'
import "./Reviews.css"
import { forwardRef } from 'react';

const reviews = [
  { name: 'mariam', text: 'alina you are the best! <3 love your work and it was awesome experience!!' },
  { name: 'Лана', text: 'Хочу от всей души поблагодарить тебя за потрясающую работу — ты смогла передать атмосферу и эмоции, эти кадры смотрю снова и снова. Точно рекомендую и готова кричать об этом на каждом шагу!' },
];

const Reviews = forwardRef((props, ref) => {
  return (
    <section ref={ref} id='reviews'>
      <div className='wrapper'>
        <div className='header_section'>
          <h2>Reviews</h2>
        </div>
        <div className='reviews_grid'>
          {reviews.map((review, index) => (
            <div className='review_card' key={index}>
              <div className='stars'>★★★★★</div>
              <p className='review_text'>{review.text}</p>
              <div className='review_name'>{review.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
});

export default Reviews
