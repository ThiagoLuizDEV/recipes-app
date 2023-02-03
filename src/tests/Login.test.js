import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../context/LoginContext';
import FetchApiByCategory from '../context/FetchApiByCategory';
import FetchsApi from '../context/FetchsApi';
import App from '../App';

describe('testando a página de login', () => {
  test(' mostra na pagina os campos de login ', () => {
    render(
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

    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
    const btnLogin = screen.getByTestId('login-submit-btn');

    userEvent.type((email), 'bruno@bruno.com');
    userEvent.type((password), '1234567');
    userEvent.click(btnLogin);
  });
});
