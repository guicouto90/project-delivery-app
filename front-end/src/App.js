import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Cadastro from './pages/Login/cadastro';
import Login from './pages/Login/Login';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Cadastro } />
      </Switch>
    </div>
  );
}

export default App;
