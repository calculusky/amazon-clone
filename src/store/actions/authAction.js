import { proxyServer } from '../../config'
import Axios from 'axios';
import * as actionTypes from '../constants/constants';

export const signInAction = (email, password) => async (dispatch) => {
    dispatch({
        type: actionTypes.SIGNIN_START,
        payload: {
            email: email,
            password: password
        }
    });
    try {
        const { data } = await Axios.post(`${proxyServer}/api/auth/signin`, { email: email, password: password });
        console.log(data, 'data')
        dispatch({
            type: actionTypes.SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        console.log(error, 'eee')
        dispatch({
            type: actionTypes.SIGNIN_FAILURE,
            payload: (error.response && error.response.data.message) ? error.response.data.message : error.message
        });
    }
}

export const signOutActon = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
        type: actionTypes.SIGNOUT
    });
}

//sign up
export const signUpAction = (name, email, password) => async (dispatch) => {
    dispatch({
        type: actionTypes.SIGNUP_START,
        payload: { name, email, password }
    });
    try {
        const { data } = await Axios.post(`${proxyServer}/api/auth/signup`, { name: name, email: email, password: password});
        dispatch({
            type: actionTypes.SIGNUP_SUCCESS,
            payload: data
        });
        dispatch({
            type: actionTypes.SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        console.log(error, '---err')
        dispatch({
            type: actionTypes.SIGNUP_FAILURE,
            payload:  (error.response && error.response.data.message) ? error.response.data.message : error.message
        });
    }
}

//get user details from the server
export const userDetailsAction = (userId) => async (dispatch, getState) => {
    const { signInReducer: { userInfo } } = getState();
    dispatch({
        type: actionTypes.USER_DETAILS_REQUEST,
        payload: userId
    });
    try {
        const { data } = await Axios.get(`${proxyServer}/api/user/details/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }) 
        dispatch({
            type: actionTypes.USER_DETAILS_SUCCESS,
            payload: data.user
        })       

    } catch (error) {
        dispatch({
            type: actionTypes.USER_DETAILS_FAIL,
            payload: (error.response && error.response.data.message) ? error.response.data.message : error.message
        })
    }
}