import React, { useEffect, useMemo } from 'react'
import useProduct from '../hooks/useProduct'

function SideBar() {

    const { products, dispatch, category, state } = useProduct()
    const uniqueCategory = useMemo(()=>{
        const uniqueItem = new Set()
        products.map(item=>uniqueItem.add(item.category))
        const uniqueArray = [...uniqueItem]
        return uniqueArray
    },[products])

    const filterHandler = (e)=>{
        const name = e.target.name
       dispatch({type:'SET_FILTER' , key:name, value:e.target.value})
    }

    useEffect(()=>{
        console.log('cat:',category);
        console.log('price:',state.minPrice);

    },[state])
    
  return (
    <div className='hidden bg-gray-200 sm:block m-auto  '>
      <h3 className='mb-3 font-semibold'>Filters & Sorting</h3>
        <form className='flex flex-col gap-1'>
            {/* ------------------price range slider-------------------- */}
            <div data-role="rangeslider">
        <label for="price-min">Price:{}</label>
        <input type="range" onChange={(e)=>filterHandler(e)} name="minPrice" id="price-min" min="0" max="1000" />
        <label for="price-max">Price:</label>
        <input type="range" name="price-max" id="maxPrice" value="800" min="0" max="1000" />
      </div>
            {/* ------------------------Category---------------------- */}
        <div>
            <h4 className='font-medium'>Category</h4>
            {
                uniqueCategory.map(category=>(
                    <label>
  <input onClick={(e)=>filterHandler(e)} type="checkbox" name='category' value={category} /> {category}
</label>
                ))
            }
        </div>
        {/* ---------------------------------Sort------------------------------ */}
        <div>
            sort
        </div>
        </form>
    </div>
  )
}

export default SideBar
