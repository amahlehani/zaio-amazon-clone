import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/layouts/Header';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import CheckoutProduct from './components/CheckoutProduct/CheckoutProduct';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment/Payment';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Orders from './components/Orders/Orders';
import { useContext, useEffect } from 'react';
import ShoppingContext from './context/shopping/shoppingContext';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51QMFoSGK9OvTzZm612pVtaDJxjVcdul9dNa2HOXmSyprvaMv9vGHfGHfyNk947t3OXu1h7ZZFzdBqqSb3dd83ht500t1o6ZOoo");

const PaymentWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  )
}

function App() {
  const shoppingContext = useContext(ShoppingContext);
  const { setUser } = shoppingContext;

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('User is ->', authUser)
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null);
      }
    })
  })

  return (
      <Router>
      <>
        <Header />
          <main>
            <Routes>
              <Route path='/' exact element={<Navigate replace to='/home' />} />
              <Route path='/home' element={<Home />} />
              <Route path='/products' exact element={<Products />} />
              <Route path='/products/:id' element={<ProductDetails />} />
              <Route path='/checkout-product' element={<CheckoutProduct />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/payment' element={<PaymentWrapper />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
      </>  
    </Router>

  );
}

export default App;
