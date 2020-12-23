import * as actionTypes from '../constants/constants';

const initialState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : { loading: true };
export const signinReducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGNIN_START:
            return {
                loading: true  
            }
        
        case actionTypes.SIGNIN_SUCCESS: 
        return {
            loading: false,
            userInfo: action.payload
        }

        case actionTypes.SIGNIN_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}