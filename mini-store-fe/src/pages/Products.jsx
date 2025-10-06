import React from 'react'
import ProductCard from '../components/ProductCard'
import SideBar from '../components/SideBar'

function Products() {
  return (
    <>
      <div className='flex flex-row w-full'>
        <SideBar/>
        <ProductCard/>
      </div>
    </>
  )
}

export default Products
