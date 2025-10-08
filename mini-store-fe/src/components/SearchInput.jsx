import React, { useCallback, useEffect, useRef, useState } from 'react'
import useProduct from '../hooks/useProduct'
import useDebounce from '../hooks/useDebounce'
import axios from 'axios'

function SearchInput() {

        const { dispatch } = useProduct()
  const [suggestion, setSuggestion] = useState([])
  const [showSuggestion, setShowSuggestion ] = useState(false)
  const [query, setQuery] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_URL
  const wrapperRef = useRef()

  const handleSuggestion = (e)=>{
    setQuery(e.target.value)
  }

  const handleSearch = (e)=>{
      dispatch({type:'SET_FILTER', key:'search', value:query})
      dispatch({type:'SET_PAGE', payload:1})
      setShowSuggestion(false)
  }
  
  const debouncedSuggestion  = useDebounce(query,500)
  
  useEffect(()=>{
    const getSuggestions = async()=>{
      if(debouncedSuggestion) {
       const response = await axios.get(`${API_BASE_URL}/api/products/suggestion?query=${debouncedSuggestion}`)
       if (response.data.length >0) {
        setSuggestion(response.data)
        setShowSuggestion(true)
       }
    }
    }
    getSuggestions()
  },[debouncedSuggestion])

  // -----------useEffect listen and handle outside click of suggestion bar ------------
    useEffect(()=>{
      const handleOutsideClick = (e)=>{
    if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
      setShowSuggestion(false)
    }
  }
    document.addEventListener('mousedown',handleOutsideClick)
    return ()=>{
      document.removeEventListener('mousedown',handleOutsideClick)
    }
    },[])

  return (
    


<div ref={wrapperRef} className='relative'>
          <input value={query} name='input' onChange={(e)=>handleSuggestion(e)} placeholder='search...' className='relative border-1 h-10 w-[45vw] md:w-[30vw] bg-white rounded-md outline-0 py-1 px-2 border-red-100'/>
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
  )
}

export default SearchInput
