import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import styles from './styles';
import StarRatings from "react-star-ratings";
import { connect } from 'react-redux';


class Banner extends Component {
    state={
        newarray:[]
    }

    newarray=null
    render() {
        console.log(this.props.reviews.data)
        setTimeout(() => {
            this.setState({
            newarray:this.props.userReview.data})
        }, 1000);
      let review_this_product = this.state.newarray.filter((item)=>{ return item.rating_product_id===this.props.productid.id})
  
    const {classes} = this.props;
        return (
            <div className={`w-full flex flex-wrap h-32 pt-6 ${classes.borderBottom}`}>
      
                
    {review_this_product!==undefined?review_this_product.map((item)=>{ return     <div className="w-1/4">
                    <div className="w-full review-star">
                        <StarRatings
                            rating={item.ratingproduct}
                            starRatedColor="#ffc94f"
                            starEmptyColor="#eeeeee"
                            starDimension="20px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                    <div className="w-full pt-4">
                        <div className={classes.reviewNameText}>
                            {item.name}
                        </div>
                    </div>
                </div>}):null}
     
                <div className="w-1/4">
                    <div className="w-full review-star">
                        <StarRatings
                            rating={this.props.reviews.ratingproduct}
                            starRatedColor="#ffc94f"
                            starEmptyColor="#eeeeee"
                            starDimension="20px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                    <div className="w-full pt-4">
                        <div className={classes.reviewNameText}>
                            {this.props.reviews.name}
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}


  
function mapStateToProps({reviewsreducers,productreducers, userreviewreducers, productidreducers  }) {
    return {
     reviews: reviewsreducers,
     detail: productreducers,
     userReview: userreviewreducers,
     productid: productidreducers
    
    }
  }
  
  export default withStyles(styles)(connect(mapStateToProps)(Banner));
  
  
