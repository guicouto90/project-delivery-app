import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import DeliveryProvider from './context/DeliveryProvider';
import CheckoutPage from './pages/client-flow/CheckoutPage';
import OrderDetails from './pages/client-flow/OrderDetails';
import OrdersPage from './pages/client-flow/OrdersPage';
import SellerOrdersPage from './pages/seller-flow/SellerOrdersPage';
import SellerOrdersDetails from './pages/seller-flow/SellerOrderDetails';
import ProductsPage from './pages/client-flow/ProductsPage';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';

function App() {
  return (
    <DeliveryProvider>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/customer/orders" component={ OrdersPage } />
        <Route exact path="/customer/orders/:id" component={ OrderDetails } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/checkout" component={ CheckoutPage } />
        <Route exact path="/customer/products" component={ ProductsPage } />
        <Route exact path="/seller/orders" component={ SellerOrdersPage } />
        <Route exact path="/seller/orders/:id" component={ SellerOrdersDetails } />
      </Switch>
    </DeliveryProvider>
  );
}

export default App;
