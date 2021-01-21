import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    console.log(rest , '----rest----')
    //get user info state from redux
    const { userInfo } = useSelector(state => state.signInReducer);
    return ( 
        <Route
           {...rest } 
           render = { (routeProps) => {
               //console.log(routeProps, '***routeProps***')
               return userInfo ? ( <Component {...routeProps }/>
                 ) : (
                     <Redirect to='/signin' />
                 )
           }}/>
     );
}
 
export default ProtectedRoute;