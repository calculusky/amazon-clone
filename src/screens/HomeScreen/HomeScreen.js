import React, { useEffect } from 'react';
import Products from "../../components/Products/Products";
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../store/actions/productAction';

const HomeScreen = (props) => {
  const productList = useSelector(state => state.productList);
  const { error, loading, products } = productList;
  const dispatch = useDispatch()
  //console.log(productList, '*******')

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  if(loading){
    return <LoadingBox/>
  }
  else if(error){
    return <MessageBox variant={'danger'}>{error}</MessageBox>
  }
  else{
    return ( 
      <div className="row center">
              { products.map(product => {
              return <Products key={product._id} product={product}/>
            }) }                  
      </div>
   );
  }
}
 
export default HomeScreen;