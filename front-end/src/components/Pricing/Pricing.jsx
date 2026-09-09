import React from 'react'
import "./Pricing.css"
import { forwardRef } from 'react';
import { price_p1, price_p2, price_p3 } from '../../assets';

const plans = [
  {
    packageLabel: 'Package №1',
    name: 'Minimal',
    price: '€60',
    subtitle: 'A short walk for two:',
    photo: price_p1,
    features: [
      'up to 30 minutes of shooting',
      '20 photos with color and light correction',
      'help choosing outfits',
      'photos ready within 10 days',
    ],
  },
  {
    packageLabel: 'Package №2',
    name: 'Standard',
    price: '€80',
    subtitle: 'Family or couple session:',
    photo: price_p2,
    features: [
      'up to 1,5 hours of shooting',
      '50 photos with color and light correction',
      'help preparing for the session',
      'photos ready within 10 days',
    ],
  },
  {
    packageLabel: 'Package №3',
    name: 'Maximum',
    price: '€150',
    subtitle: 'A long afternoon for the whole family:',
    photo: price_p3,
    features: [
      'from 2 hours of shooting',
      '80+ photos with color and light correction',
      'help choosing location and outfits',
      'photos ready within 14 days',
    ],
  },
];

const Pricing = forwardRef(({ request_ref }, ref) => {
  const scrollToSection = (elementRef) => {
    if (!elementRef || !elementRef.current) return;
    window.scrollTo({
      top: Math.max(elementRef.current.offsetTop - 84, 0),
      behavior: 'smooth'
    });
  };

  return (
    <section ref={ref} id='pricing'>
      <div className='wrapper'>
        <div className='header_section' data-reveal>
          <div className='header_left'>
            <div className='eyebrow'>Services</div>
            <h2>Those who matter</h2>
          </div>
          <div className='header_right'>
            <p>Three sessions — from a short walk for two to a long afternoon with the whole family. Prices are final: nothing extra on the day, no hidden fees for editing.</p>
          </div>
        </div>
        <div className='plans_grid'>
          {plans.map((plan, index) => (
            <div className='plan_card' key={index} data-reveal style={{ '--reveal-delay': `${index * 120}ms` }}>
              <img src={plan.photo} loading='lazy' alt={`${plan.name} photo session package — ${plan.subtitle.replace(':', '')}`} className='plan_photo' />
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
        <div className='pricing_note' data-reveal>
          <span>Weddings and large events</span> are quoted individually — the timing, the number of
          photos and the price depend on the day itself. Tell me what you have in mind and I’ll put
          together a personal offer.
        </div>
      </div>
    </section>
  )
});

export default Pricing
