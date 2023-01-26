import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import perfilImage from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const { pathname } = useLocation();
  const nameArray = pathname.split('/');
  const name = nameArray[1];
  const test = name[0].toUpperCase() + name.substring(1);
  return (
    <div>
      <Route
        render={ ({ history }) => (
          <button
            src={ perfilImage }
            alt="Imagem Perfil "
            data-testid="profile-top-btn"
            onClick={ () => { history.push('/profile'); } }
          />
        ) }
      />
      <h1 data-testid="page-title">{ test }</h1>
      {/* { console.log(test)} */}
      <button
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Search "
      />

    </div>
  );
}
