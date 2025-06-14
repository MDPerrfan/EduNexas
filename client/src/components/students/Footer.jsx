import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='bg-gray-800 md:px-36 text-left w-full mt-10 '>
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30 text-gray-300">
        <div className="flex flex-col md:items-start items-center w-full">
          <img className='w-44' src={assets.logo2} alt="" />
          <p className='text-base py-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam odit aliquid amet, minus accusantium fugit. Sequi molestias</p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h1 className='text-lg text-white font-medium pb-3'>Company</h1>
          <ul className='flex md:flex-col flex-row gap-2'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h1 className='text-lg text-white font-medium pb-1'>Subcribe to our newsletter</h1>
          <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, ab?</p>
          <div className='flex gap-3 my-2'>
            <input className='py-1 px-3 rounded-sm bg-gray-600' type="text" placeholder='Enter your email' />
            <button className='bg-[coral] px-5 py-2 rounded-md'>Subscribe</button>
          </div>
        </div>
      </div>
              <p className="py-4 text-center text-xs md:text-sm text-white/60">Copyright 2025</p>

    </div>

  )
}

export default Footer
