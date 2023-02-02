import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../context/LoginContext';
import FetchsApi from '../context/FetchsApi';
import FetchApiByCategory from '../context/FetchApiByCategory';
import App from '../App';

describe('Testando do componente Header', () => {
  it('teste o componente Header.', () => {
    const { asFragment } = render(
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

    expect(asFragment()).toMatchSnapshot();
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
    const btnLogin = screen.getByTestId('login-submit-btn');

    userEvent.type((email), 'bruno@bruno.com');
    userEvent.type((password), '1234567');
    userEvent.click(btnLogin);
    const titlePage = screen.getByText('Meals');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(titlePage).toBeInTheDocument();
    userEvent.click(searchBtn);
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click((profileBtn));
    const doneRecipeBtn = screen.getByTestId('profile-done-btn');
    expect(doneRecipeBtn).toBeInTheDocument();
    userEvent.click(doneRecipeBtn);
    const doneRecipeTitle = screen.getByText('Done Recipes');
    expect(doneRecipeTitle).toBeInTheDocument();
  });
});
