import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import DeliveryProvider from './context/DeliveryProvider';
import CheckoutPage from './pages/client-flow/CheckoutPage';
import OrdersPage from './pages/client-flow/OrdersPage';
import ProductsPage from './pages/client-flow/ProductsPage';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';

function App() {
  return (
    <DeliveryProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/customer/orders" component={ OrdersPage } />
          <Route exact path="/customer/orders/:id" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/checkout" component={ CheckoutPage } />
          <Route exact path="/customer/products" component={ ProductsPage } />
        </Switch>
      </BrowserRouter>
    </DeliveryProvider>
  );
}

export default App;
