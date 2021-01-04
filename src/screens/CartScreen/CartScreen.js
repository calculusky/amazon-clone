//import { useEffect } from "react";
import { connect } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../../store/actions/cartAction';
import MessageBox from "../../components/MessageBox/MessageBox";
import { Link } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";

const CartScreen = (props) => {
    //  const productId = props.match.params.id;
    //  const qty = parseInt(props.location.search.split('=')[1]) || 1;
    const { onAddToCart, onRemoveFromCart } = props;
    const { cartItems } = props.cart;

    console.log(cartItems, 'cartitems------')

    // useEffect(() => {
    //     //dispatch(addToCartAction(productId, qty))
    //     onAddToCart(productId, qty);        
    // }, [onAddToCart, productId, qty]) //disp--------

    //add to cart
    const addToCartHandler = (productId, qty) => {
          onAddToCart(productId, parseInt(qty))
        //dispatch(addToCartAction(productId, parseInt(qty)))
    }

    //remove from cart
    const removeFromCartHandler = (productId) => {
          onRemoveFromCart(productId);
        //dispatch(removeFromCartAction(productId))      
    }

    //redirect to signin
    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }

    return ( 
         <div className="row top">
             {/* <h3>Shopping Cart</h3>           */}
                {cartItems.length < 1 ? (
                    <MessageBox>
                       Cart is empty! <Link to="/">Go shopping</Link>
                    </MessageBox>
                ): (                    
                    <div className="col-2">
                        <ul>
                            {cartItems.map(item => {
                                return (
                                    <li key={item.productId}>
                                        <div className="row">
                                            <div>
                                                <img className="small" alt={item.name} src={item.image}/>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/products/${item.productId}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.qty} onChange={(e) => addToCartHandler(item.productId, e.target.value) }>
                                                    {[...Array(item.countInStock).keys()].map(x => {
                                                        return <option key={x+1} value={x+1}>{x+1}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div>${item.price}</div>
                                            <div>
                                                <button onClick={() => removeFromCartHandler(item.productId)}>Delete</button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>                       
                )} 
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <h2>Subtotal ({cartItems.reduce((acc, val) => acc + val.qty, 0)} items) : ${cartItems.reduce((acc, val) => acc + (val.qty * val.price), 0)}</h2>
                                </li>
                                <li>
                                    <button className="primary block" onClick={checkoutHandler} disabled={cartItems.length === 0}>Proceed to Checkout</button>
                                </li>
                            </ul>
                        </div>
                    </div>                                           
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
        onAddToCart: (productId, qty) => dispatch(addToCartAction(productId, qty)),
        onRemoveFromCart: (productId) => dispatch(removeFromCartAction(productId))
    }
}
//export default CartScreen;
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);