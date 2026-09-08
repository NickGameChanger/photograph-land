import React from 'react'
import { Header, About, Approach, Footer, Request, Portfolio, Reviews, Pricing, LoadAnimation } from './components'
import { useRef } from 'react'
const App = () => {
  const home = React.useRef(null);
  const portfolio = React.useRef(null);
  const approach = React.useRef(null);
  const pricing = React.useRef(null);
  const about = React.useRef(null);
  const reviews = React.useRef(null);
  const contact = React.useRef(null);
  const request = React.useRef(null);


  return (
    <>
      <LoadAnimation />
      <Header about_ref={about} portfolio_ref={portfolio} approach_ref={approach} pricing_ref={pricing} reviews_ref={reviews} contact_ref={contact} request_ref={request} />
      <Portfolio ref={portfolio} />
      <Approach ref={approach} />
      <Pricing ref={pricing} request_ref={request} />
      <About about_ref={about} request_ref={request} />
      <Reviews ref={reviews} />
      <Request ref={request} />
      <Footer ref={contact} />
    </>
  )
}

export default App