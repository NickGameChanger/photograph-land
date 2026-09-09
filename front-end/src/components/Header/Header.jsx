import React from 'react'
import "./Header.css"
import { Navbar } from '../Navbar/Navbar'

const Header = (props) => {
  console.log(props)
  return (
    <header id='home'>
      <div className='hero'>
        <div className='hero_inner' data-reveal>
          <div className='hero_eyebrow'>Belgrade · family, couples &amp; weddings</div>
          <h1 className='hero_title'>Love stories and family days, kept the way they felt</h1>
          <p className='hero_text'>Natural light, no posing, photos within two weeks.</p>
          <a href='#request' className='hero_btn'>Book a session</a>
        </div>
      </div>
      <Navbar about_ref={props.about_ref}
        portfolio_ref={props.portfolio_ref}
        approach_ref={props.approach_ref}
        pricing_ref={props.pricing_ref}
        reviews_ref={props.reviews_ref}
        contact_ref={props.contact_ref} request_ref={props.request_ref} />
    </header>
  )
}

export default Header