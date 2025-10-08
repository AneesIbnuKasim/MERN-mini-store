import React, { useCallback, useEffect, useRef, useState } from 'react'
import useProduct from '../hooks/useProduct'
import useDebounce from '../hooks/useDebounce'
import axios from 'axios'

function Navbar() {

  const { dispatch, setSearch } = useProduct()
  const [suggestion, setSuggestion] = useState([])
  const [showSuggestion, setShowSuggestion ] = useState(false)
  const [query, setQuery] = useState('')
  const base_url = import.meta.env.BACKEND_BASE_URL || 'http://localhost:3000'
  const wrapperRef = useRef()

  const handleSuggestion = (e)=>{
    setQuery(e.target.value)
  }

  const handleSearch = (e)=>{
      console.log('search',query)
      dispatch({type:'SET_FILTER', key:'search', value:query})
      dispatch({type:'SET_PAGE', payload:1})
  }
  
  const debouncedSuggestion  = useDebounce(query,500)
  
  useEffect(()=>{
    const getSuggestions = async()=>{
      if(debouncedSuggestion) {
       const response = await axios.get(`${base_url}/suggestion?query=${debouncedSuggestion}`)
       if (response.data.length >0) {
        setSuggestion(response.data)
        setShowSuggestion(true)
       }
       console.log(response.data);
    }
    }
    getSuggestions()
  },[debouncedSuggestion])


  return (
    <>
    <div className=' flex relative items-center justify-between  sm:pr-1 pl-3 pr-2 md:pr-[30vw] py-3   bg-gray-800'>
        <div className='flex items-center gap-3 md:gap-5'>
        <img className='h-8 md:h-10' src="/trolley.png" alt="logo" />
        <div className='flex items-baseline'>
        <h1 className='text-2xl text-white'>Suq</h1>
        <span className='text-lg text-stone-200'>.com</span>
        </div>
        </div>
        <div ref={wrapperRef} className='relative'>
          <input value={query} onChange={(e)=>handleSuggestion(e)} placeholder='search...' className='relative border-1 h-10 w-[45vw] md:w-[30vw] bg-white rounded-md outline-0 py-1 px-2 border-red-100'/>
          <button onClick={handleSearch} className='absolute right-0 top-0 rounded-r-lg border-l   p-0.5 bg-stone-300'><img src="/search.png" alt="search-img" /></button>
          {
          showSuggestion && query &&(

                <ul className="absolute bg-gray-200 w-full mt-1 max-h-60 rounded-b-xl overflow-auto">
          {suggestion.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
                dispatch({type:'SET_FILTER', key:'search', value:item.title})
                setShowSuggestion(false);
              }}>
              {item.title}
            </li>
          ))}
        </ul>
          )
        }
        </div>
        
          
    </div>
    </>
  )
}

export default Navbar
