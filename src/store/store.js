import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { signinReducer, signupReducer } from './reducers/authReducer';
import { cartReducer } from './reducers/cartReducer';
import { createOrderReducer, listUserOrdersReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducer';
import { productReducer, productDetailsReducer } from './reducers/productReducer';
import { userdetailsReducer } from './reducers/userReducer';

const reducer = combineReducers({
    productList: productReducer,
    productDetailsReducer: productDetailsReducer,
    cartReducer: cartReducer,
    signInReducer: signinReducer,
    signUpReducer: signupReducer,
    createOrderReducer: createOrderReducer,
    orderDetailsReducer: orderDetailsReducer,
    orderPayReducer: orderPayReducer,
    listUserOrdersReducer: listUserOrdersReducer,
    userDetailsReducer: userdetailsReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));


export default store;