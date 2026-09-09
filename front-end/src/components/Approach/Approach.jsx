import { forwardRef } from 'react';
import "./Approach.css"

const steps = [
  {
    title: 'Talk',
    text: 'The key is to build a connection. I want to know your needs to make the best experience. We talk, and then you can decide.',
  },
  {
    title: 'Shoot',
    text: 'We shoot a lot and stay relaxed about it. Out of everything we take you get 100-150 finished photos — every one of them with color and light correction',
  },
  {
    title: 'Delivery',
    text: 'Within 2 weeks you get a link with the whole set of finished photos. I can give you photo sources only if we have an agreement before a session and you have a single color on Instagram',
  },
];

const Approach = forwardRef((props, ref) => {
  return (
    <section ref={ref} id='approach'>
      <div className='wrapper2'>
        <div className='wrapper'>
          <div className="header_section" data-reveal>
            <h2>How I work with you</h2>
          </div>

          {/* каждый шаг несёт свой кружок — на десктопе они выстраиваются в ряд,
              на телефоне складываются в список, и ничего не расползается */}
          <div className='steps'>
            {steps.map((step, index) => (
              <div className='step' key={step.title} data-reveal style={{ '--reveal-delay': `${index * 120}ms` }}>
                <div className='circle'>{index + 1}</div>
                <div className='step_body'>
                  <div className='header'>{step.title}</div>
                  <div className='cell'>{step.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
});

Approach.displayName = 'Approach';

export default Approach
