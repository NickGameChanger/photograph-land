import { useEffect, useState } from 'react';
import { closeIcon, menuIcon } from '../../assets';
import "./Navbar.css"

export const Navbar = ({ about_ref, portfolio_ref, approach_ref, pricing_ref, reviews_ref, contact_ref, request_ref }) => {
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: Math.max(elementRef.current.offsetTop - 84, 0),
      behavior: 'smooth'
    });
  };

  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // фон у панели появляется, как только уехали с фотографии в шапке
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className={`navbar ${isScrolled ? "is-scrolled" : ""}`} >
        <div className="logo">
          <div className="text-wrapper">linanoon</div>
          <div className="phot">photography</div>
        </div>
        <div className="navbar-2">
          <div className="text-wrapper-2">Home</div>
          <div onClick={() => scrollToSection(portfolio_ref)} className="text-wrapper-2">Portfolio</div>
          <div onClick={() => scrollToSection(approach_ref)} className="text-wrapper-2">Approach</div>
          <div onClick={() => scrollToSection(pricing_ref)} className="text-wrapper-2">Price</div>
          <div onClick={() => scrollToSection(about_ref)} className="text-wrapper-2">About</div>
          <div onClick={() => scrollToSection(reviews_ref)} className="text-wrapper-2">Reviews</div>
          <div onClick={() => scrollToSection(contact_ref)} className="text-wrapper-2">Contact</div>
        </div>
        {/* <div className="languagae">
        <div className="select">
          <a href="#" className="text-wrapper-3">EN /</a>
          <a href="#" className="text-wrapper-4">RU</a>
        </div>
      </div> */}
        <>
          <div onClick={() => scrollToSection(request_ref)} className="work-btn">let's work</div>
        </>
        <div onClick={() => setIsActive(true)} className="menu-icon">
          <img src={menuIcon} alt="" />
        </div>
      </div >
      <div className={`mobile-menu-container ${isActive ? "active" : ""}`}>
        <div onClick={() => setIsActive(false)} className="close-icon">
          <img src={closeIcon} alt="" />
        </div>

        <ul className="menu-items">
          {[
            ['#portfolio', 'Portfolio'],
            ['#approach', 'Approach'],
            ['#pricing', 'Price'],
            ['#about', 'About'],
            ['#reviews', 'Reviews'],
            ['#footer', 'Contact'],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setIsActive(false)}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="menu-footer">
          <a href="#request" className="work-btn work-btn--mobile" onClick={() => setIsActive(false)}>
            let&apos;s work
          </a>
          <div className="menu-contacts">
            <a href="https://wa.me/381638013904" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://www.instagram.com/alina_noonart/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://t.me/Gromovaali" target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>
      </div>
    </>
  );
};
