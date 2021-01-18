import * as actionTypes from '../constants/constants';

//signin and signout
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
} 
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
        case actionTypes.SIGNOUT:
            return {
                userInfo: null
            }

        default:
            return state
    }
}

//sign up
export const signupReducer = ( state = { userInfo: null }, action) => {
    switch(action.type){
        case actionTypes.SIGNUP_START:
            return {
                loading: true  
            }
        
        case actionTypes.SIGNUP_SUCCESS: 
        return {
            loading: false,
            userInfo: action.payload
        }

        case actionTypes.SIGNUP_FAILURE:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

