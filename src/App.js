import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import CartScreen from './screens/CartScreen/CartScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import SigninScreen from './screens/SigninScreen/SigninScreen';
import { signOutActon } from './store/actions/authAction';
import SignupScreen from './screens/SignupScreen/SignupScreen';
import ShippingScreen from './screens/ShippingScreen/ShippingScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen/OrderScreen';
import UserOrders from './screens/UserOrders/UserOrders';
import EditProfileScreen from './screens/EditProfileScreen/EditProfileScreen';

function App() {
  const cartItems = useSelector(state => state.cartReducer.cartItems);
  const cartBadge = cartItems.length > 0 ? <span className="badge small-text">{cartItems.length}</span> : null;
  const dispatch = useDispatch();
  const user = useSelector(state => state.signInReducer)
  const { userInfo }  = user;
  //console.log(userInfo, 'user login info')

  const signOutHandler = () => {
    dispatch(signOutActon())
  }

  return (
    <BrowserRouter>
       <div className="grid-container">
            <header className="row">
                <div>
                    <Link className="brand" to="/">amazona</Link>
                </div>
                <div>
                    <Link to="/cart"><i className="fa fa-shopping-cart large-text"></i>{cartBadge}</Link>
                    { 
                       userInfo ? ( 
                         <div className="dropdown">
                            <Link to="#">{ userInfo.name } <i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                            <li>
                                   <Link to="/editprofile">Edit Profile</Link>
                               </li>
                               <li>
                                   <Link to="/myorders">Order History</Link>
                               </li>
                               <li>
                                  <Link to="#" onClick={signOutHandler}><i className="fa fa-sign-out"></i> sign out</Link>
                               </li>
                            </ul>
                         </div>
                        )
                      : (
                        <Link to="/signin">Sign In</Link>
                      ) 
                    }
                </div>
            </header>
            <main>
              <Route path='/' exact component={HomeScreen} />
              <Route path='/products/:id' component={ProductScreen}/>
              <Route path='/signin' component={SigninScreen}/>
              <Route path='/signup' component={SignupScreen}/>
              <Route path='/cart' component={CartScreen}/>
              <Route path='/shipping' component={ShippingScreen}/>
              <Route path='/payment' component={PaymentMethodScreen}/>
              <Route path='/placeorder' component={PlaceOrderScreen}/>
              <Route path='/orders/:orderId' component={OrderScreen}/>
              <Route path='/myorders' component={UserOrders}/>
              <Route path='/editprofile' component={EditProfileScreen}/>
            </main>
            <footer className="row center">
                All right reserved
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
