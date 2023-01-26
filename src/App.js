import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exach path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
