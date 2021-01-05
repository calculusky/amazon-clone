import React, { useEffect } from 'react';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrderAction } from '../../store/actions/orderAction';
import { ORDER_CREATE_RESET } from '../../store/constants/constants';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

const PlaceOrderScreen = (props) => {
    //get create order state from redux store
    const { loading, order, success, error } = props.createOrder;

    //modify the cart state for sending order
    const toPrice = (num) => parseFloat(num.toFixed(2));
    props.cart.itemsPrice = toPrice(props.cart.cartItems.reduce((acc, val) => acc + (val.qty * val.price), 0));
    props.cart.shippingPrice = props.cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    props.cart.taxPrice = toPrice(0.08 * props.cart.itemsPrice);
    props.cart.totalPrice = toPrice(props.cart.itemsPrice + props.cart.shippingPrice + props.cart.taxPrice); 
    const { 
        cartItems, 
        shippingInfo, 
        paymentMethod, 
        itemsPrice, 
        shippingPrice, 
        taxPrice,
        totalPrice
     } = props.cart;

     //reset createOrder state
     const { onResetOrder, history } = props;
     useEffect(() => {
         if(success){
             onResetOrder();
             history.push(`/order/${order._id}`)
         }
     }, [onResetOrder, history, success, order])

     //place order handler fxn
     const placeOrderHandler = () => {
         props.onCreateOrder({ ...props.cart, orderItems: props.cart.cartItems })
     }
    

    console.log(props, 'props')
    return ( 
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h1>Shipping</h1>
                                <p>
                                    <strong>Name: </strong>{shippingInfo.fullname}
                                </p>
                                <p>
                                    <strong>Address: </strong>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h1>Payment</h1>
                                <p>
                                    <strong>Method: </strong> {paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h1>Order Items</h1>
                                <ul>
                                    {
                                        cartItems.map(item => (
                                            <li key={item.productId}>
                                                <div className="row">
                                                    <div>
                                                        <img className="small" src={item.image} alt={item.name}/>
                                                    </div>
                                                    <div>
                                                        <Link to={`/products/${item.productId}`}>{item.name}</Link>
                                                    </div>
                                                    <div>
                                                        <p>{item.qty} x ${item.price} = ${item.qty * item.price}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <h1>Order Summary</h1>
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping Address</div>
                                <div>${shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                <div>${taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                <div><strong>${totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <button 
                                       disabled={cartItems.length === 0} 
                                       className={`primary block ${(loading || cartItems.length === 0) && 'no-drop'}`} 
                                       onClick={placeOrderHandler}>
                                       { loading ? <LoadingBox value={'Place Order'}/> : 'Place Order' }
                                    </button>
                                    { error && <MessageBox variant='danger'>{error}</MessageBox> }
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
const mapStateToProps = state => {
    return {
        cart: state.cartReducer,
        createOrder: state.createOrderReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onCreateOrder: (order) => dispatch(createOrderAction(order)),
        onResetOrder: () => dispatch({ type: ORDER_CREATE_RESET})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderScreen);



