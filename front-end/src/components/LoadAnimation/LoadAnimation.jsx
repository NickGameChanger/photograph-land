import React, { useEffect } from 'react'
import "./LoadAnimation.css"
import { preLoaderAnim } from '../animations'


const LoadAnimation = () => {
  useEffect(() => {
    preLoaderAnim()
  }, [])
  return (
    <div className='preloader'>
      <div className="texts-container">

        <span className='name'>Alina</span>
        <span className='name'>Gromova</span>
        <div className="break"></div>
        <span className="photog">PHOTOGRAPHY</span>
      </div>
    </div >
  )
}

export default LoadAnimation