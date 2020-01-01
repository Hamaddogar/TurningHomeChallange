const reviewsreducers = ((state = [], action) => {
  
debugger
    switch (action.type) {

        case 'reviews':
    
            return {...state, ...action.payloed}
                  
        default:
            return state


    }


})
 export  default reviewsreducers;