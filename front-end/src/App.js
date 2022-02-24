import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from './pages/Login/Register';
import Login from './pages/Login/Login';
import './App.css';
import CustomerProducts from './pages/CustomerProducts';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/products" component={ CustomerProducts } />
      </Switch>
    </div>
  );
}

export default App;
