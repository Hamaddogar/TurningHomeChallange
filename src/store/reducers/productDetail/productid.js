const productidreducers = ((state = [], action) => {
  

    switch (action.type) {

        case 'productid':
    
            return {...state, ...action.payloed}
                  
        default:
            return state


    }


})
 export  default productidreducers;