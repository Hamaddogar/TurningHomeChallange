const orderReducers = ((state = [], action) => {
  

    switch (action.type) {

        case 'orderaction':
    
            return {...state, ...action.payloed}
                  
        default:
            return state


    }


})
 export  default orderReducers;