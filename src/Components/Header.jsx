import React from 'react';
import perfilImage from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <div>
      <button data-testid="profile-top-btn">
        <img src={ perfilImage } alt="Imagem Perfil " />
      </button>
      <button data-testid="search-top-btn">
        <img src={ searchIcon } alt="Search " />
      </button>
      <h1 data-testid="page-title">Nome do titulo</h1>

    </div>
  );
}
