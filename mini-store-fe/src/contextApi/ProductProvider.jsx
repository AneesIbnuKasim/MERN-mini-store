import { createContext, useContext, useReducer } from "react";
import productReducer from "../reducer/productReducer";

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


    return(
    <ProductContext.Provider value={{state, dispatch}}>
        {children}
    </ProductContext.Provider>)
}


export {
    ProductContext,
}

export default ProductProvider