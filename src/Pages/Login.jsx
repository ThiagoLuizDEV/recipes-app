import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

function Login() {
  const { handleClick, validationLogin, login,
    handleChange } = useContext(LoginContext);

  return (
    <div>
      <form>
        <h3>Insira seu Email:</h3>
        <input
          type="email"
          id="email"
          name="email"
          value={ login.email }
          placeholder="Digite aqui seu email"
          data-testid="email-input"
          onChange={ (e) => handleChange(e) }
        />
        <h3>Insira sua password:</h3>
        <input
          type="password"
          id="password"
          name="password"
          value={ login.password }
          data-testid="password-input"
          onChange={ (e) => handleChange(e) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ validationLogin }
          onClick={ (e) => handleClick(e) }
        >
          Play
        </button>
      </form>
    </div>
  );
}

export default Login;
