


const productReducer = (state, action)=>{
        switch(action.type) {
            case 'SET_PRODUCTS'    : return {...state,products:action.payload,loading:false}
            case 'SET_FILTER' : return (action.key==='category') ? {...state, category:[...state.category,action.value]} : {...state, [action.key]:action.value}
            case 'SET_LOADING'    : return {...state,loading:true}
            case 'SET_TOTAL_COUNT'    : return {...state,totalCount:action.payload}
            case 'SET_PAGE' : return {...state, page:action.payload
                
            }

            default : return state
        }
    }

export default productReducer
