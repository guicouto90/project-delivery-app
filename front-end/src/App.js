import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from './pages/Login/Register';
import Login from './pages/Login/Login';
import './App.css';
import ProductsPage from './pages/client-flow/ProductsPage';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ ProductsPage } />
      </Switch>
    </div>
  );
}

export default App;
