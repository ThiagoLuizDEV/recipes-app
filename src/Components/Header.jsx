import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import perfilImage from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  if (
    pathname === '/profile'
  || pathname === '/done-recipes'
  || pathname === '/favorite-recipes'
  ) {
    const firstName = pathname.split('-')[0].replace('/', '');
    const firstCamelName = firstName[0].toUpperCase() + firstName.substring(1);
    let lastName = '';
    let lastCamelName = '';

    if (pathname.split('-').length === 2) {
      lastName = pathname.split('-')[1].replace('/', '');
      lastCamelName = lastName[0].toUpperCase() + lastName.substring(1);
    }

    return (
      <div>
        <Link to="/profile">
          <input
            type="image"
            src={ perfilImage }
            alt="Imagem Perfil "
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">
          { lastCamelName ? `${firstCamelName} ${lastCamelName}` : firstCamelName }
        </h1>
      </div>
    );
  }
  const name = pathname.replace('/', '');
  const camelName = name[0].toUpperCase() + name.substring(1);

  return (
    <div>
      <Link to="/profile">
        <input
          type="image"
          src={ perfilImage }
          alt="Imagem Perfil"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ camelName }</h1>
      <input
        type="image"
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Search"
        onClick={ () => setIsVisible(!isVisible) }
      />
      { isVisible && <SearchBar /> }
    </div>
  );
}
