import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { LoginContext } from '../context/LoginContext';

// hi
export default function Profile() {
  const { login } = useContext(LoginContext);
  return (
    <div>
      <Header />
      <h1 data-testid="profile-email">{login.email}</h1>
      <Link to="/done-recipes">
        <button
          type="submit"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
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
          onClick={ localStorage.clear(login) }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>

  );
}
