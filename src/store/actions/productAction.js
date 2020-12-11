import * as actionTypes from '../constants/constants';
import Axios from 'axios';

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: actionTypes.PRODUCT_LIST_START
    })
    try {
        const productsRes = await Axios.get('/api/products');
        dispatch({
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: productsRes.data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAILURE,
            payload: error.message
        })
    }
}
