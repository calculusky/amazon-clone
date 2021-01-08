import { proxyServer } from '../../config'
import * as actionTypes from '../constants/constants'
import Axios from 'axios';

export const createOrderAction = (order) => async (dispatch, getState) => {
    const { userInfo } = getState().signInReducer;
    dispatch({
        type: actionTypes.ORDER_CREATE_START,
        payload: order
    });
    try {
        const { data } = await Axios.post(`${proxyServer}/api/order`, order, {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({
            type: actionTypes.ORDER_CREATE_SUCCESS,
            payload: data.order
        });
        dispatch({
            type: actionTypes.CART_EMPTY
        })
        localStorage.removeItem('cartItems');

    } catch (error) {
        //console.log(error, 'err')
        dispatch({
            type: actionTypes.ORDER_CREATE_FAILURE,
            payload: (error.response && error.response.data.message) ? error.response.data.message : error.message
        })
    }
}

export const orderDetailsAction = (orderId) => async (dispatch, getState) => {
    const { userInfo } = getState().signInReducer
    dispatch({
        type: actionTypes.ORDER_DETAILS_REQUEST,
        payload: orderId
    })
    try {
        const { data: { order } } = await Axios.get(`${proxyServer}/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        //console.log(order, '---order----')
        dispatch({
            type: actionTypes.ORDER_DETAILS_SUCCESS,
            payload: order
        })

    } catch (error) {
        dispatch({
            type: actionTypes.ORDER_DETAILS_FAIL,
            payload: (error.response && error.response.data.message) ? error.response.data.message : error.message
        })
    }
}