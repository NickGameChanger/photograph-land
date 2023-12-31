import React from 'react'
import { Header, About, Approach, Footer, Request, Portfolio, LoadAnimation } from './components'
import { useRef } from 'react'
const App = () => {
  const home = React.useRef(null);
  const portfolio = React.useRef(null);
  const approach = React.useRef(null);
  const about = React.useRef(null);
  const contact = React.useRef(null);
  const request = React.useRef(null);


  return (
    <>
      <LoadAnimation />
      <Header about_ref={about} portfolio_ref={portfolio} approach_ref={approach} contact_ref={contact} request_ref={request} />
      <Portfolio ref={portfolio} />
      <Approach ref={approach} />
      <About about_ref={about} request_ref={request} />
      <Request ref={request} />
      <Footer ref={contact} />
    </>
  )
}

export default App