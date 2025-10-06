import { createContext, useContext, useEffect, useReducer } from "react";
import productReducer from "../reducer/productReducer";
import axios from 'axios'

const initialState = {
        category : [],
        minPrice : 0,
        maxPrice : 100,
        search : '',
        page : 1,
        limit: 6,  
        products: [], 
        loading: false,
        error: null

    }

const ProductContext = createContext()

const ProductProvider = ({children})=>{

    const [state, dispatch] = useReducer(productReducer, initialState)

    //fetch products
    useEffect(()=>{
        const fetchProducts = async()=>{
            try {
                const response = await axios.get('http://localhost:3000/products')
                console.log('response',response.data);
                dispatch({type:'SET_PRODUCTS',payload:response.data})
                
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchProducts()
    },[])
    useEffect(()=>{
        console.log('product:',state.products);
        
    },[state])


    return(
    <ProductContext.Provider value={{state, dispatch}}>
        {children}
    </ProductContext.Provider>)
}


export {
    ProductContext,
}

export default ProductProvider