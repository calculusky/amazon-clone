import * as actionTypes from '../constants/constants';

export const userdetailsReducer = (state = { loading: true }, action) => {
    switch(action.type){
        case actionTypes.USER_DETAILS_REQUEST:
            return { loading: true }
        case actionTypes.USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case actionTypes.USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}