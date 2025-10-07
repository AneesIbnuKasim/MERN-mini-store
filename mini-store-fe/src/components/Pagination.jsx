import React, { useEffect, useMemo, useRef } from 'react'
import useProduct from '../hooks/useProduct'
import { FcPrevious } from "react-icons/fc"
import { FcNext } from "react-icons/fc"

function Pagination() {
        const {state, dispatch, products, totalCount, page, limit} = useProduct()
        console.log('tottal',totalCount);
        
        const totalPages = Math.ceil(totalCount/limit)
        
        const pageNumbers = useMemo(()=>{
            const pageNum = []
        pageNum.push(page)
        if(page+1<totalPages) pageNum.push(page+1)
        if(page+2< totalPages) pageNum.push(page+2)
        
        if(!pageNum.includes(totalPages)) pageNum.push(totalPages)
            return pageNum
        },[totalCount,state])
    

            const handleButton = (pageAction)=>{
                    dispatch({type:'SET_PAGE',payload:pageAction})
            }
        
        
  return (
    <div className='mb-5 flex ' >
      <div className='h-15 flex bg-gray-100 w-auto m-auto rounded-md'>
            <button disabled={page===1}  className='w-15 sm:w-25 border-r bg-amber-100 border-gray-300 px-0.5 sm:px-1' onClick={()=>handleButton(page-1)
            }>
                     <div className='flex gap-0.5 justify-center items-center'>
                        <FcPrevious />
                        <span className='hidden sm:block'>Previous</span>
                     </div>
            </button>
            {pageNumbers.map((num,index)=>(
                <React.Fragment key={index}>
                <button onClick={()=>handleButton(num)} className={`p-4 border-r border-gray-300 ${num===page ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>{num}</button>
                {index < pageNumbers.length - 1 && pageNumbers[index + 1] - num > 1  && (<button className={`p-4 border-r border-gray-300`}>...</button>)}
                </React.Fragment>
                
            ))}
            
            <button disabled={page===totalPages}  className='w-15 sm:w-25 border-r bg-amber-100 border-gray-300 px-0.5 sm:px-1' onClick={()=>handleButton(page+1)
            }>
                <div className='flex gap-0.5 justify-center items-center'>
                        <span className=' hidden sm:block'>Next</span>
                        <FcNext />
                     </div>
            </button>
      </div>
    </div>
  )
}

export default Pagination


