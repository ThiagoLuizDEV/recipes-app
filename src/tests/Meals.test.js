import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../context/LoginContext';
import FetchsApi from '../context/FetchsApi';
import FetchApiByCategory from '../context/FetchApiByCategory';
import App from '../App';

describe('Testando a page Recipes', () => {
  it('Testando o componente Meals completo', async () => {
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

    await waitFor(() => {
      const filterBeef = screen.getByTestId('Beef-category-filter');
      userEvent.click(filterBeef);
      const beefFilter = screen.getByText('Beef and Oyster pie');
      expect(beefFilter).toBeInTheDocument();
      const filterAll = screen.getByTestId('All-category-filter');
      userEvent.click(filterAll);
      const searchBtn = screen.getByTestId('search-top-btn');
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId('search-input');
      userEvent.type((searchInput), 'beef');
      const searchSubmit = screen.getByTestId('exec-search-btn');
      userEvent.click(searchSubmit);
    });
  });
  it('Testando as receitas meals', async () => {
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
  });
});
