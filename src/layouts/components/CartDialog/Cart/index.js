/**
 * Implement functionality for Cart
 */
import {Fab, withStyles,CircularProgress} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import React, {Component} from 'react';
import systemConfig from "../../../../config/system";
import withWidth from '@material-ui/core/withWidth';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import styles from './styles';
import classNames from "classnames";

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class Cart extends Component {
    state={
        loading: true,
        counter:this.props.cartproduct.counter,
        totalPrice : (this.props.cartproduct.productData.discounted_price >0 ? this.props.cartproduct.productData.discounted_price: this.props.cartproduct.productData.price)
    }
    componentDidMount()
    {
        setTimeout(() => {
            this.setState({ loading: false })
          }, 4000)
    }
    increaseValue=(event)=>{
 
  
        this.setState({
          counter: this.state.counter + 1
      });
      }
      decreaseValue=(event)=>{
         
        
        this.setState({
          counter: this.state.counter - 1
      });
      }
    render() {
        const {classes } = this.props;
         const object = this.props.cartproduct
          

if (this.state.loading) {
    return <div>
    <div className="flex flex-wrap shadow flex justify-center py-24 bg-white">
        <CircularProgress size={40} color="primary"/>
    </div>
</div>

  }
   if (Object.keys(object).length ===0 )
  {

       return <div>
    <div className="flex flex-wrap shadow flex justify-center py-24 bg-white">
    <img  src={"https://www.ezeebazaar.in/img/Frontend/empty-cart.png"}/>
    </div>
</div>


  }
   
  else {
        return (
            <div id="cart">
                <div className={`flex mb-4 h-8 ${classes.headerBorderBottom}`}>
                    <div className="w-3/6">
                        <span className={classes.headerTitle}>Item</span>
                    </div>
                    <div className="w-1/12">
                        <span className={classes.headerTitle}>Color</span>
                    </div>
                    <div className="w-1/12">
                        <span className={classes.headerTitle}>Size</span>
                    </div>
                    <div className="w-3/12">
                        <span className={classes.headerTitle}>Quantity</span>
                    </div>
                    <div className="w-2/12">
                        <span className={classes.headerTitle}>Price</span>
                    </div>
                   
                </div>
                    <div className="flex mb-4">
                        <div className="w-2/12">
                            <img className="w-full" src={"http://localhost:8080/uploads/" + this.props.cartproduct.productData.photoname[1]}
                                    alt="Product"/>
                        </div>
                        <div className="w-4/12 pl-6 cart-item">
                            <div className="w-full">
                                <span className={`cart-item-title ${classes.nameText}`}>{this.props.cartproduct.productData.name}</span>
                            </div>
                            <div className="w-full pt-2">
                                <span className={classes.productCodeText}>Men BK35679</span>
                            </div>
                            <div className="w-full pt-2 cart-item-remove" style={{cursor: "pointer"}}>
                                    <span><span className={classes.removeIcon}>X</span><span
                                        className={classes.removeText}> Remove</span></span>

                            </div>
                        </div>
                        <div className="w-1/12 ">
                            <span className={`cart-item-color ${classes.sizeText}`}>{this.props.cartproduct.colors.map((color)=>{ return <div>{color}</div>})}</span>
                        </div>
                        <div className="w-1/12 ">
                            <span className={`cart-item-size ${classes.sizeText}`}>{this.props.cartproduct.size.map((size)=>{ return <div>{size}</div>})}</span>
                        </div>
                        <div className="w-3/12 h-8">
                            <div className="flex flex-row">
                                <Fab size="small" aria-label="Subtract" className={classes.addRemoveIcon}>
                                    <SubtractIcon onClick={this.decreaseValue}/>
                                </Fab>

                                <div
                                    className="shadow appearance-none border rounded w-16 text-gray-700 rounded-full text-center mx-2">
                                    <span
                                        className={classes.addRemoveText} name="cart-item-quantity">{this.state.counter}</span>
                                </div>

                                <Fab size="small" aria-label="Add" className={`increase-cart-quantity ${classes.addRemoveIcon}`}>
                                    <AddIcon onClick={this.increaseValue}/>
                                </Fab> 
                            </div>
                        </div>
                        <div className="w-2/12">
                        
                        
                        {this.props.cartproduct.productData.discounted_price >0 ? this.props.cartproduct.productData.discounted_price: this.props.cartproduct.productData.price}
                        </div>
   
                    </div>
                    <div><span className={classes.titleText}>Total Price ={this.state.totalPrice *this.state.counter}</span> </div> 
            </div>
        );
    }
}
}

function mapStateToProps({ cartreducers }) {
    debugger;
    return {
      cartproduct: cartreducers,
  
    }
  }
export default withWidth()(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps)(Cart))));



