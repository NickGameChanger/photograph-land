import React from 'react'
import "./Header.css"
import { Navbar } from '../Navbar/Navbar'

const Header = (props) => {
  console.log(props)
  return (
    <header>
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