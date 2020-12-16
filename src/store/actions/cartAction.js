import * as actionTypes from '../constants/constants'
import Axios from 'axios';

export const addToCartAction = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({
            type: actionTypes.CART_ADD_ITEM,
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                product: productId,
                qty
            }
        })
        

    } catch (error) {
        dispatch({
            type: actionTypes.CART_ADD_ITEM_FAILURE,
            payload: error.response.data.message ? error.response.data.message : error.response.statusText
        })
    }
}