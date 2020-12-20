import * as actionTypes from '../constants/constants'
import Axios from 'axios';

export const addToCartAction = (productId, qty) => async (dispatch, getState) => {

    //console.log(getState().cartReducer.cartItems, '--------cart__-----')
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({
            type: actionTypes.CART_ADD_ITEM,
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                product: data._id,
                countInStock: data.countInStock,
                qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems)) //save cart items in loacal storage
        

    } catch (error) {
        console.log(error, 'err')
        dispatch({
            type: actionTypes.CART_ADD_ITEM_FAILURE,
            payload: error.response.data.message ? error.response.data.message : error.response.statusText
        })
    }
}

export const removeFromCartAction = (prodId) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.CART_REMOVE_ITEM,
        payload: prodId
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems)) //save cart items in loacal storage
}