import React from 'react';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const PlaceOrderScreen = (props) => {

    const { cartItems, shippingInfo, paymentMethod } = props.cart;
    console.log(props, 'props')
    return ( 
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <div className="row">
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



