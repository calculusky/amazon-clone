import * as actionTypes from '../constants/constants';

const initialState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : { email: '', password: ''};
export const signinReducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGNIN_START:
            return {
                userInfo: initialState
            }
        
        case actionTypes.SIGNIN_SUCCESS: 
        return {
            userInfo: action.payload
        }

        case actionTypes.SIGNIN_FAILURE:
            return {
                error: action.payload
            }

        default:
            return state
    }
}