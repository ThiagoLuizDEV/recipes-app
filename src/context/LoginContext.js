import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [validationLogin, setValidationLogin] = useState(true);

  const verificaEmail = () => {
    const total = 6;
    const validacaoEmail = /[^@ \n]+@[^@ \n]+\.[^@ \n]/;
    if (validacaoEmail.test(login.email) && login.password.length >= total) {
      setValidationLogin(false);
    } else { setValidationLogin(true); }
  };
  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    verificaEmail();
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    history.push('/meals');
  };

  const LoginContextMemo = useMemo(() => ({
    validationLogin,
    verificaEmail,
    login,
    handleChange,
    handleClick,
  }), [login]);

  return (
    <LoginContext.Provider
      value={ LoginContextMemo }
    >
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default LoginProvider;
