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

export const updateUserProfileReducer = (state = {}, action) => {
    switch(action.type){
        case actionTypes.UPDATE_USER_PROFILE_REQUEST:
            return { loading: true }
        case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case actionTypes.UPDATE_USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}