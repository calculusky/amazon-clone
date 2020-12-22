import Axios from 'axios';
import * as actionTypes from '../constants/constants';

export const signInAction = (email, password) => async (dispatch) => {
    dispatch({
        type: actionTypes.SIGNIN_START,
        payload: {
            email: email,
            passord: password
        }
    });
    try {
        const { data } = await Axios.post('/api/auth/signin', { email: email, passord: passord });
        dispatch({
            type: actionTypes.SIGNIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.SIGNIN_FAILURE,
            payload: error.response.data.message ? error.response.data.message : error.response.statusText
        })
    }
}