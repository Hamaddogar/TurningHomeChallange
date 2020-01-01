import React, {Component} from 'react';

import {
  withStyles,
  Paper,
  Radio,
  Checkbox,
  Button,
  Fab,
  TextField
} from '@material-ui/core';
import MainHeader from '../../main/mainHeader/mainHeader'
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import withWidth from "@material-ui/core/withWidth/withWidth";
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Close from '@material-ui/icons/Close';
import styles from './styles';
import {Container, Section} from '../../../components/Layout';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Banner from '../../../components/Banner';
import SubscribeBar from '../../../components/SubscribeBar';
import './styles.css';


class SearchDisplay extends Component {
    state = {
    value: { min: 50, max: 36000 },
    loading:true
  };
  searchByKey = evt => {
    const { rule } = this.props.this.props.searchproduct.d;
    const key = evt.target.value;

    console.log("evt key", evt.target.value);
    const keyvalueResult = rule.filter(item => {
      const key = evt.target.value;
      const id = item.id;
      return id.substring(0, key.length).indexOf(key) !== -1;
    });
 
  };
    render() 
    {
      console.log(this.props.searchproduct)
      const { classes } = this.props;
  
      var  result =this.props.searchproduct.data.filter((productprice) => { 
        return +(productprice.discounted_price >0?productprice.discounted_price:productprice.price)>=this.state.value.min }).map((product) => {
      
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
          console.log(result)
      })
        return (
          <div className={classes.root}>
          
           <MainHeader/>
       <center><h3>you have search "{this.props.searchproduct.whatsearch}"</h3></center> 
                <Container>
                        <Section>
                            <div className="flex mb-4 contentHolder">
                                <div className="w-1/4 filterSection">
                                    <Paper className={classes.controlContainer} elevation={1}>
                                        <div className={classes.filterBlock}>
                                            <div className={classes.titleContainer}>
                                            <span className={classes.controlsTopTitle}>
                                                Filter Items
                                            </span>
                                            </div>
                                            <div className={classes.filterItems}>
                                              <div className="py-1">
                                                <span className={classes.isGrey}>Category: </span>
                                                <span>Regional</span>
                                              </div>
                                              <div className="py-1 pb-2">
                                                <span className={classes.isGrey}>Department: </span>
                                                <span>French</span>
                                              </div>
                                            </div>
                                        </div>
                                        <div className={classes.filterBodyContainer}>
                                          <div className={classes.colorBlock}>
                                              <div className={classes.titleContainer}>
                                              <span className={classes.controlsTitle}>
                                                  Color
                                              </span>
                                              </div>
                                              <div className={classes.colorRadiosContainer}>
                                                  <Radio
                                                      style={{padding: 0, color: '#6eb2fb'}}
                                                      size="small"
                                                      icon={<FiberManualRecord/>}
                                                      value="a"
                                                      name="radio-button-demo"
                                                      aria-label="A"
                                                  />
                                                  <Radio
                                                      style={{padding: 0, color: '#00d3ca'}}
                                                      size="small"
                                                      icon={<FiberManualRecord/>}
                                                      value="b"
                                                      name="radio-button-demo"
                                                      aria-label="B"
                                                  />
                                                  <Radio
                                                      style={{padding: 0, color: '#f62f5e'}}
                                                      size="small"
                                                      icon={<FiberManualRecord/>}
                                                      value="c"
                                                      name="radio-button-demo"
                                                      aria-label="C"
                                                  />
                                                  <Radio
                                                      style={{padding: 0, color: '#fe5c07'}}
                                                      size="small"
                                                      icon={<FiberManualRecord/>}
                                                      value="d"
                                                      name="radio-button-demo"
                                                      aria-label="D"
                                                  />
                                                  <Radio
                                                      style={{padding: 0, color: '#f8e71c'}}
                                                      size="small"
                                                      icon={<FiberManualRecord/>}
                                                      value="e"
                                                      name="radio-button-demo"
                                                      aria-label="E"
                                                  />
                                                  <Radio
                                                      style={{padding: 0, color: '#7ed321'}}
                                                      size="small"
                                                      icon={<FiberManualRecord/>}
                                                      value="f"
                                                      name="radio-button-demo"
                                                      aria-label="F"
                                                  />
                                                  <Radio
                                                      style={{padding: 0, color: '#9013fe'}}
                                                      size="small"
                                                      icon={<FiberManualRecord/>}
                                                      value="g"
                                                      name="radio-button-demo"
                                                      aria-label="G"
                                                  />
                                              </div>
                                          </div>
                                          <div className={classes.sizesBlock}>
                                              <div className={classes.titleContainer}>
                                      <span className={classes.controlsTitle}>
                                          Size
                                      </span>
                                              </div>
                                              <div className={classes.sizeCheckboxes}>
                                                  <Checkbox
                                                      style={{padding: 0}}
                                                      checkedIcon={<div className={classes.sizeCheckboxChecked}>XS</div>}
                                                      icon={<div className={classes.sizeCheckboxUnchecked}>XS</div>}
                                                      value="XS"/>
                                                  <Checkbox
                                                      style={{padding: 0}}
                                                      checkedIcon={<div className={classes.sizeCheckboxChecked}>S</div>}
                                                      icon={<div className={classes.sizeCheckboxUnchecked}>S</div>}
                                                      value="checkedA"/>
                                                  <Checkbox
                                                      style={{padding: 0}}
                                                      checkedIcon={<div className={classes.sizeCheckboxChecked}>M</div>}
                                                      icon={<div className={classes.sizeCheckboxUnchecked}>M</div>}
                                                      value="M"/>
                                                  <Checkbox
                                                      style={{padding: 0}}
                                                      checkedIcon={<div className={classes.sizeCheckboxChecked}>L</div>}
                                                      icon={<div className={classes.sizeCheckboxUnchecked}>L</div>}
                                                      value="L"/>
                                                  <Checkbox
                                                      style={{padding: 0}}
                                                      checkedIcon={<div className={classes.sizeCheckboxChecked}>XL</div>}
                                                      icon={<div className={classes.sizeCheckboxUnchecked}>XL</div>}
                                                      value="XL"/>
                                              </div>
                                          </div>
                                          <div className={classes.sliderBlock}>
                                              <div className={classes.titleContainer}>
                                              <span className={classes.controlsTitle}>
                                                  Price Range
                                                  
                                              </span>
                                              </div>
                                              <br/>
                                              <div >
                                              <br/>
                                              <InputRange
              maxValue={36000}
              minValue={0}
              value={this.state.value}
              onChange={value => this.setState({ value })} 
            />
                                              </div>
                                              <div style={{
                                                  width: "100%",
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  height: "2px",
                                                  color:"#f62f5e"
                                              }}>
                                                 
                                              </div>
                                          </div>
                                          <div className={classes.searchBlock}>
                                              <div className={classes.titleContainer}>
                                                  <span className={classes.controlsTitle}>
                                                      Search keyword
                                                  </span>
                                              </div>
                                              <div className={classes.searchContainer}>
                                                  <TextField
                                                      inputProps={{
                                                          className: classes.filterSearchInput,
                                                      }}
                                                      placeholder="Enter a keyword to search..."
                                                      margin="dense"
                                                      variant="outlined"
                                                      name="search"
                                                    
                                                      inputRef={keyvalue => this.keyvalue = keyvalue}
                                                      onChange={this.searchByKey}
                                                  />
                                              </div>
                                          </div>
                                        </div>
                                        <div className={classes.footerBlock}>
                                            <Fab color="primary" size="small" className={classes.coloredButton}
                                                 style={{borderRadius: 24, height: 35, width: 90}}><span
                                                className={classes.submitButtonText}>Apply</span></Fab>

                                            <Button className={classes.clearText}>
                                                <Close className={classes.boldIcon} />
                                                <span>Reset</span>
                                            </Button>
                                        </div>
                                    </Paper>
                                </div>
                                <div className="w-3/4 flex flex-wrap ml-6 productsSection">

                                { result.length !==0 ? result:<img src="https://cdn.dribbble.com/users/898770/screenshots/3744292/search-bar.gif"/>}
  </div>
    

    </div>

                        </Section>
                        <Section>
                            <Banner/>
                        </Section>
                        <Section>
                            <SubscribeBar/>
                        </Section>
                    </Container>
            </div>
         
        );
    }
}
function mapStateToProps({ searchreducers }) {
    debugger;
    return {
      searchproduct: searchreducers,
  
    }
  }
export default withWidth()(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps)(SearchDisplay))));


