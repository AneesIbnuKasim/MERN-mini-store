import React from 'react'

function ProductCard() {
  
  return (
    <>
      <div className='bg-black h-[80vh]'>
        <div className='grid gap-5  grid-cols-3'>
            
            <div className='bg-red-300'>
                <img className='h-[30%] w-full' src="/trolley.png" alt="" />
                <h6>Product1</h6>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt esse, quaerat doloremque laboriosam tempora debitis vero nam sint nobis veritatis, quisq</p>
            </div>
            <div className='bg-red-300'>
                <img className='h-[30%] w-full' src="/trolley.png" alt="" />
                <h6>Product1</h6>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt esse, quaerat doloremque laboriosam tempora debitis vero nam sint nobis veritatis, </p>
            </div>
            <div className='bg-red-300'>
                <img className='h-[30%] w-full' src="/trolley.png" alt="" />
                <h6>Product1</h6>
                <p className={'text-sm'}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt esse, quaerat </p>
            </div>
            
            
        </div>
      </div>
    </>
  )
}

export default ProductCard
