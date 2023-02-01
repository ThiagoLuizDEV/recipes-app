import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
// import { LoginContext } from '../context/LoginContext';

// hi
export default function Profile() {
  const email = localStorage.getItem('user');
  console.log(email);
  // const history = useHistory();
  // const { login } = useContext(LoginContext);
  // const emails = login.email;
  // console.log(emails);
  // const test = 'email@mail.com';
  // for (let i = 0; i < localStorage.length; i += 1) {
  //   const key = localStorage.key(i);
  //   const value = localStorage.getItem(key);
  //   console.log(key, value);
  // }
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
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ localStorage.removeItem('user') }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>

  );
}
