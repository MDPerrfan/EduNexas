import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const {isEducator}=useContext(AppContext)
  const menutItems=[
    {name:'Dashboard',path:'/educator/educator',icon:assets.home_icon},
    {name:'Add Course',path:'/educator/add-course',icon:assets.add_icon},
    {name:'My Course',path:'/educator/my-courses',icon:assets.my_course_icon},
    {name:'Student Enrolled',path:'/educator/student-enrolled',icon:assets.person_tick_icon}



  ]
  return isEducator&&(
    <div className='w-16 md:w-64 flex flex-col min-h-screen py-2 border-r border-gray-500 text-base'>
      {menutItems.map((item)=>(
        <NavLink to={item.path} key={item.name} end={item.path==='/educator' } className={({isActive})=>`flex items-center md:flex-row flex-col md:justify-start justify-center py-3 md:px-10 gap-3 ${isActive? 'bg-orange-50 border-r-[6px] border-orange-500/90':'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'}`}>
          <img src={item.icon} alt="" className='w-6 h-6'/>
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
