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

//pay order
export const orderPayAction = (orderId, paymentResult) => async (dispatch, getState) => {
    const { userInfo } = getState().signInReducer;
    dispatch({
        type: actionTypes.ORDER_DETAILS_REQUEST,
        payload: { orderId, paymentResult }
    });
    try {
        const { data } = await Axios.put(`${proxyServer}/api/orders/${orderId}/pay`, paymentResult, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: actionTypes.ORDER_PAY_SUCCESS,
            payload: data.order
        });

    } catch (error) {
        dispatch({
            type: actionTypes.ORDER_PAY_FAIL,
            payload: (error.response && error.response.data.message) ? error.response.data.message : error.message
        })
    }
}

//list user orders
export const listUserOrdersAction = () => async (dispatch, getState) => {
    const { userInfo } = getState().signInReducer;
    dispatch({ type: actionTypes.LIST_USER_ORDERS_REQUEST });
    try {
        const { data } = await Axios.get(`${proxyServer}/api/userorders`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: actionTypes.LIST_USER_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: actionTypes.LIST_USER_ORDERS_FAIL,
            payload: (error.response && error.response.data.message) ? error.response.data.message : error.message
        })
    }
}