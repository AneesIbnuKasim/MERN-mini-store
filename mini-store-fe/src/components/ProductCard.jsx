import React from 'react'
import useProduct from '../hooks/useProduct';

function ProductCard() {
  const {state} = useProduct()
  const {products} = state
  
  
  return (
    <>
      <div className=''>
        <div className='grid gap-5  grid-cols-3'>
            { 
              products.map(product=>(
                <div className='border-1 h-[60vh]'>
                <img className='h-60 w-full' src={product.images[0]} alt="product img" />
                <p className='text-gray-500'>{product.brand}</p>
                <h6>{product.title}</h6>
                <p>{product.description}</p>
                <h4>price</h4>
            </div>
              ))
            }
            
        </div>
      </div>
    </>
  )
}

export default ProductCard
