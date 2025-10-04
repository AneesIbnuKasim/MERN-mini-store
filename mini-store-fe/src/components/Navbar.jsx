import React from 'react'

function Navbar() {
  return (
    <>
    <div className=' flex items-center justify-between pl-3 pr-[30vw] py-3   bg-gray-800'>
        <div className='flex items-center gap-5'>
        <img className='h-10' src="/trolley.png" alt="logo" />
        <div className='flex items-baseline'>
        <h1 className='text-2xl text-white'>Suq</h1>
        <span className='text-lg text-stone-200'>.com</span>
        </div>
        </div>
        <input placeholder='search...' className='border-1 h-10 w-[30vw] bg-white rounded-md outline-0 py-1 px-2 border-red-100'/>
    </div>
    </>
  )
}

export default Navbar
