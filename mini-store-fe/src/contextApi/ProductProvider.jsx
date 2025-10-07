import { createContext, useContext, useEffect, useReducer } from "react";
import productReducer from "../reducer/productReducer";
import axios from 'axios'

const initialState = {
        category : [],
        minPrice : 0,
        maxPrice : 100,
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

    //Destructure state object to pass on provider value
     const   { category, minPrice, maxPrice, search, page, limit, products, loading, totalCount } = state
    //fetch products
    useEffect(()=>{
        const fetchProducts = async()=>{
            try {
                const response = await axios.get(`http://localhost:3000/products?page=${page}`)
                dispatch({type:'SET_PRODUCTS',payload:response.data.products})
                dispatch({type:'SET_TOTAL_COUNT',payload:response.data.totalCount})
                
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchProducts()
    },[page])
    useEffect(()=>{
        console.log('state:',state);
    },[state])


    return(
    <ProductContext.Provider value={{state, dispatch,
        category, minPrice, maxPrice, search, page, limit, products, loading, totalCount
    }}>
        {children}
    </ProductContext.Provider>)
}


export {
    ProductContext,
}

export default ProductProvider