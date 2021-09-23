import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants.js"


export const addToCart = (id, qty) => async(dispatch, getState)=>{
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    //NOTE: Local Storage always stores data into string format.
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id) => async(dispatch, getState)=>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    //reset/update localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const cartSaveShippingAddress = (data) => async(dispatch)=>{
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    //reset/update localStorage
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const cartSavePaymentMethod = (data) => async(dispatch)=>{
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    //reset/update localStorage
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}