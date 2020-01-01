import React, { Component } from 'react';
import systemConfig from "../../config/system";
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Fab } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Icon from '@material-ui/core/Icon';
import styles from './styles';
import './styles.css';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import products from '../../store/reducers/products';


class ListProduct extends Component {
  state = {
    data: [],
    datafav:null,
    
    isfavourite: false,
    loginUser: null,
    productid: [],
    userlogin:[],
   favouriteProducts :[]
     

  }

  componentDidMount() {
    fetch("http://localhost:8080/api/productShow")
      .then(response => response.json())
      .then((res) => {
            console.log(res.datafav .map((user)=>{return user.user}))
        this.setState({ data: res.data , userlogin:res.datafav .map((user)=>{return user.user})})
        
      })
      .catch((error) => console.log(error))
  }

fav=[];

  favfunction = (product) => {
      
    if (this.props.login.length === 0) {
      Alert.error(" Sorry ! you are Not login Please login", { 
        position: 'bottom',
      })
    

    }
    
    else {
       this.fav.push(product)
     
      let userId=this.props.login._id
     var favouriteProducts=this.fav
     var favouriteData = { userId, favouriteProducts}
    
      debugger
      var option = {
        method: "POST",
        body: JSON.stringify(favouriteData),
        headers: {
          "Content-Type": "application/json",
        }

      }
      fetch("http://localhost:8080/api/favouriteproduct", option)
        .then((res) => { return res.json() })
        .then((res) => {
           console.log(res)
           if (res.success == true) {
             this.setState({
               productid:res.data.favouriteProductsId,
              
             })
        
           }
        })
        .catch((error) => console.log(error))
    }

  }



  render() {

    console.log(this.state.userlogin.indexOf(this.props.login._id))
    const { classes } = this.props;
    const product = this.state.data;
  
    return (
      <div>


        <div class="container">

          <div class="row">
        
            {this.state.data.map((product) => {

              return <div key={product._id} >
                <br />
                <div className="max-w-sm overflow-hidden w-11/12 justify-center relative product-card">

                  <div className="product-info-block">
                    {parseFloat(product.discounted_price) > 0 &&
                      <div className={classes.wasBlockContainer}>
                        <span className={classes.wasBlock}>SALE  -{parseInt((product.discounted_price / product.price) * 100)}%</span>

                      </div>}

                    <div className="movetoright2"> {  this.state.productid.indexOf(product._id) !=-1 ?
                    <FavoriteIcon className="favcolor" onClick={(() => this.favfunction(product._id))} /> : <FavoriteIcon onClick={(() => this.favfunction(product._id))} />}  </div>
                    <Link to={'/productdetail/' + product._id}>    <img className="w-full" src={"http://localhost:8080/uploads/" + product.photoname[0]} alt="Product" />
                    </Link>
                    <div className="productTextDiv">

                      <div>
                        <span className={`product-card-title ${classes.productTitle}`}>
                          {product.name}
                        </span>
                      </div>

                      <div>
                        <span className={classes.productPrice}>
                          <span className={classNames({
                            [classes.strikeThrough]: parseFloat(product.discounted_price)
                          })}>Rs {product.price}</span>{(product.discounted_price) && <span> | Rs {product.discounted_price} </span>}
                        </span>
                      </div>

                    </div>

                  </div>


                  {/* <Link to={'/productdetail/'+product._id}>
                        <div className={`product-card-link ${classes.addButtonContainer}`}>
                          <Fab color="primary" size="small" className={classes.addButton}>
                            <span className={classes.addButtonText}>View</span>
                          </Fab>
                        </div>
                      </Link> */}
                </div>
              </div>
            })}
              <Alert stack={{ limit: 1 }} />
          </div>


        </div>
      </div>
    );
  }
}
function mapStateToProps({ loginreducers }) {
  return {
    login: loginreducers
  }
}

export default withStyles(styles)(connect(mapStateToProps)(ListProduct));

