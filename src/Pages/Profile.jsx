import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
// import { LoginContext } from '../context/LoginContext';

// hi
export default function Profile() {
  const history = useHistory();
  const logoutBtn = () => {
    localStorage.clear();
    history.push('/');
  };

  const email = localStorage.getItem('user');
  return (
    <div>
      <Header />
      <h1 data-testid="profile-email">{email}</h1>
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
      <div>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logoutBtn }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>

  );
}
