import {combineReducers} from 'redux';
import alerts from './alerts';
import products from './products';
import product from './product';
import loginreducers from '../reducers/login/loginreducers';
import productreducers from './productDetail/productreducers';
import cartreducers from './productDetail/cartreducers'
import searchreducers from './search/searchreducers';
import allproducts from './allproducts/allproducts';




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
        ...asyncReducers
    });

export default createReducer;
