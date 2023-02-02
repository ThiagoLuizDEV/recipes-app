import React from 'react';
import './App.css';
// import {  Route } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Components/Routes';
import SearchRecipesProvider from './context/SearchRecipesProvider';
// import Login from './Pages/Login';

function App() {
  return (
    <SearchRecipesProvider>
      <div className="meals">
        <Routes />
      </div>
    </SearchRecipesProvider>
  );
}

export default App;
