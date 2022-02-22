import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import DeliveryProvider from './context/DeliveryProvider';
import ProductsPage from './pages/client-flow/ProductsPage';
import Login from './pages/login/Login';

function App() {
  return (
    <DeliveryProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/customer/products" component={ ProductsPage } />
        </Switch>
      </BrowserRouter>
    </DeliveryProvider>
  );
}

export default App;
