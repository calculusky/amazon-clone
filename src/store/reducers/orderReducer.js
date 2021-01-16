import * as actionTypes from '../constants/constants';

//create new order
export const createOrderReducer = (state = {}, action) => {
    switch(action.type){
        case actionTypes.ORDER_CREATE_START:
            return {
                loading: true
            }

        case actionTypes.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
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

//order details
export const orderDetailsReducer = (state = { loading: true }, action) => {
    switch(action.type){
        case actionTypes.ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case actionTypes.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//pay order
export const orderPayReducer = (state = {loading: true }, action) => {
    switch(action.type){
        case actionTypes.ORDER_PAY_REQUEST:
            return { loading: true }
        case actionTypes.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case actionTypes.ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

//list user orders
export const listUserOrdersReducer = (state = { userOrders: [], loading: true }, action) => {
    switch (action.type) {
        case actionTypes.LIST_USER_ORDERS_REQUEST:
            return { loading: true }
        case actionTypes.LIST_USER_ORDERS_SUCCESS:
            return {
                loading: false,
                userOrders: action.payload
            }
        case actionTypes.LIST_USER_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}