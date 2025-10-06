


const productReducer = (state, action)=>{
        switch(action.type) {
            case 'SET_PRODUCTS'    : return {...state,products:action.payload,loading:false}
            case 'SET_FILTER' : if(action.key==='category') return {...state, [action.key]:action.value}
                                 else return {...state, category:[...state.category,action.value]}
            case 'SET_LOADING'    : return {...state,loading:true}

            default : return state
        }
    }

export default productReducer
