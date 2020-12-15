import { BrowserRouter, Route } from 'react-router-dom'
import CartScreen from './screens/Cart/Cart';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';

function App() {
  return (
    <BrowserRouter>
       <div className="grid-container">
            <header className="row">
                <div>
                    <a className="brand" href="index.html">amazona</a>
                </div>
                <div>
                    <a href="/cart">Cart</a>
                    <a href="/signin">Sign In</a>
                </div>
            </header>
            <main>
              <Route path='/' exact component={HomeScreen} />
              <Route path='/products/:id' component={ProductScreen}/>
              <Route path='/cart/:id?' component={CartScreen}/>
            </main>
            <footer className="row center">
                All right reserved
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
