import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction } from '../../store/actions/cartAction';

const CartScreen = (props) => {
    const cart = useSelector(state => state.cartReducer);
    console.log(cart, '---cart---')
    const productId = props.match.params.id;
    const qty = parseInt(props.location.search.split('=')[1]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addToCartAction(productId, qty))
    }, [dispatch, productId, qty])

    return ( 
        <div>
            <h1>Cart screen</h1>
            <h2>product ID: {props.match.params.id}</h2>
            <h2>Quantity: {parseInt(props.location.search.split('=')[1])}</h2>

        </div>
     );
}
 
export default CartScreen;