import * as actionTypes from '../constants/constants';

//console.log(localStorage.getItem('cartItems'), '_______cart')

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product)
            if(existItem){
                return {
                    ...state,
                    cartItems: [...state.cartItems ].map(x => x.product === item.product ? item : x)
                } 
            }else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case actionTypes.CART_REMOVE_ITEM:
            const productId = action.payload;
            return {
                ...state,
                cartItems: [...state.cartItems].filter(item => item.product !== productId)
            }
        case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingInfo: action.payload
            }
        default:
            return state;
    }
}
