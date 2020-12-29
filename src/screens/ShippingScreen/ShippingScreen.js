import React, { useState, useEffect } from 'react';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { connect } from 'react-redux';
import { saveShippingInfoAction } from '../../store/actions/cartAction';

const ShippingScreen = (props) => {
    const { userInfo } = props.user;
    const { cartItems, shippingInfo } = props.cart;

    const [ fullname, setFullname ] = useState(shippingInfo.fullname);
    const [ address, setAddress ] = useState(shippingInfo.address);
    const [ postalCode, setPostalCode ] = useState(shippingInfo.postalCode);
    const [ city, setCity ] = useState(shippingInfo.city);
    const [ country, setCountry ] = useState(shippingInfo.country);
    
    console.log(props, 'props')
   

    useEffect(() => {
        if(!userInfo){
            props.history.push('/signin')
        }
        if(cartItems.length === 0){
            props.history.push('/cart')
        }
    }, [userInfo, cartItems, props.history])

    const submitHandler = (e) => {
        e.preventDefault();
        props.onSaveShippingInfo({ fullname, address, postalCode, city, country });
        props.history.push('/payment');
    }

    return ( 
        <div>
            <CheckoutSteps step1 step2/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                
                <div>
                    <label htmlFor="fullname">Fullname</label>
                    <input 
                       type="text" 
                       id="fullname" 
                       placeholder="Enter fullname"
                       value={fullname}
                       onChange={(e) => setFullname(e.target.value)}> 
                    </input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input 
                       type="text" 
                       id="address" 
                       placeholder="Enter address"
                       value={address}
                       onChange={(e) => setAddress(e.target.value)}> 
                    </input>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input 
                       type="text" 
                       placeholder="Enter postal code" 
                       id="postalCode"
                       value={postalCode}
                       onChange={(e) => setPostalCode(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input 
                       type="text" 
                       placeholder="Enter city" 
                       id="city"
                       value={city}
                       onChange={(e) => setCity(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input 
                       type="text" 
                       placeholder="Enter country" 
                       id="country"
                       value={country}
                       onChange={(e) => setCountry(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label/>
                    <button className="primary block" type="submit">Continue</button>
                </div>
            </form>
        </div>
     );
}

const mapStateToProps = (state) => {
    return {
        user: state.signInReducer,
        cart: state.cartReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSaveShippingInfo: shippingInfo => dispatch(saveShippingInfoAction(shippingInfo))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ShippingScreen);