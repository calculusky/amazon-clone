import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Ratings from '../../components/Products/Ratings/Ratings';
import { useSelector, useDispatch } from 'react-redux';
import { productDetails } from '../../store/actions/productAction';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

//import data from '../../data';

const ProductScreen = (props) => {
   // console.log(props, 'propsssssss')
    // const product = []//data.products.find(product => product._id === props.match.params.id);
    // if(!product){
    //     return <div>Product not found</div>
    // }
   
    const singleProduct = useSelector(state => {
        return state.singleProduct
    });
    const { loading, error, product } = singleProduct;
    const dispatch = useDispatch();
    const prodId = props.match.params.id;
   // console.log(singleProduct, '888888******')

    useEffect(() => {
        dispatch(productDetails(prodId));
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
                            <li>
                                <button className="primary block">Add to Cart</button>
                            </li>
                        </ul>
                      </div>
                    </div>          
                </div>
            </div>
         );
    }


    
}
 
export default ProductScreen;