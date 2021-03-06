import * as actionTypes from '../constants/constants';
import Axios from 'axios';
import { proxyServer } from '../../config';

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: actionTypes.PRODUCT_LIST_START
    })
    try {
        const productsRes = await Axios.get(`${proxyServer}/api/products`);
        dispatch({
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: productsRes.data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAILURE,
            payload: (error.response && error.response.data.message) ? error.response.data.message : error.message
        })
    }
}

export const productDetailsAction = (prodId) => async(dispatch) => {
    dispatch({
        type: actionTypes.GET_PRODUCT_START,
        payload: prodId
    })
    try {
        const productRes = await Axios.get(`${proxyServer}/api/products/${prodId}`);
       // console.log(productRes.data, 'res-data')
        dispatch({
            type: actionTypes.GET_PRODUCT_SUCCESS,
            payload: productRes.data
        })

    } catch (error) {
        //console.log(error.message, 'err')
        // console.log(error.response, 'err2222')
        dispatch({
            type: actionTypes.GET_PRODUCT_FAILURE,
            payload: (error.response && error.response.data.message) ? error.response.data.message : error.message
        })
    }
}