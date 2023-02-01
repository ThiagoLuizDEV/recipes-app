import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';

export default function SearchBar() {
  const {
    search,
    setSearch,
    radio,
    setRadio,
    fetchRecipes,
  } = useContext(SearchRecipesContext);

  const history = useHistory();
  const { pathname } = useLocation();

  const checkPathName = () => {
    switch (pathname) {
    case '/meals':
      return 'idMeal';
    case '/drinks':
      return 'idDrink';
    default:
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipes = await fetchRecipes();

    if (!recipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (!!recipes && recipes.length <= 1) {
      history.push(`${pathname}/${recipes[0][checkPathName()]}`);
    }
  };

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
    if (radio === 'firstLetter' && search.length >= 1) {
      global.alert('Your search must have only 1 (one) character');
      setSearch(target.value[0]);
    }
  };

  const handleRadioChange = ({ target }) => {
    setSearch('');
    setRadio(target.value);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search"
        value={ search }
        onChange={ handleSearchChange }
      />
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          name="search-bar-radio"
          value="ingredient"
          checked={ radio === 'ingredient' }
          onChange={ (e) => handleRadioChange(e) }
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
          name="search-bar-radio"
          value="name"
          checked={ radio === 'name' }
          onChange={ (e) => handleRadioChange(e) }
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          name="search-bar-radio"
          value="firstLetter"
          checked={ radio === 'firstLetter' }
          onChange={ (e) => handleRadioChange(e) }
        />
        First letter
      </label>
      <button
        type="submit"
        data-testid="exec-search-btn"
        disabled={ (!search) }
      >
        SEARCH
      </button>
    </form>
  );
}
