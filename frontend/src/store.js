import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productReviewSaveReducer } from './reducer/productReducer';
import {cartReducer} from './reducer/cartReducers'
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducer/userReducers';
import { orderCreateReducer, orderPayReducer, orderDetailsReducer, myOrderListReducer, orderListReducer, orderDeleteReducer } from './reducer/orderReducers';


const cartItems=Cookie.getJSON("cartItems") || [];
const userInfo=Cookie.getJSON("userInfo") || null;

const initialState={cart:{cartItems,shipping:{},payment:{}},userSignin: {userInfo}};
 
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    productSave:productSaveReducer,
    productDelete: productDeleteReducer,  
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    myOrderList:myOrderListReducer,
    orderList:orderListReducer,
    orderDelete:orderDeleteReducer,
    userUpdate:userUpdateReducer,
    productReviewSave: productReviewSaveReducer
})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer,initialState,applyMiddleware(thunk));
export default  store;

 