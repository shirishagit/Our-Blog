import React from 'react'
import { useAppContext } from '../../context/appContext.jsx';

const Header = () => {

  const {setInput , input } = useAppContext();
  const inputRef = React.useRef();


  const submitHandler = async(e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  }

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  }


  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 '>
        <div className='text-center mt-20 mb-8 '>
           <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 
           border border-gray-400  rounded-full text-sm bg-blue-100'>
            <p className='text-blue-700 '>New: Ai feature integrated </p>
           </div>
           <h1 className='text-3xl sm:text-6xl font-smibold m:leading-16 text-gray-600'>Its Our <span className='text-blue-800'>blogging</span> <br/>website.</h1>
           <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>The Our blog is dedicated to helping 
            you transform your small urban balcony into a vibrant, edible garden. We provide simple,
             step-by-step DIY projects and budget-friendly tips so you can grow more, no matter your space.</p>
             <form  onSubmit={submitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
              <input ref={inputRef} type="text"  placeholder='Secrch for blogs' required className='w-full pl-4 outline-none'/>
              <button type='submit' className='bg-blue-700 text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-all'>Search</button>
             </form>
        </div>
       <div className='text-center'>{input &&
        <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm
        shadow-custom-sm cursor-pointer'>Clear search</button>}
       </div>
    </div>
  )
}

export default Header
