import { createContext, useContext, useEffect, useReducer, useState } from "react";
import productReducer from "../reducer/productReducer";
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate()
    const location = useLocation()
    const API_BASE_URL = import.meta.env.VITE_API_URL

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
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products?${queryString}`)
                dispatch({type:'SET_PRODUCTS',payload:response.data.products})
                dispatch({type:'SET_TOTAL_COUNT',payload:response.data.totalCount})
                
                //set all categories to dynamically show category filter options
                setAllCategories(response.data.allCategories)
               
                //sync search query with url without re-loading
               if (location.pathname=='/') {navigate(`?${queryString}`,{replace:false})}
                
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchProducts()
    },[category, minPrice, maxPrice, search, page, limit, sort])

// -----------------------add new products to db -----------------------------

const addProducts = async(values)=>{
    

    try {
         await axios.post(`${API_BASE_URL}/api/products`,values,
        {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    } catch (error
    ) {
        console.error(error.message);
        
    }
    navigate('/')
    
}

    return(
    <ProductContext.Provider value={{state, dispatch,
        category, minPrice, maxPrice, search, page, limit, products, loading, totalCount, allCategories, addProducts
    }}>
        {children}
    </ProductContext.Provider>)
}


export {
    ProductContext,
}

export default ProductProvider