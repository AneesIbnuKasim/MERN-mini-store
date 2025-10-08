import { Link, Navigate } from "react-router-dom"
import SearchInput from "./SearchInput"


function Navbar() {

    const admin = location.pathname.includes('add-product')

  return (
    <>
    <div className="sticky top-0 z-50">
      <div className={`flex relative items-center ${admin? 'sm:pr-5' : "sm:pr-1 md:pr-[30vw]"} justify-between   pl-3 pr-2  py-3   bg-gray-800`}>
        <div className='flex items-center gap-3 md:gap-5'>
        <img className='h-8 md:h-10' src="/trolley.png" alt="logo" />
        <Link to={'/products'} className='flex items-baseline cursor-pointer'>
        <h1 className='text-2xl text-white '>Suq</h1>
        <span className='text-lg text-stone-200'>.com</span>
        </Link>
        </div>
       {!admin &&  <SearchInput /> }
       {admin && (
        <button className="text-white">Back To Products</button>
       )}
    </div>
    </div>
    </>
  )
}

export default Navbar
