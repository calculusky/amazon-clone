import * as actionTypes from '../constants/constants';

const initialState = {
    email: '',
    password: ''
}
export const signinReducer = ( state = initialState ) => {
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