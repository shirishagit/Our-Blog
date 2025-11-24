import React from 'react'
import logo from './logo copy.png'
import { useAppContext } from '../../context/appContext.jsx';

const Navbar = () => {

    const {navigate , token} = useAppContext();

  return (
    <div className='flex items-center justify-between py-2 h-[90px] px-4 sm:px-12 cursor-pointer'>
      <img src={logo} alt="Our Blog" className=' w-32 sm:w-44'  onClick={()=>navigate('/')}/>
      <button onClick={()=>navigate('/admin')} className='text-sm px-8 py-2 bg-blue-900 text-white 
      rounded-full cursor-pointer '>{token ? 'Dashboard' : 'Login'}</button>
    </div>
  )
}

export default Navbar
