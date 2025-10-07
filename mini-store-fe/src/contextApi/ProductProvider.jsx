import { createContext, useContext, useEffect, useReducer, useState } from "react";
import productReducer from "../reducer/productReducer";
import axios from 'axios'

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

    //Destructure state object to pass on provider value
     const   { category, minPrice, maxPrice, search, page, limit, products, sort, loading, totalCount } = state
    //fetch products
    useEffect(()=>{

        // ----------------------------create query string------------------------
        const params = {
            category, minPrice, maxPrice, search, page, limit, sort
        }
        const queryString = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([Key,value])=>value!==undefined&&value!==''&&value.length!==0))).toString()
        console.log('srch p',queryString);
        

        const fetchProducts = async()=>{
            try {
                const response = await axios.get(`http://localhost:3000/products?${queryString}`)
                dispatch({type:'SET_PRODUCTS',payload:response.data.products})
                dispatch({type:'SET_TOTAL_COUNT',payload:response.data.totalCount})
                console.log('ttttttt',response.data.totalCount);
                
                
                //set all categories to dynamically show category filter options
                setAllCategories(response.data.allCategories)
                window.history.pushState(null, '', `?${queryString}`);
                
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchProducts()
    },[category, minPrice, maxPrice, search, page, limit, sort])
    useEffect(()=>{
        console.log('state:',state);
    },[state])


    return(
    <ProductContext.Provider value={{state, dispatch,
        category, minPrice, maxPrice, search, page, limit, products, loading, totalCount, allCategories
    }}>
        {children}
    </ProductContext.Provider>)
}


export {
    ProductContext,
}

export default ProductProvider