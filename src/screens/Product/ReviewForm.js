import React, {Component} from 'react';
import {Button, withStyles} from '@material-ui/core';
import StarRatings from "react-star-ratings";
import {TextFieldFormsy} from '../../components/Formsy';
import Formsy from 'formsy-react';
import styles from './styles';
import Visibility from '@material-ui/icons/Visibility';
import { reviews } from '../../store/actions/reviews/reviews';
import { userreview } from '../../store/actions/reviews/userreview';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import store from '../../store/index';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from 'react-redux';

import { stat } from 'fs';


class RegisterForm extends Component {
    state={
        addreview:0,
         

     }
     componentDidMount() {
       
     
        fetch("http://localhost:8080/api/userreview" )
          .then((res) => { return res.json() })
          .then((res) => {
            console.log(res)
            debugger
            // this.setState({
            //   userreview: res.data
            // }
            // )
              store.dispatch(userreview(res))
       
          })
          .catch((error) => console.log(error))
    
    
      }
    loginform=(e)=>{
    e.preventDefault();
     if(this.props.login.length===0)
     {
        Alert.error(" Sorry!Only Registerd user Can Review Please login", {
            position: 'bottom',
          })
        
     }
      else{

          var myreview = this.myreview.value;
             var productreviewId=this.props. productiddetail.id
             var name=this.props.login.uname
          this.setState({
           addreview:myreview
          })
           
              var reviewobj={myreview,productreviewId,name}
               console.log(reviewobj)
        var option = {
            method: "POST",
            body: JSON.stringify(reviewobj),
            headers: {
                "Content-Type": "application/json",
            }
        }
        fetch("http://localhost:8080/api/review", option)
            .then((res) => { return res.json() })
            .then((response) => {
                console.log(response.data.name);
                store.dispatch(reviews(response.data))
               
             })
          
      }    

  
    }
    
    render() {
        // console.log(this.state.userreview.map((item)=>{console.log(item.rating_product_id)}))

        

        return (
            <div className="w-full flex flex-row justify-center">
                  <Alert stack={{limit: 1}} />
                 <ValidatorForm
                   onSubmit={this.loginform}
                    className="px-8 pt-6 mt-6 pb-8 mb-4"
                >
                    <div className="w-full py-4 mb-4">
                   
                        <StarRatings
                            rating={this.props.reviews.ratingproduct}
                            changeRating={() => console.log('Star clicked')}
                            starRatedColor="#ffc94f"
                            starEmptyColor="#797979"
                            starHoverColor="#ffc94f"
                            starDimension="20px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name='rating'
                            className="review-star"
                        />
                    </div>

                    <TextValidator
                     inputRef={(myreview) =>this.myreview =  myreview}
                        className="w-full mb-4"
                        type="number"
                        name="review"
                        label="Your Review like 4.8"
                        variant="outlined"
                        id="review"
                           required
                          
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="LOG IN"
                        id="addReview"
                        value="legacy"
                        onClick={() => console.log('Review submitted!!')}
                    >
                        Add Review
                    </Button>

                </ValidatorForm>
            </div>
        );
    }
}


function mapStateToProps({ productidreducers,loginreducers,reviewsreducers}) {
    debugger;
    return {
      productiddetail: productidreducers,
      login:loginreducers,
      reviews: reviewsreducers,
  
    }
  }
  
  export default withStyles(styles)(connect(mapStateToProps)(RegisterForm));
  
  

