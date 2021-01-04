import React from 'react';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const PlaceOrderScreen = (props) => {

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

     const placeOrderHandler = () => {

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
                                            <li key={item.product}>
                                                <div className="row">
                                                    <div>
                                                        <img className="small" src={item.image} alt={item.name}/>
                                                    </div>
                                                    <div>
                                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
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
                                    <button disabled={cartItems.length === 0} className="primary block" onClick={placeOrderHandler}>Place Order</button>
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
        cart: state.cartReducer
    }
}

export default connect(mapStateToProps)(PlaceOrderScreen);



