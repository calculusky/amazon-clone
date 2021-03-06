import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { proxyServer } from '../../config';
import { orderDetailsAction, orderPayAction } from '../../store/actions/orderAction';
import * as actionTypes from '../../store/constants/constants';

const OrderScreen = (props) => {
    const [ sdkReady, setSdkReady ] = useState(false);
    const orderId = props.match.params.orderId;
    const { onOrderDetails, onOrderPayReset } = props;

    //states
    const { loading, error, order } = props.orderDetails;
    const { loading: loadingPay, success: successPay, error: errorPay } = props.orderPay;


     console.log(props, '-----props--order--pay-----')
     console.log(errorPay, loadingPay, successPay, '*******TTT*****')
     useEffect(() => {
         //console.log('eeeefffeeeecccccttttttttt-------')
         //add a function to create paypal script
         const addPayPalScript = async () => {
             const { data } = await Axios.get(`${proxyServer}/api/config/paypal`); //fetch the cliend ID
             const script = document.createElement('script');
             script.type = 'text/javascript';
             script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
             script.async = true;
             script.onload = () => {
                 setSdkReady(true);
             }
             document.body.appendChild(script);
         }
         if(!order || successPay){
              onOrderPayReset();     //reset orderPay state by unsetting successpay to avoid infinite re-render loops
              return onOrderDetails(orderId);
         }
        if(order && !order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            }           
        }                 
     }, [onOrderDetails, onOrderPayReset, orderId, order, successPay])

     //add payment handler
    const successPaymentHandler = (paymentResult) => {
        props.onOrderPay(orderId, paymentResult);
        console.log(paymentResult, 'payResult')
    }
    //      4032 0331 6482 35564032 0331 6482 3556    0224   202

    //display 
    return ( 
        loading ? <LoadingBox/>
        : error ? ( <MessageBox variant='danger'>{error}</MessageBox> )
        : (     
            <div>
                <div><h1>Order {order._id}</h1></div>
                <div className="row top">
                    <div className="col-2">
                        <ul>
                            <li>
                                <div className="card card-body">
                                    <h1>Shipping</h1>
                                    <p>
                                        <strong>Name: </strong>{order.shippingInfo.fullname}
                                    </p>
                                    <p>
                                        <strong>Address:</strong> 
                                        {order.shippingInfo.address}, 
                                        {order.shippingInfo.city},
                                        {order.shippingInfo.postalCode}, 
                                        {order.shippingInfo.country}
                                    </p>
                                    { 
                                       order.isDelivered ? <MessageBox variant='success'>Delivered at {order.deliveredAt}</MessageBox>
                                       : <MessageBox variant='danger'>Not Delivered</MessageBox>
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h1>Payment</h1>
                                    <p>
                                        <strong>Method: </strong> {order.paymentMethod}
                                    </p>
                                    { 
                                       order.isPaid ? <MessageBox variant='success'>Paid at {order.paidAt}</MessageBox>
                                       : <MessageBox variant='danger'>Not Paid</MessageBox>
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="card card-body">
                                    <h1>Order Items</h1>
                                    <ul>
                                        {
                                            order.orderItems.map(item => (
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
                                        <div>${order.itemsPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Shipping Address</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div><strong>Order Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                    </div>
                                </li>
                                {
                                    ((order && !order.isPaid) && (
                                        <li>
                                            { !sdkReady ? <LoadingBox/> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/> }                                  
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
     );
}
 
const mapStateToProps = state => {
    return {
        orderDetails: state.orderDetailsReducer,
        orderPay: state.orderPayReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onOrderDetails: (orderId) => dispatch(orderDetailsAction(orderId)),
        onOrderPay: (orderId, paymentResult) => dispatch(orderPayAction(orderId, paymentResult)),
        onOrderPayReset: () => dispatch({ type: actionTypes.ORDER_PAY_RESET })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);



