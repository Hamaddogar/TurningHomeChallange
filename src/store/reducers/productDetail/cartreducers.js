const cartreducers = ((state = [], action) => {
  
  
        switch (action.type) {
    
            case 'cartaction':
        
                return {...state, ...action.payloed}
                      
            default:
                return state
    
    
        }
    
    
    })
     export  default cartreducers;