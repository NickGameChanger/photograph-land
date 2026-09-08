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

        <span className="name-group"><span className='name'>lina</span><span className='name'>noon</span></span>
        <div className="break"></div>
        <span className="photog">photography</span>
      </div>
    </div >
  )
}

export default LoadAnimation