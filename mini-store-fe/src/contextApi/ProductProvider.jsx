import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import productReducer from "../reducer/productReducer";
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


const initialState = {
        category : [],
        minPrice : '',
        maxPrice : '',
        sort : '',
        search : '',
        page : 1,
        limit: 6,  
        products: [], 
        loading: false,
        totalCount: 0,
    }

const ProductContext = createContext()

const ProductProvider = ({children})=>{

    const [state, dispatch] = useReducer(productReducer, initialState)
    const [ allCategories, setAllCategories] = useState([])
    const [ adminLayout, setAdminLayout ] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const API_BASE_URL = import.meta.env.VITE_API_URL
    const navigationRef = useRef(false)

    //Destructure state object to pass on provider value
     const   { category, minPrice, maxPrice, search, page, limit, products, sort, loading, totalCount } = state

    //fetch products
    useEffect(()=>{
        // ----------------------------create query string------------------------
        const params = {
            category, minPrice, maxPrice, search, page, limit, sort
        }
        const queryString = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([Key,value])=>value!==undefined&&value!==''&&value.length!==0))).toString()

        const fetchProducts = async()=>{
            dispatch({type:'SET_LOADING', payload:true})
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products?${queryString}`)
                dispatch({type:'SET_PRODUCTS',payload:response.data.products})
                dispatch({type:'SET_TOTAL_COUNT',payload:response.data.totalCount})
                
                //set all categories to dynamically show category filter options
                setAllCategories(response.data.allCategories)

                //sync search query with url without re-loading
               if (location.pathname === '/' && location.search !== `?${queryString}`){
                navigationRef.current = true
                navigate(`?${queryString}`,{replace:false})
               }   
            } catch (error) {
                console.error(error.message)
            }
            finally {
                dispatch({type:'SET_LOADING', payload:false})
            }
        }
        fetchProducts()
    },[category, minPrice, maxPrice, search, page, limit, sort])

        useEffect(() => {
            //checking if its our request and return if true
            if(navigationRef.current) {
                navigationRef.current = false
                return
            }
  
    const params = new URLSearchParams(location.search);
  const page = parseInt(params.get('page')) || 1

      dispatch({type: 'SET_PAGE',payload: page})

}, [location.search])

useEffect(()=>{
    console.log('prod',loading);
},[loading])

// -----------------------add new products to db -----------------------------

const addProducts = async(values)=>{

    Swal.fire({
  title: 'Success!',
  text: 'Your product has been added successfully.',
  icon: 'success',
  confirmButtonText: 'OK'
})
    try {
         await axios.post(`${API_BASE_URL}/api/products`,values,
        {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    setAdminLayout(false)
    navigate('/')
    } catch (error
    ) {
        console.error(error.message);
        
    }
}

    return(
    <ProductContext.Provider value={{state, dispatch,
        category, minPrice, maxPrice, search, page, limit, products, loading, totalCount, allCategories, addProducts, adminLayout, setAdminLayout
    }}>
        {children}
    </ProductContext.Provider>)
}


export {
    ProductContext,
}

export default ProductProvider