import React from "react";
import Typography from '@material-ui/core/Typography';
import Header from '../../../src/layouts/main/mainHeader/mainHeader';
import Footer from '../../../src/layouts/components/Footer/index'

  class Searcherror extends  React.Component{
   render()
   {

    return(
        <div>
            <Header/>
            <center> <Typography variant="h6" gutterBottom>
         Sorry! Your Search is Not Found Try Again
      </Typography><img src="https://cdn.dribbble.com/users/1785628/screenshots/5605512/qonto-empty-state-illustration-search-no-result-tom-souverain.gif"/></center>
             <Footer/>
        </div>
    )


   }







  } 
   export default Searcherror;