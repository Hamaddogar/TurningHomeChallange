const allproductsFormReducers = ((state = [], action) => {
  

    switch (action.type) {

        case 'allproducts':
    
            return {...state, ...action.payloed}
                  
        default:
            return state


    }


})
 export  default allproductsFormReducers;