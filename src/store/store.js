import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { signinReducer, signupReducer } from './reducers/authReducer';
import { cartReducer } from './reducers/cartReducer';
import { createOrderReducer } from './reducers/orderReducer';
import { productReducer, productDetailsReducer } from './reducers/productReducer';

const reducer = combineReducers({
    productList: productReducer,
    productDetailsReducer: productDetailsReducer,
    cartReducer: cartReducer,
    signInReducer: signinReducer,
    signUpReducer: signupReducer,
    createOrderReducer: createOrderReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

//console.log(store, 'store======')

export default store;