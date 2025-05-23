import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 px-10'>
      <h1 className='text-4xl font-medium text-gray-800'>Learn anything, anytime, anywhere</h1>
      <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ut pariatur et qui minus sunt, aut sit, labore quis doloremque</p>
      <div className='flex items-center  gap-6 mt-3'>
        <button className='px-10 py-2 bg-blue-600 text-white rounded-md text-sm '>Get Started</button>

        <a className='flex items-center gap-2' href="#">Learn more <img className='' src={assets.arrow_icon} alt="->" /></a>
        
      </div>

    </div>
  )
}

export default CallToAction
