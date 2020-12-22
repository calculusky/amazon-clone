import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import CartScreen from './screens/CartScreen/CartScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import SigninScreen from './screens/SigninScreen/SigninScreen';

function App() {
  const cartItems = useSelector(state => state.cartReducer.cartItems);
  const cartBadge = cartItems.length > 0 ? <span className="badge small-text">{cartItems.length}</span> : null;
  return (
    <BrowserRouter>
       <div className="grid-container">
            <header className="row">
                <div>
                    <Link className="brand" to="/">amazona</Link>
                </div>
                <div>
                    <Link to="/cart"><i className="fa fa-shopping-cart large-text"></i>{cartBadge}</Link>
                    <Link to="/signin">Sign In</Link>
                </div>
            </header>
            <main>
              <Route path='/' exact component={HomeScreen} />
              <Route path='/products/:id' component={ProductScreen}/>
              <Route path='/signin' component={SigninScreen}/>
              <Route path='/cart' component={CartScreen}/>
            </main>
            <footer className="row center">
                All right reserved
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
