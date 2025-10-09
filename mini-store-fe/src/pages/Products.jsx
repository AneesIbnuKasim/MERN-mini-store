import React, { useLayoutEffect } from 'react'
import ProductCard from '../components/ProductCard'
import SideBar from '../components/SideBar'
import Pagination from '../components/Pagination'
import useProduct from '../hooks/useProduct'

function Products() {

    const { adminLayout, setAdminLayout, loading } = useProduct()
    
  useLayoutEffect(()=>{
      setAdminLayout(false)
    },[adminLayout])

  
  return (
    <>
      <div></div>
      <div className='flex flex-row w-full py-10 px-3'>
        <div className=' sm:w-1/3 md:w-1/5'>
         < SideBar />
        </div>
        <div className='sm:flex-1'>
         <ProductCard/>
        </div>
      </div>
      <Pagination/>
    </>
  )
}

export default Products
