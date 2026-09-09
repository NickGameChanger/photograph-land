import { forwardRef } from 'react';
import "./Footer.css"

const sections = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Approach', href: '#approach' },
  { label: 'Price', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
];

const contacts = [
  { label: '+381 63 801 39 04', href: 'https://wa.me/381638013904', note: 'WhatsApp' },
  { label: 'alinka.gromova.98@gmail.com', href: 'mailto:alinka.gromova.98@gmail.com' },
  { label: '@alina_noonart', href: 'https://www.instagram.com/alina_noonart/', note: 'Instagram' },
  { label: '@Gromovaali', href: 'https://t.me/Gromovaali', note: 'Telegram' },
];

const Footer = forwardRef((props, ref) => {
  return (
    <footer id='footer' ref={ref}>
      <div className='wrapper'>

        <div className='footer_cols' data-reveal>
          <div className='footer_col footer_col--brand'>
            <div className='sign'>linanoon</div>
            <p className='footer_about'>
              Family, couple and wedding photography in Belgrade. Natural light, no posing.
            </p>
          </div>

          <div className='footer_col'>
            <div className='footer_col_title'>Sections</div>
            <div className='footer_list'>
              {sections.map((item) => (
                <a className='footer_link' key={item.href} href={item.href}>{item.label}</a>
              ))}
            </div>
          </div>

          <div className='footer_col'>
            <div className='footer_col_title'>Contact</div>
            <div className='footer_list'>
              {contacts.map((item) => (
                <a
                  className='footer_link'
                  key={item.href}
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {item.label}
                  {item.note && <span className='footer_note'>{item.note}</span>}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='footer_bottom'>
          <span>© 2026 linanoon. All rights reserved.</span>
          <span>Belgrade, Serbia</span>
        </div>

      </div>
    </footer>
  )
});

Footer.displayName = 'Footer';

export default Footer
