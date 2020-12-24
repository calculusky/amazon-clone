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
        const { data } = await Axios.post('/api/auth/signin', { email: email, password: password });
        console.log(data, 'data')
        dispatch({
            type: actionTypes.SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        //console.log(error.response, 'eee')
        dispatch({
            type: actionTypes.SIGNIN_FAILURE,
            payload: error.response.data.message ? error.response.data.message : error.response.statusText
        })
    }
}