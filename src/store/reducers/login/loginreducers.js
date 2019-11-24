const loginFormReducers = ((state = [], action) => {
  

    switch (action.type) {

        case 'loginaction':
    
            return {...state, ...action.payloed}
                  
        default:
            return state


    }


})
 export  default loginFormReducers;