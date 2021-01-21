import { proxyServer } from '../../config'
import Axios from 'axios';
import * as actionTypes from '../constants/constants';

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

export const updateUserProfileAction = (user) => async (dispatch, getState) => {
    const { userId } = user;
    const { signInReducer: { userInfo: { token } } } = getState();
    dispatch({
        type: actionTypes.UPDATE_USER_PROFILE_REQUEST,
        payload: user
    })
    try {
        const { data } = await Axios.put(`${proxyServer}/api/user/updateprofile/${userId}`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch({
            type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
            payload: data.updatedUser
        })
        dispatch({
            type: actionTypes.SIGNIN_SUCCESS,
            payload: data.updatedUser
        })
        localStorage.setItem('userInfo', JSON.stringify(data.updatedUser));

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_USER_PROFILE_FAIL,
            payload: (error.response && error.response.data.message) ? error.response.data.message : error.message
        })
    }
}