import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LoginProvider from './context/LoginContext';
import FetchsApi from './context/FetchsApi';
import FetchApiByCategory from './context/FetchApiByCategory';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <FetchsApi>
        <FetchApiByCategory>
          <LoginProvider>
            <App />
          </LoginProvider>
        </FetchApiByCategory>
      </FetchsApi>
    </BrowserRouter>,
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
