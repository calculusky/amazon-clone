import { Link } from "react-router-dom";
import Ratings from "./Ratings/Ratings";

const Products = (props) => {
    const { product } = props;
    return ( 
        <div className="card">
            <Link to={`/products/${product._id}`}>
                <img className="medium" src={product.image} alt="product"/>
            </Link>
            <div className="card-body">
                <Link to={`/products/${product._id}`}>
                    <h1>{product.name}</h1>
                </Link>
               {<Ratings
                   rating={product.rating}
                   numReviews={product.numReviews}
               />}
                <div className="price">
                    ${product.price}
                </div>
            </div>
        </div>
     );
}
 
export default Products;