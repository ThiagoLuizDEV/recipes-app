import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../context/LoginContext';
import FetchsApi from '../context/FetchsApi';
import FetchApiByCategory from '../context/FetchApiByCategory';
import App from '../App';

describe('Testando a página Profile', () => {
  it('teste de cobertura para a page Profile.', () => {
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
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click((profileBtn));
    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click((logoutBtn));
    // const emailScreen = screen.getByText('bruno@bruno.com');
    // expect(emailScreen).toBeInTheDocument();
    
  });
});
