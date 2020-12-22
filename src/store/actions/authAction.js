import Axios from 'axios';
import * as actionTypes from '../constants/constants';

export const signInAction = (email, password) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.SIGNIN_START,
        payload: {
            email: email,
            passord: password
        }
    });
    try {
        const { data } = await Axios.post('/api/auth/signin', { email: email, password: password });
        console.log(data, 'data')
        dispatch({
            type: actionTypes.SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(getState().signInReducer.userInfo))

    } catch (error) {
        console.log(error.response, 'eee')
        dispatch({
            type: actionTypes.SIGNIN_FAILURE,
            payload: error.response.data.message ? error.response.data.message : error.response.statusText
        })
    }
}