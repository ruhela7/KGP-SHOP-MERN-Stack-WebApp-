import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants.js";


export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            //here product is set as id of item. Check in cartActions.js
            const existItem = state.cartItems.find((x) => x.product === item.product)

            if (existItem) {
                //if item user adds, already exist
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }

            } else {
                //it item doesnot already exist
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        
        default: return state
    }
}

