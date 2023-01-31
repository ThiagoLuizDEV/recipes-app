import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Profile() {
  const [name, setName] = useState([]);

  useEffect(() => {
    const names = JSON.parse(localStorage.getItem('email'));
    if (names) {
      setName(name);
    }
  }, []);
  const handleClear = () => {
    $.each(localStorage, (key) => {
      keys.push(key);
    });
    localStorage.clear(key);
  };
  return (
    <div>
      <Header />
      <h1 data-testid="profile-email">{name}</h1>
      <Link to='"/done-recipes" /'>
        <button
          type="submit"
          data-testid="profile-done-btn"
        >
          DoneRecipes
        </button>
      </Link>
      <Link to="/favorites-recipes">
        <button
          type="submit"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          type="submit"
          data-testid="profile-logout-btn"
          onClick={ () => handleClear() }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>

  );
}
