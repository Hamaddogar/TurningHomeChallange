import {combineReducers} from 'redux';
import alerts from './alerts';
import products from './products';
import product from './product';
import loginreducers from '../reducers/login/loginreducers';
import productreducers from './productDetail/productreducers';
import productidreducers from './productDetail/productid';
import cartreducers from './productDetail/cartreducers'
import searchreducers from './search/searchreducers';
import allproducts from './allproducts/allproducts';
import reviewsreducers from './reviews/reviewsreducers';
import userreviewreducers from './reviews/userreviewreducers';
import orderreducers from './order/order'





debugger;




const createReducer = (asyncReducers) =>
    combineReducers({
        alerts,
        products,
        product,
        loginreducers ,
        productreducers ,
        cartreducers,
        searchreducers ,
        allproducts ,
        productidreducers,
        reviewsreducers,
        userreviewreducers,
        orderreducers ,
        ...asyncReducers
    });

export default createReducer;
