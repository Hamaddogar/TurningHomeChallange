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

class Cart extends Component {
  state = {
    loading: true,
    counters: null,
    newcounter: null,
    // totalPrice : (this.props.cartproduct.productData.discounted_price >0 ? this.props.cartproduct.productData.discounted_price: this.props.cartproduct.productData.price),
    // cartitem:[this.props.cartproduct],
    cartData: null,
    indexitem: null,
    pricenew: null,
    totalprice: null
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
    // console.log(counter);
    item.counter++;

    this.forceUpdate();

    // this.setState({

    //     indexitem: index,
    //     counter: counter + 1
    // });
  };
  decreaseValue = item => {
    if (item.counter != 1) {
      item.counter--;

      this.forceUpdate();
    }
  };

  deletItem = (index, item) => {
    debugger;
    const itemid = item._id;

    var option = {
      method: "POST",
      body: JSON.stringify({ itemid }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://localhost:8080/api/deleteCartitem", option)
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(response);
        if (response.success === true) {
            fetch("http://localhost:8080/api/cartshow")
            .then(response => response.json())
            .then(res => {
              this.setState({
                cartData: res.data
              });
            })
        }
      });
  };
  render() {
    const { classes } = this.props;

    let total = 0;
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
        <ScrollArea
          speed={0.8}
          className="area"
          contentClassName="content"
          horizontal={false}
        >
          <div>
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
                                  X Remove
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

              {/* <div><span className={classes.titleText}>Total Price ={this.state.totalPrice *this.state.counter}</span> </div>  */}
            </div>
            <center>
              {" "}
              <Typography variant="h4" gutterBottom>
                Total Price :{total} Rs
              </Typography>
            </center>
          </div>
        </ScrollArea>
      );
    }
  }
}

function mapStateToProps({ cartreducers, loginreducers }) {
  debugger;
  return {
    cartproduct: cartreducers,
    loginUser: loginreducers
  };
}
export default withWidth()(
  withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps)(Cart))
  )
);
