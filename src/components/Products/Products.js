import Ratings from "./Ratings/Ratings";

const Products = (props) => {
    const { product } = props;
    return ( 
        <div className="card">
            <a href={`/products/${product._id}`}>
                <img className="medium" src={product.image} alt="product"/>
            </a>
            <div className="card-body">
                <a href={`/products/${product._id}`}>
                    <h1>{product.name}</h1>
                </a>
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