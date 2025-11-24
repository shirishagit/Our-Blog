import React from 'react'
import { NavLink } from 'react-router-dom'
import addblog from './pictures/addblog.png'
import comments from './pictures/comments.png'
import dashboard from './pictures/dashboard.png'
import listblog from './pictures/listblog.png'


const SideBar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
      <NavLink end={true} to={'/admin'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-64 cursor-pointer ${isActive && "bg-blue-200 border-r-2 border-primary"}`}>
        <img src={dashboard} alt="#" className='min-w-4 w-7 '/>
        <p className='hidden md:inline-block'>DashBoard</p>
      </NavLink>
        <NavLink  to={'addblog'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-64 cursor-pointer ${isActive && "bg-blue-200 border-r-2 border-primary"}`}>
        <img src={addblog} alt="#" className='min-w-4 w-7'/>
        <p className='hidden md:inline-block'>AddBlog</p>
      </NavLink>
       <NavLink  to={'blogList'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-64 cursor-pointer ${isActive && "bg-blue-200 border-r-2 border-primary"}`}>
        <img src={listblog} alt="#" className='min-w-4 w-7'/>
        <p className='hidden md:inline-block'>BlogList</p>
      </NavLink>
       <NavLink  to={'comments'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-64 cursor-pointer ${isActive && "bg-blue-200 border-r-2 border-primary"}`}>
        <img src={comments} alt="#" className='min-w-4 w-7'/>
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>
    </div>
  )
}

export default SideBar
