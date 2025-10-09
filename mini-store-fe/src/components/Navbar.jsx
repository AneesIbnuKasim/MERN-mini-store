import { Link, useLocation } from "react-router-dom"
import SearchInput from "./SearchInput"
import { useEffect, useState } from "react"
import useProduct from "../hooks/useProduct"


function Navbar() {
    const [showSearch, setShowSearch] = useState(true)
    const { adminLayout, setAdminLayout } = useProduct()
    const location = useLocation() 

    //to switch the navbar layout depending on pathname
    useEffect(()=>{
      location.pathname.includes('add-product') ? setShowSearch(false) : setShowSearch(true)
    },[location.pathname])

  return (
    <>
    <div className="sticky top-0 z-50">
      <div className={`flex relative items-center ${showSearch? "sm:pr-1 md:pr-[30vw]" : 'sm:pr-5'} justify-between   pl-3 pr-2  py-3   bg-gray-800`}>
        <div className='flex items-center gap-3 md:gap-5'>
        <img className='h-8 md:h-10' src="/trolley.png" alt="logo" />
        <Link to={'/'} onClick={()=>setAdminLayout(false)} className='flex items-baseline cursor-pointer'>
        <h1 className='text-2xl text-white '>Suq</h1>
        <span className='text-lg text-stone-200'>.com</span>
        </Link>
        </div>
       {!adminLayout &&  <SearchInput /> }
       {adminLayout && (
        <Link to={'/'} onClick={()=>setAdminLayout(false)} className="text-white">Back To Products</Link>
       )}
    </div>
    </div>
    </>
  )
}

export default Navbar
