/**
  This component display single product using the product ID
  To complete this component, you need to implement the following:
  - Dynamically render product attributes, size and color
  - Show all reviews on the product
  - Hide review submission form if user is not logged in
  - Hide review submission form if a user is logged in but haven't previously ordered for the product
  - Review submission form should be visible if a logged in user has once ordered for the item
  - Hide login message if user is logged in
  - If a user click the `Add to Cart` button, the user should see an animation of how the product fly into the
    cart bag with an auto close success message, and the quantity of the item in the cart bag in the NavBar should increase
  - Dynamically render product reviews from the backend
  - Add functionality to post review
  - Add functionality to select product size, color and item quantity
  - Take initiatives to customize this component and add live to the page

  NB: YOU CAN STYLE AND CUSTOMISE THIS PAGE, BUT YOU HAVE TO USE OUR DEFAULT CLASSNAME, IDS AND HTML INPUT NAMES
*/
import React, { Component } from 'react'
import {
  withStyles,
  Radio,
  Checkbox,
  Fab, CircularProgress, Hidden, Link
} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import StarRatings from 'react-star-ratings';
import classNames from "classnames";
import MainHeader from '../../layouts/main/mainHeader/mainHeader'
import Footer from '../../layouts/components/Footer'
import systemConfig from '../../config/system';
import * as productActions from '../../store/actions/product';
import store from '../../store/index';
import { productaction } from '../../store/actions/productDetail/productaction';
import { productid } from '../../store/actions/productDetail/productid';

import { cartaction } from '../../store/actions/productDetail/cartaction';
import * as alertActions from '../../store/actions/alerts';
import styles from './styles';
import Button from '@material-ui/core/Button';
import { Container, Section } from '../../components/Layout';
import Review from '../../components/Review';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ReviewForm from './ReviewForm';
import AuthDialog from "../../layouts/components/AuthDialog";
import CartDialog from '../../layouts/components/CartDialog';
import Toast from "../../layouts/../components/Alerts/Toast";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './styles.css';
import mainHeader from '../../layouts/main/mainHeader/mainHeader';


