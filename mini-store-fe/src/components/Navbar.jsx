import React from 'react'

function Navbar() {
  return (
    <>
    <div className=' flex items-center justify-between  sm:pr-1 pl-3 pr-2 md:pr-[30vw] py-3   bg-gray-800'>
        <div className='flex items-center gap-3 md:gap-5'>
        <img className='h-8 md:h-10' src="/trolley.png" alt="logo" />
        <div className='flex items-baseline'>
        <h1 className='text-2xl text-white'>Suq</h1>
        <span className='text-lg text-stone-200'>.com</span>
        </div>
        </div>
        <div className='relative'>
          <input placeholder='search...' className='relative border-1 h-10 w-[45vw] md:w-[30vw] bg-white rounded-md outline-0 py-1 px-2 border-red-100'/>
          <button className='absolute right-0 top-0 rounded-r-lg border-l   p-0.5 bg-stone-300'><img src="/search.png" alt="search-img" /></button>
        </div>
    </div>
    </>
  )
}

export default Navbar
