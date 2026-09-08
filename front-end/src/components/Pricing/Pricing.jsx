import React from 'react'
import "./Pricing.css"
import { forwardRef } from 'react';
import { portrait_alina2, love_r1_p2, wed_r1_p4 } from '../../assets';

const plans = [
  {
    packageLabel: 'Package №1',
    name: 'Minimal',
    price: '€50',
    subtitle: 'Express session:',
    photo: portrait_alina2,
    features: [
      'up to 30 minutes of shooting',
      '20 edited photos',
      'help choosing outfits',
      'photos ready within 10 days',
    ],
  },
  {
    packageLabel: 'Package №2',
    name: 'Standard',
    price: '€80',
    subtitle: 'Family session:',
    photo: love_r1_p2,
    features: [
      'up to 1 hour of shooting',
      '50 edited photos',
      'help preparing for the session',
      'photos ready within 10 days',
    ],
  },
  {
    packageLabel: 'Package №3',
    name: 'Maximum',
    price: '€150',
    subtitle: 'Big session for the whole family:',
    photo: wed_r1_p4,
    features: [
      'up to 2 hours of shooting',
      '80+ edited photos',
      'help choosing location and outfits',
      'photos ready within 14 days',
    ],
  },
];

const Pricing = forwardRef(({ request_ref }, ref) => {
  const scrollToSection = (elementRef) => {
    if (!elementRef || !elementRef.current) return;
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={ref} id='pricing'>
      <div className='wrapper'>
        <div className='header_section'>
          <div className='header_left'>
            <div className='eyebrow'>Services</div>
            <h2>Those who matter</h2>
          </div>
          <div className='header_right'>
            <p>Browse the session packages below and pick the one that fits the duration and number of photos you're after. You'll also find answers to frequently asked questions further down.</p>
          </div>
        </div>
        <div className='plans_grid'>
          {plans.map((plan, index) => (
            <div className='plan_card' key={index}>
              <img src={plan.photo} alt={plan.name} className='plan_photo' />
              <div className='plan_package_label'>{plan.packageLabel}</div>
              <div className='plan_title'>{plan.name} — {plan.price}</div>
              <div className='plan_subtitle'>{plan.subtitle}</div>
              <ul className='plan_features'>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className='plan_btn' onClick={() => scrollToSection(request_ref)}>Book a session</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
});

export default Pricing
