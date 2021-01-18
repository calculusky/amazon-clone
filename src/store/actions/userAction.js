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