
const { createStore, combineReducers } = require('redux');



const prodReducer = (state = { name: 'shirt', price: 59 }, action) => {
    if(action.type === 'UPDATE_PRODUCT'){
        return action.payload
    }
    return state;
}


const personReducer = (state = { name: 'edu', worth: '$500b' }, action) => {
    return state;
}
const reducer = combineReducers({
    product: prodReducer,
    person: personReducer
})
const store = createStore(reducer)




store.dispatch({
    type: 'UPDATE_PRODUCT',
    payload: {
        name: 'calculus',
        age: 26,
        origin: 'Lag'
    }
})

const prod = store.getState().product;

console.log(store)




