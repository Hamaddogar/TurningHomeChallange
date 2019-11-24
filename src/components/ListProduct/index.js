import React, {Component} from 'react';
import systemConfig from "../../config/system";
import {withStyles} from '@material-ui/core';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {Fab} from "@material-ui/core";
import styles from './styles';
import './styles.css';

class ListProduct extends Component {
    state = {
        data: []
      }
    
      componentDidMount() {
        fetch("http://localhost:8080/api/productShow")
          .then(response => response.json())
          .then((res) => {
            console.log(res);
            this.setState({ data: res.data })
          })
          .catch((error) => console.log(error))
      }

    render() {
      
    const { classes } = this.props;
    const product = this.state.data;
        return (
            <div>

            <div class="container">
              
            <div class="row">
          
                {this.state.data.map((product) => {
                  
                  return <div key={product._id} >
                  <br/>
                    <div className="max-w-sm overflow-hidden w-11/12 justify-center relative product-card">
    
                      <div className="product-info-block">
                        {parseFloat(product.discounted_price) > 0 &&
                          <div className={classes.wasBlockContainer}>
                            <span className={classes.wasBlock}>SALE  -{parseInt((product.discounted_price/product.price)* 100)}%</span>
                            
                          </div>}
    
                        <img className="w-full" src={"http://localhost:8080/uploads/" + product.photoname[0]} alt="Product" />
    
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
                      
    
                      <Link to={'/productdetail/'+product._id}>
                        <div className={`product-card-link ${classes.addButtonContainer}`}>
                          <Fab color="primary" size="small" className={classes.addButton}>
                            <span className={classes.addButtonText}>View</span>
                          </Fab>
                        </div>
                      </Link>
                    </div>
                    </div>
                })}
              </div>
                
           
                </div>
          </div>
        );
    }
}


export default withStyles(styles)(ListProduct);
