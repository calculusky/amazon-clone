import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Ratings from '../../components/Products/Ratings/Ratings';
import { useSelector, useDispatch } from 'react-redux';
import { productDetailsAction } from '../../store/actions/productAction';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { addToCartAction } from '../../store/actions/cartAction';


const ProductScreen = (props) => { 
    const productDetails = useSelector(state => {
        return state.productDetailsReducer
    });

    //console.log(productDetails, 'details')
    //set states
    const { loading, error, product } = productDetails;
    const [qty, setQty] = useState(1)

    const prodId = props.match.params.id;

    //
    const dispatch = useDispatch();

    //add to cart handler
    const addToCartHandler = () => {
        //console.log(prodId)
        //dispatch(addToCartAction(prodId, parseInt(qty)))
        //props.history.push(`/cart`)
        props.history.push(`/cart/${prodId}?qty=${qty}`)
    }
  
    useEffect(() => {
        dispatch(productDetailsAction(prodId));
    }, [dispatch, prodId]);

    if(loading){
        return <LoadingBox/>
    }
    else if(error){
        return <MessageBox variant={'danger'}>{error}</MessageBox>
    }
    else {

        return ( 
            <div>
                <Link to="/">Back to Products</Link>
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name} />
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Ratings rating={product.rating} numReviews={product.numReviews}/>
                            </li>
                            <li>Price: ${product.price}</li>
                            <li>
                                Description:
                                <p>{product.description}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                       <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock > 0 ? <span className="success">In Stock</span> : <span className="danger">Unavailable</span>}
                                    </div>
                                </div>
                            </li>
                            {
                                product.countInStock > 0 && (
                                    <div>
                                        <li>
                                            <div className="row">
                                                <div>Quantity</div>
                                                <div>
                                                    <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        { [...Array(product.countInStock).keys()].map(n => {
                                                            return <option key={n+1} value={n+1}>{n+1}</option>
                                                        }) }
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button className="primary block" onClick={addToCartHandler}>Add to Cart</button>
                                        </li>
                                   </div>
                                )
                            }
                            
                        </ul>
                      </div>
                    </div>          
                </div>
            </div>
         );
    }


    
}
 
export default ProductScreen;