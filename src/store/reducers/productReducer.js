
import * as actionTypes from '../constants/constants';

const initialState = {
    loading: true,
    products: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_LIST_START:
            return {
                loading: true,
                products: []
            }

        case actionTypes.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }

        case actionTypes.PRODUCT_LIST_FAILURE:
            return {
                loading: false,
                error: action.payload
            }           
    
        default:
            return state
    }
}

export default productReducer;