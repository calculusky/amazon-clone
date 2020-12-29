import React, { useState, useEffect } from 'react';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { connect } from 'react-redux';
import { paymentMethodAction } from '../../store/actions/cartAction';

const PaymentMethodScreen = (props) => {

    const { shippingInfo } = props.cart;
    const [ paymentMethod, setPaymentMethod ] = useState('Paypal')
    //console.log(props, 'props---')
    
    useEffect(() => {
        if(Object.entries(shippingInfo).length === 0){
            props.history.push('/shipping');
        }
    }, [shippingInfo, props.history])

    const submitHandler = (e) => {
        e.preventDefault();
        props.onSelectPaymentMethod(paymentMethod);
        props.history.push('/placeorder')
    }
    return ( 
        <div>
            <CheckoutSteps step1 step2 step3/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input 
                            type="radio"
                            id="paypal"
                            value="Paypal"
                            name="paymentMethod"
                            checked={paymentMethod === 'Paypal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input 
                            type="radio"
                            id="stripe"
                            value="Stripe"
                            name="paymentMethod"
                            checked={paymentMethod === 'Stripe'}
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <button className="primary block" type="submit">Continue</button>
                </div>
            </form>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectPaymentMethod: (paymentMethod) => dispatch(paymentMethodAction(paymentMethod))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodScreen);