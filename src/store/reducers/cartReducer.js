import * as actionTypes from '../constants/constants';

//console.log(localStorage.getItem('cartItems'), '_______cart')

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    paymentMethod: 'Paypal'
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.productId === item.productId)
            if(existItem){
                return {
                    ...state,
                    cartItems: [...state.cartItems ].map(x => x.productId === item.productId ? item : x)
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
                cartItems: [...state.cartItems].filter(item => item.productId !== productId)
            }
        case actionTypes.CART_SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }
        case actionTypes.CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case actionTypes.CART_EMPTY:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}
