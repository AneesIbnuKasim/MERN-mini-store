import useProduct from '../hooks/useProduct';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa"

function ProductCard() {

  
  const {state, loading} = useProduct()
  const {products} = state
  const API_BASE_URL = import.meta.env.VITE_API_URL
function getImageUrl(imagePath) {
  //for images url images
  if (imagePath?.startsWith('http')) {
    return imagePath;
  }
  // local upload folder
  return `${API_BASE_URL}${imagePath}`;
}
  
  
  return (
    
    <>
     {loading? (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <p className="ml-2 text-gray-600 text-lg">Loading products...</p>
      </div>
     ) 

     :   

     (<div className='grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            { 
              products?.map(product=>(
                <div key={product._id} className='border-1 border-gray-200 shadow-lg rounded-sm hover:scale-105 transition-all'>
                <img className='bg-gray-50 h-40 sm:h-45 md-h-50 lg:h-55 w-full' src={getImageUrl(product.images[0])}
 alt="product img" />
                <div className='py-2 px-3 '>
                  <p  className='text-gray-500 text-sm sm:text-md'>{product.brand}</p>
                <p className='text-md sm:text-lg'>{product.title}</p>
                <p className='text-sm text-gray-700 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]'>{product.description}</p>
    {/* ---------------------------- star rating ------------------------------ */}
     <div className='flex my-2 items-center gap-1'>
      {[...Array(5)].map((_, index) => {
        if (product.rating >= index + 1) {
          // full star
          return <FaStar key={index} size={24} className='text-yellow-500' />;
        } else if (product.rating > index && product.rating < index + 1) {
          // half star
          return <FaStarHalfAlt key={index} size={24} className='text-yellow-500' />;
        } else {
          // empty star
          return <FaRegStar key={index} size={24} className='text-yellow-500' />;
        }
      })}
      <p>({product.rating})</p>
    </div>

                <h4 className='mt-1'>${product.price}</h4>
                <button className='bg-[#edb228] mt-2 py-1 px-3 rounded-xl' >Add to cart</button>
                </div>
            </div>
              ))
            }
        </div>) }
    </>
  )
}

export default ProductCard
