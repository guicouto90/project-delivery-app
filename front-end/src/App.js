import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import DeliveryProvider from './context/DeliveryProvider';
import Register from './pages/Login/Register';
import Login from './pages/Login/Login';
import './App.css';
import ProductsPage from './pages/client-flow/ProductsPage';

function App() {
  return (
    <DeliveryProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ ProductsPage } />
        </Switch>
      </BrowserRouter>
    </DeliveryProvider>
  );
}

export default App;
