import React, { useEffect } from 'react';
import Products from "../../components/Products/Products";
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../store/actions/productAction';

const HomeScreen = (props) => {
  // const [ products, setProducts ] = useState([]);
  // const [ loading, setLoading ] = useState(false);
  // const [ error, setError ] = useState(false);
  const productList = useSelector(state => state.productList);
  const { error, loading, products } = productList;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts());

    // const fetchProducts = async () => {
    //   try {
    //     setLoading(true);
    //     const resData = await axios.get('/api/products');
    //     setLoading(false);
    //     setProducts(resData.data);

    //   } catch (error) {
    //     setLoading(false);
    //     setError(error.message)
    //     //console.log(error.message, 'err')
    //   }
    // }
    // fetchProducts();
  }, []);

  if(loading){
    return <LoadingBox/>
  }
  else if(error){
    return <MessageBox variant={'danger'}>{error}</MessageBox>
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