import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productCreateReducer, productDeleteReducer, productDetailsReducer,
         productListReducer, productReviewCreateReducer, productTopRatedReducer, productUpdateReducer } from './reducer/productReducers';
import { cartReducer } from './reducer/cartReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer,
         userProfileUpdateReducer, userRegisterReducer, userUpdateReducer } from './reducer/userReducers';
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, 
         orderListReducer, orderMyListReducer, orderPayReducer } from './reducer/orderReducers';

//local storage contains data into string format. so we need to parse it into JSON format to use effectively.
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: userProfileUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer
})

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store



