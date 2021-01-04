import * as actionTypes from '../constants/constants';

export const createOrderReducer = (state = {}, action) => {
    switch(action.type){
        case actionTypes.ORDER_CREATE_START:
            return {
                loading: true
            }

        case actionTypes.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case actionTypes.ORDER_CREATE_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
            
        case actionTypes.ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}