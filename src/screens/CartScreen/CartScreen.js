//import { useEffect } from "react";
import { useSelector } from 'react-redux';
//import { addToCartAction } from '../../store/actions/cartAction';

const CartScreen = (props) => {

    const cart = useSelector(state => state.cartReducer);
    const { cartItems } = cart;
    console.log(cartItems, 'cartitems')

    // useEffect(() => {
    //     dispatch(addToCartAction(productId, qty))
    // }, [dispatch, productId, qty])



    return ( 
        <div>
            <h1>Cart screen</h1>
            

        </div>
     );
}
 
export default CartScreen;