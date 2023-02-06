import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import userEvent from '@testing-library/user-event';
import LoginProvider from '../context/LoginContext';
import FetchsApi from '../context/FetchsApi';
import FetchApiByCategory from '../context/FetchApiByCategory';
import App from '../App';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Testando do componente SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});
  });

  it('teste o componente SearchBar, testando filtro Input Text.', () => {
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
    const titlePage = screen.getByText('Meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(titlePage).toBeInTheDocument();
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type((searchInput), 'beef');
    const searchSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchSubmit);
  });

  it('Testando filtro radio ingredient', async () => {
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

    const titlePage = screen.getByText('Meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(titlePage).toBeInTheDocument();
    userEvent.click(searchBtn);
    const inputRadioFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(inputRadioFirstLetter);
    expect(inputRadioFirstLetter).toBeChecked();
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type((searchInput), 'b');
    const searchSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchSubmit);

    const inputRadioName = screen.getByTestId('name-search-radio');
    userEvent.type((inputRadioName), 'c');
    userEvent.click(searchSubmit);

    const inputRadioIngred = screen.getByTestId('ingredient-search-radio');
    userEvent.click(inputRadioIngred);
    userEvent.type((searchInput), 'xablaeu');
    userEvent.click(searchSubmit);

    await waitFor(() => {
      expect(global.alert).toBeCalled();
    });

    expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
  it('Testando segundo alert', async () => {
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
    const titlePage = screen.getByText('Meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(titlePage).toBeInTheDocument();

    userEvent.click(searchBtn);
    const inputRadioFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(inputRadioFirstLetter);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type((searchInput), 'ba');
    const searchSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchSubmit);

    await waitFor(() => {
      expect(global.alert).toBeCalled();
    });

    expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });

  it('testando troca de rota', async () => {
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
    const titlePage = screen.getByText('Meals');
    const searchBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(titlePage).toBeInTheDocument();

    userEvent.click(searchBtn);
    const inputRadioName = screen.getByTestId('name-search-radio');
    userEvent.click(inputRadioName);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    userEvent.type((searchInput), 'corba');
    const searchSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.click(searchSubmit);
  });
});
