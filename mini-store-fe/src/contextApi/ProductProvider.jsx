import { createContext, useContext, useReducer } from "react";


const ProductContext = createContext()

const initialState = {
        category : [],
        minPrice : 0,
        maxPrice : 100,
        search : '',
        page : '',
        limit: ''
    }
    const productReducer = (state, action)=>{
        switch(action.type) {
            case 'CATEGORY_FILTER' : return {...state, category:[...state.category, action.payload]}
            
            default : return state
        }
    }

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