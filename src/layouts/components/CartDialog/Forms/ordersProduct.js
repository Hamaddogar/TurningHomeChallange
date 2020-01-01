/**
 * Implement functionality for Cart
 */
import { Fab, withStyles, CircularProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SubtractIcon from "@material-ui/icons/Remove";
import React, { Component } from "react";
import systemConfig from "../../../../config/system";
import withWidth from "@material-ui/core/withWidth";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import styles from "./styles";
import classNames from "classnames";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import ScrollArea from "react-scrollbar";
import { ToastProvider } from "react-toast-notifications";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

 import Newheader from '../../../main/mainHeader/mainHeader'
 import Footer from '../../Footer/index'
 import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
 import StripeCheckout from 'react-stripe-checkout';
  import deletItem from './Product-Operation/delete-function'
  import Paymentscript from './PaymentScript';

class Orderproduct extends Component {
  state = {
    loading: true,
    counters: null,
    newcounter: null,
    cartData: null,
    indexitem: null,
    pricenew: null,
    totalprice: null,
    paymentMethod:'ByCash'
    
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 4000);
    
    fetch("http://localhost:8080/api/cartshow")
    .then(response => response.json())
    .then(res => {
      this.setState({
        cartData: res.data
      });
    })
    .catch(error => console.log(error));
  }
  increaseValue = (item, price, index) => {
    console.log(index);
    
    item.counter++;
    
    this.forceUpdate();
  };
  decreaseValue = item => {
    if (item.counter != 1) {
      item.counter--;
      
      this.forceUpdate();
    }
  };
  payment=(e)=>{
    e.preventDefault();
    let paymentMethod= e.target.value;
    this.setState({
      
      paymentMethod:paymentMethod
    })
    
  }
  orderSubmit=(total)=>{

    
    let  cartProduct=this.state.cartData
    .filter((item, index) => {
      return item.loginuser === this.props.loginUser._id;
    })
    if(cartProduct.length===0 )
    {
      
      alert("please Add one product in your Cart")
      
      
    }
    else{
      let  uname =this.props.order.uname;
      let Email=this.props.order.email;
      let  address =this.props.order.address;
      let   phonenumber=this.props.order.phonenumber;
      let paymentMethod=this.state.paymentMethod;
      let loginUser=this.props.loginUser._id
      let totalprice=total
      
      const orderSubmit={cartProduct,uname,Email,address,phonenumber,paymentMethod,loginUser,totalprice}
      var option = {
        method: "POST",
        body: JSON.stringify(orderSubmit),
        headers: {
            "Content-Type": "application/json",
        }
    }
      fetch("http://localhost:8080/api/orderSubmit",option)
    .then(response => response.json())
    .then(res => {
     console.log(res)
    })

      
    }
    
     // delete Funtion
    deletItem();
}

  
  
  render() {
    const { classes } = this.props;
 
   let  total = 0;

    
    
    if (this.state.loading) {
      return (
        <div>
          <div className="flex flex-wrap shadow flex justify-center py-24 bg-white">
            <CircularProgress size={40} color="primary" />
          </div>
        </div>
      );
    }
    if (this.props.loginUser.length === 0) {
      return (
        <div>
          <div className="flex flex-wrap shadow flex justify-center py-24 bg-white">
            <img
              src={
                "https://www.mahamconsultants.com/wp-content/uploads/2014/05/login1.jpg"
              }
            />
          </div>
        </div>
      );
    } else {
      return (
       
          <div>
            <Newheader/>
            
            <div className="flex flex-wrap shadow flex justify-center py-24 bg-white">
            <div id="cart">
              <div className={`flex mb-4 h-8 ${classes.headerBorderBottom}`}>
                <div className="w-3/6">
                  <span className={classes.headerTitle}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item</span>
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



              {this.state.cartData.filter((item, index) => {
                return item.loginuser === this.props.loginUser._id;
              }).length != 0 ? (
                this.state.cartData
                  .filter((item, index) => {
                    return item.loginuser === this.props.loginUser._id;
                  })
                  .map((item, index) => {
                     
                  
                    total +=
                      item.productData.discounted_price > 0
                        ? item.productData.discounted_price * item.counter
                        : item.counter * item.productData.price;
                    return (
                      <div key={index}>
                        <div className="flex mb-4">
                          <div className="w-2/12">
                            <img
                              className="w-full"
                              src={
                                "http://localhost:8080/uploads/" +
                                item.productData.photoname[0]
                              }
                              alt="Product"
                            />
                          </div>
                          <div className="w-4/12 pl-6 cart-item">
                            <div className="w-full">
                              <span
                                className={`cart-item-title ${classes.nameText}`}
                              >
                                {item.productData.name}
                                
                              </span>
                            </div>
                            <div className="w-full pt-2">
                              <span className={classes.productCodeText}></span>
                            </div>
                            <div
                              className="w-full pt-2 cart-item-remove"
                              style={{ cursor: "pointer" }}
                            >
                              <span>
                                <span
                                
                                  className={classes.removeIcon}
                                  onClick={() => {
                                    this.deletItem(index, item);
                                  }}
                                >
                                  <RestoreFromTrashIcon />
                                </span>
                                <span className={classes.removeText}> </span>
                              </span>
                            </div>
                          </div>
                          <div className="w-1/12 ">
                            <span
                              className={`cart-item-color ${classes.sizeText}`}
                            >
                              {item.colors.map(color => {
                                return <div>{color}</div>;
                              })}
                            </span>
                          </div>
                          <div className="w-1/12 ">
                            <span
                              className={`cart-item-size ${classes.sizeText}`}
                            >
                              {item.size.map(size => {
                                return <div>{size}</div>;
                              })}
                            </span>
                          </div>
                          <div className="w-3/12 h-8">
                            <div className="flex flex-row">
                              <Fab
                                size="small"
                                aria-label="Subtract"
                                className={classes.addRemoveIcon}
                              >
                                <SubtractIcon
                                  onClick={() => {
                                    this.decreaseValue(
                                      item,
                                      item.productData.discounted_price > 0
                                        ? item.productData.discounted_price
                                        : item.productData.price,
                                      index
                                    );
                                  }}
                                />
                              </Fab>

                              <div className="shadow appearance-none border rounded w-16 text-gray-700 rounded-full text-center mx-2">
                                <span
                                  className={classes.addRemoveText}
                                  name="cart-item-quantity"
                                >
                                  {this.state.indexitem === index
                                    ? item.counter++
                                    : item.counter}
                                </span>
                              </div>

                              <Fab
                                size="small"
                                aria-label="Add"
                                className={`increase-cart-quantity ${classes.addRemoveIcon}`}
                              >
                                <AddIcon
                                  onClick={() => {
                                    this.increaseValue(item);
                                  }}
                                />
                              </Fab>
                            </div>
                          </div>
                          <div className="w-2/12">
                            {item.productData.discounted_price > 0
                              ? item.productData.discounted_price * item.counter
                              : item.counter * item.productData.price}
                            {console.log(
                              item.productData.discounted_price > 0
                                ? item.productData.discounted_price *
                                    item.counter
                                : item.counter * item.productData.price

                            )}
                          </div>
                        </div>
                        
                      </div>
                    
                  );
                  })
              ) : (
                <div>
                  {" "}
                  <img
                    src={
                      "https://www.ezeebazaar.in/img/Frontend/empty-cart.png"
                    }
                  />
                </div>
              )}

            </div>  {/* <div><span className={classes.titleText}>Total Price ={this.state.totalPrice *this.state.counter}</span> </div>  */}
            
            <center>
              {" "}
              <Typography variant="h4" gutterBottom>
                Total Price :{total} Rs
              </Typography>

              <Typography variant="h4"color="Primary">
                How you Want to payment ?
              </Typography>
              <Typography variant="h5" gutterBottom><input type="radio" name="payment" value="ByCash" onChange={this.payment}/> 
               Cash
             

              <input type="radio" name="payment" value="ByCardOnline"onChange={this.payment}/>  
              Online
              </Typography>
                {this.state.paymentMethod !="ByCash"?
         
                  <Paymentscript/>
                
                :null}
                 <center><Typography variant="h4"color="Primary">
               Confirm Your Information?
              </Typography>
              <Typography variant="h6">
             
           
                Name :  {this.props.order.uname}<br/>
                Email:{this.props.order.email}<br/>
                Address :{this.props.order.address}<br/>
                Phone Number :{this.props.order.phonenumber} <br/>
                <Button  variant="contained" color="primary"onClick={(()=>{this.orderSubmit(total)})}>Order Submit</Button>
   
                </Typography>
                
                </center>  
           
            </center>

            
         
                

                    
            </div>
         
            <Footer/>
</div>
          
        
       
      );
    }
  }
}

function mapStateToProps({ cartreducers, loginreducers ,orderreducers}) {
  debugger;
  return {
    cartproduct: cartreducers,
    loginUser: loginreducers,
    order:orderreducers
  };
}
export default withWidth()(
  withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps)(Orderproduct))
  )
);

