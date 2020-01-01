const userreviewreducers = ((state = [], action) => {
  
    debugger
        switch (action.type) {
    
            case 'userreview':
        
                return {...state, ...action.payloed}
                      
            default:
                return state
    
    
        }
    
    
    })
     export  default userreviewreducers;