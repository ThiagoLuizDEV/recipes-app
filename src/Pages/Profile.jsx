import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { LoginContext } from '../context/LoginContext';

export default function Profile() {
  const { login } = useContext(LoginContext);
  // const getEmail = () => (localStorage.getItem('email')
  //   ? JSON.parse(localStorage.getItem('email')) : []);
  // console.log(getEmail());
  // const [name, setName] = useState([]);
  // const nameEmail = (() => {
  //   localStorage.getItem('email');
  // });
  // useEffect(() => {
  //   const names = JSON.parse(localStorage.getItem('email'));
  //   if (names) {
  //     setName(name);
  //   }
  // }, []);
  const handleClear = () => {
    $.each(localStorage, (key) => {
      keys.push(key);
    });
    localStorage.clear(key);
  };
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
          onClick={ () => handleClear() }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>

  );
}