class Product extends Component {
  state = {
    data: [],
    colors: [],
    size: [],
    counter: 1,
    loading: true,
    userreview: [],
    getitem: [],
    allitem: [],
    cartdataArray: []
  }
  componentDidMount() {
    const id = this.props.match.params.productId
    store.dispatch(productid({ id }));
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000)
    fetch("http://localhost:8080/api/productdetail/" + id)
      .then((res) => { return res.json() })
      .then((res) => {

        this.setState({
          data: res
        }
        )
        store.dispatch(productaction(res));
      })
      .catch((error) => console.log(error))


  }


  blueColor = (event) => {
    let blueColor = event.target.value
    this.state.colors.push(blueColor)
  }
  cyan = (event) => {
    let cyan = event.target.value
    this.state.colors.push(cyan)


  }
  red = (event) => {
    let red = event.target.value
    this.state.colors.push(red)
  }
  orange = (event) => {
    let orange = event.target.value;
    this.state.colors.push(orange)
  }
  yellow = (event) => {
    let yellow = event.target.value;
    this.state.colors.push(yellow)
  }
  green = (event) => {
    let green = event.target.value
    this.state.colors.push(green)
  }
  purple = (event) => {

    let purple = event.target.value
    this.state.colors.push(purple)
  }
  sizeXS = (event) => {
    let xS = event.target.value
    this.state.size.push(xS)

  }

  sizeS = (event) => {
    let s = event.target.value
    this.state.size.push(s)

  }
  sizeM = (event) => {
    let m = event.target.value
    this.state.size.push(m)

  }
  sizeL = (event) => {
    let l = event.target.value
    this.state.size.push(l)

  }
  sizeXL = (event) => {
    let xL = event.target.value
    this.state.size.push(xL)

  }
  increaseValue = (event) => {


    this.setState({
      counter: this.state.counter + 1
    });
  }
  decreaseValue = (event) => {


    this.setState({
      counter: this.state.counter - 1
    });
  }
  cart_item = [];

  addCart = (e) => {

    e.preventDefault();
    const cartData = {
      colors: this.state.colors,
      size: this.state.size,
      productData: this.state.data.data,
      counter: this.state.counter,
      loginuser: this.props.login._id
    }

    console.log(cartData)
    var option = {
      method: "POST",
      body: JSON.stringify(cartData),
      headers: {
        "Content-Type": "application/json",
      }

    }

    fetch("http://localhost:8080/ac/addcart", option)
      .then((res) => { return res.json() })
      .then((res) => {
        console.log(res)

        this.cart_item.push(res)

      })
      .catch((error) => console.log(error))
  }







  render() {
    const { classes, match: { params } } = this.props;

    console.log(this.cart_item)



    return (

      <div>

<MainHeader/>

        {this.state.loading === true ?
      
          <Section>
            <div className="flex flex-wrap shadow flex justify-center py-24 bg-white">
              <CircularProgress size={50} color="primary" />
            </div>
          </Section> :



          <div className={classes.root}>
            <Container className="product-details">
            

              <div>
                <Section>
                  <div className="flex flex-wrap shadow bg-white">
                    <div
                      className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center align-middle pt-10">
                      {this.props.detail.data.photoname !== undefined ? <ImageGallery {... (
                        {
                          thumbnailPosition: "left",
                          useBrowserFullscreen: true,
                          showPlayButton: true,
                          showIndex: true,
                          height: "500px",
                          items: [
                            {
                              original: this.props.detail.data.photoname[1] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[0]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                              thumbnail: this.props.detail.data.photoname[1] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[0]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                            }, {

                              original: this.props.detail.data.photoname[0] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[1]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                              thumbnail: this.props.detail.data.photoname[0] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[1]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                            }, {

                              original: this.props.detail.data.photoname[2] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[2]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                              thumbnail: this.props.detail.data.photoname[2] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[2]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                            }, {

                              original: this.props.detail.data.photoname[3] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[3]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                              thumbnail: this.props.detail.data.photoname[3] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[3]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                            }, {

                              original: this.props.detail.data.photoname[4] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[4]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                              thumbnail: this.props.detail.data.photoname[4] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[4]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                            },
                            {

                              original: this.props.detail.data.photoname[5] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[5]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                              thumbnail: this.props.detail.data.photoname[5] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[5]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                            },
                            {

                              original: this.props.detail.data.photoname[6] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[6]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                              thumbnail: this.props.detail.data.photoname[6] !== undefined ? `${"http://localhost:8080/uploads/" + this.props.detail.data.photoname[6]}` : "https://www.isolezwe.co.za/assets/images/general/no-image.png",
                            },
                          ]
                        })} /> : null}

                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-10">
                      <div className={`w-full h-8 ${classes.breadcrumbsText}`}>
                        Home <span className="ml-4" /> • <span
                          className="ml-4" />  <span
                          className="ml-4" /> • <span className="ml-4" />
                      </div>
                      <div className="w-full h-8 mt-2">
                        <StarRatings
                          rating={3}
                          starRatedColor="#ffc94f"
                          starEmptyColor="#eeeeee"
                          starHoverColor="#ffc94f"
                          starDimension="20px"
                          starSpacing="1px"
                          numberOfStars={5}
                          name='rating'
                        />
                      </div>
                      <div className="w-full h-8">
                        <span className={`product-details-title ${classes.productTitleText}`}>
                          {this.props.detail.data.name}
                        </span>
                      </div>
                      <div className="w-full mt-4">
                        <span className={classes.productPrice}>
                          <span className={classNames({
                            [classes.strikeThrough]: parseFloat(this.props.detail.data.discounted_price)
                          })}>£ {this.props.detail.data.price}</span>{this.props.detail.data.discounted_price &&
                            <span> | £ {this.props.detail.data.discounted_price} | -{parseInt((this.props.detail.data.discounted_price / this.props.detail.data.price) * 100)}%</span>}
                        </span>
                      </div>
                      <div className="w-full my-8">
                        <div className="w-full mb-2">
                          <span className={classes.lightTitle}> Colour </span>
                        </div>
                        <div>
                          <Radio
                            style={{ padding: 2, color: '#6eb2fb' }}
                            size="small"
                            icon={<FiberManualRecord />}
                            value="blue"
                            onClick={this.blueColor}
                            name="radio-button-demo"
                            aria-label="blue"
                            className="product-details-color"
                          />
                          <Radio
                            style={{ padding: 2, color: '#00d3ca' }}
                            size="small"
                            icon={<FiberManualRecord />}
                            value="cyan"
                            name="radio-button-demo"
                            onClick={this.cyan}
                            aria-label="cyan"
                            className="product-details-color"
                          />
                          <Radio
                            style={{ padding: 2, color: '#f62f5e' }}
                            size="small"
                            onClick={this.red}
                            icon={<FiberManualRecord />}
                            value="red"
                            name="radio-button-demo"
                            aria-label="red"
                            className="product-details-color"
                          />
                          <Radio
                            style={{ padding: 2, color: '#fe5c07' }}
                            size="small"
                            icon={<FiberManualRecord />}
                            onClick={this.orange}
                            value="orange"
                            name="radio-button-demo"
                            aria-label="orange"
                            className="product-details-color"
                          />
                          <Radio
                            style={{ padding: 2, color: '#f8e71c' }}
                            size="small"
                            icon={<FiberManualRecord />}
                            value="yellow"
                            onClick={this.yellow}
                            name="radio-button-demo"
                            aria-label="yellow"
                            className="product-details-color"
                          />
                          <Radio
                            style={{ padding: 2, color: '#7ed321' }}
                            size="small"
                            icon={<FiberManualRecord />}
                            onClick={this.green}
                            value="green"
                            name="radio-button-demo"
                            aria-label="green"
                            className="product-details-color"
                          />
                          <Radio
                            style={{ padding: 2, color: '#9013fe' }}
                            size="small"
                            icon={<FiberManualRecord />}
                            onClick={this.purple}
                            value="purple"
                            name="radio-button-demo"
                            aria-label="purple"
                            className="product-details-color"
                          />
                        </div>
                      </div>
                      <div className="w-full my-8">
                        <div className="w-full mb-2">
                          <span className={classes.lightTitle}> Size </span>
                        </div>
                        <div>
                          <Checkbox
                            style={{ padding: 0 }}
                            checkedIcon={<div className={classes.sizeCheckboxChecked}>XS</div>}
                            icon={<div className={classes.sizeCheckboxUnchecked}>XS</div>}
                            className="product-details-size"
                            onClick={this.sizeXS}
                            value="XS" />
                          <Checkbox
                            style={{ padding: 0 }}
                            checkedIcon={<div className={classes.sizeCheckboxChecked}>S</div>}
                            icon={<div className={classes.sizeCheckboxUnchecked}>S</div>}
                            onClick={this.sizeS}
                            className="product-details-size"
                            value="S" />
                          <Checkbox
                            style={{ padding: 0 }}
                            onClick={this.sizeM}

                            checkedIcon={<div className={classes.sizeCheckboxChecked}>M</div>}
                            icon={<div className={classes.sizeCheckboxUnchecked}>M</div>}
                            className="product-details-size"
                            value="M" />
                          <Checkbox
                            onClick={this.sizeL}

                            style={{ padding: 0 }}
                            checkedIcon={<div className={classes.sizeCheckboxChecked}>L</div>}
                            icon={<div className={classes.sizeCheckboxUnchecked}>L</div>}
                            className="product-details-size"
                            value="L" />
                          <Checkbox
                            onClick={this.sizeXL}

                            style={{ padding: 0 }}
                            checkedIcon={<div className={classes.sizeCheckboxChecked}>XL</div>}
                            icon={<div className={classes.sizeCheckboxUnchecked}>XL</div>}
                            className="product-details-size"
                            value="XL" />
                        </div>
                      </div>
                      <div className="w-full my-8 flex flex-row">
                        <Fab size="small" aria-label="Subtract" className={classes.addRemoveIcon}
                        >
                          <SubtractIcon onClick={this.decreaseValue} />
                        </Fab>

                        <div
                          className="shadow appearance-none border rounded w-16 text-gray-700 rounded-full text-center mx-2">
                          <span className={classes.addRemoveText} name="product-details-quantity">{this.state.counter}</span>
                        </div>

                        <Fab size="small" aria-label="Add" className={`increase-quantity ${classes.addRemoveIcon}`}
                        >
                          <AddIcon onClick={this.increaseValue} />
                        </Fab>
                      </div>
                      <div className="w-full my-8 flex flex-row">
                        <div className="relative">
                          <Fab color="primary" size="large" id="btnCart" onClick={this.addCart}
                            style={{ borderRadius: 60, height: 60, width: 220 }}>
                            <span className={classes.submitButtonText}>Add to Cart</span></Fab>
                        </div>
                      </div>
                    </div>
                  </div>
                </Section>

                <div>

                  <Section>
                    <Alert stack={{ limit: 1, spacing: 100 }} />
                    <div className="flex flex-wrap px-32">
                      <div className="w-full flex">
                        <span className={classes.reviewTitleText}>
                          Product Reviews
                                            </span>
                      </div>



                      <Review rating={5} name="Peter Test" review="Test Review 1" />
                    </div>
                  </Section>

                  <ReviewForm productId={params.id} />
                </div>
                <div className="w-full flex justify-center align-middle py-8" >
                  <Link onClick={() => { this.props.showAuth(false) }} color={'primary'} style={{ cursor: "pointer", color: 'red' }}>Log In</Link> <span className="ml-2">to Add a Review.</span>
                </div>

              </div>
            </Container>
        
          </div>
  }
        <Footer />
          <CartDialog />
          <AuthDialog />
          <Toast />
                          
                         
        </div >
    )

  }
}






function mapStateToProps({ productreducers, userreviewreducers, productidreducers, cartreducers, loginreducers }) {
  debugger;
  debugger;
  return {
    detail: productreducers,
    userReview: userreviewreducers,
    productid: productidreducers,
    cartproduct: cartreducers,
    login: loginreducers

  }
}

export default withWidth()(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps)(Product))));
