import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Products from "../../components/Products/Products";
import LoadingBox from '../../components/LoadingBox/LoadingBox';

const HomeScreen = (props) => {
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const resData = await axios.get('/api/products');
        setLoading(false);
        setProducts(resData.data);

      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    }
    fetchProducts();
  }, []);

  if(loading){
    return <LoadingBox/>
  }
  else if(error){
    return <div> error </div>
  }
  else{
    return ( 
      <div className="row center bg">
              { products.map(product => {
              return <Products key={product._id} product={product}/>
            }) }                  
      </div>
   );
  }
}
 
export default HomeScreen;