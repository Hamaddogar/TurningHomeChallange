const productreducers = ((state = [], action) => {
  

    switch (action.type) {

        case 'productDetail':
    
            return {...state, ...action.payloed}
                  
        default:
            return state


    }


})
 export  default productreducers;