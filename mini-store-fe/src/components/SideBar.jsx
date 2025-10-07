import React, { useEffect, useMemo } from 'react'
import useProduct from '../hooks/useProduct'
import 'react-range-slider-input/dist/style.css';
import PriceRangeSlider from './PriceRangeSlider';

function SideBar() {

    const { products, dispatch, category, minPrice, maxPrice, state } = useProduct()
    const uniqueCategory = useMemo(()=>{
        const uniqueItem = new Set()
        products.map(item=>uniqueItem.add(item.category))
        const uniqueArray = [...uniqueItem]
        return uniqueArray
    },[products])
    // ---------------------------------Handle all filters--------------------------
    const handleFilter = (e)=>{
        const name = e.target.name
       dispatch({type:'SET_FILTER' , key:name, value:e.target.value})
    }
    // ---------------------------------Handle all sorting options--------------------------
    const handleSort = (e)=>{
        dispatch({type:'SET_SORT',payload:e.target.value})
    }

  return (
    <div className='hidden sm:block m-auto pl-1 pr-6   '>
      <h3 className='mb-3 font-semibold'>Filters & Sorting</h3>
        <form className='flex flex-col gap-5'>
            {/* ------------------price range slider-------------------- */}
            <PriceRangeSlider />

            {/* ------------------------Filter---------------------- */}
        <div >
            <h4 className='font-text-lg font-semibold text-gray-800 mb-4'>Category</h4>
            <div className='flex flex-col-2 gap-5'>
                {
                uniqueCategory.map((category,index)=>(
                    <label key={index}>
  <input  onClick={(e)=>handleFilter(e)} type="checkbox" name='category' value={category} /> {category}
</label>
                ))
            }
            </div>
        </div>
        {/* ---------------------------------Sort------------------------------ */}
        <div>
            <h4 className='font-text-lg font-semibold text-gray-800 mb-4'>Sort</h4>
            <select onChange={(e)=>handleSort(e)} name="sort" id="sort">
                <option value="">Relevant</option>
                <option value="price">Price: Low-High</option>
                <option value="-price">Price: High-Low</option>
                <option value="name">Name</option>
            </select>

        </div>
        </form>
    </div>
  )
}

export default SideBar
