/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FetchApiByCategoryContext } from '../context/FetchApiByCategory';
import { FetchApiContext } from '../context/FetchsApi';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';
import './styles/Recipes.css';

export default function Drinks() {
  const {
    searchArray,
  } = useContext(SearchRecipesContext);

  const history = useHistory();

  const { drinkRecipeFetch,
    drinkRecipe, categoryDrink, drinkCategory } = useContext(FetchApiContext);

  const {
    toggle,
    setToggle,
    buttonDrinks,
    setEndPointDrinks, setButtonDrinks } = useContext(FetchApiByCategoryContext);

  useEffect(() => {
    drinkRecipeFetch();
    drinkCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event, filter) => {
    event.preventDefault();
    setEndPointDrinks(filter);
    setToggle(false);
  };

  const numberValid = 11;
  const secondNumberValid = 4;

  const arrayDrink = [];

  if (searchArray.length > 0) {
    searchArray.forEach((recips, i) => {
      if (i <= numberValid) {
        return arrayDrink.push(recips);
      }
    });
  } else {
    drinkRecipe.forEach((recips, i) => {
      if (i <= numberValid) {
        return arrayDrink.push(recips);
      }
    });
  }

  const handleInitialPage = (event) => {
    event.preventDefault();
    setButtonDrinks([]);
    setToggle(true);
  };

  const filterDrinkUnique = [];
  categoryDrink.forEach((cat, index) => {
    if (index <= secondNumberValid) {
      return filterDrinkUnique.push(cat.strCategory);
    }
    return true;
  });

  const imageClick = (e) => {
    history.push(`drinks/${e.idDrink}`);
  };

  const maxNumberOfDrinks = 12;
  const render = (drinks) => (
    drinks.slice(0, maxNumberOfDrinks).map((recips, index) => (
      <div
        data-testid={ `${index}-recipe-card` }
        key={ recips.idDrink }
      >
        <p
          data-testid={ `${index}-card-name` }
          className="DrinksTitle"
        >
          {recips.strDrink}
        </p>
        <input
          type="image"
          width="150px"
          height="150px"
          src={ recips.strDrinkThumb }
          alt={ recips.idDrink }
          data-testid={ `${index}-card-img` }
          onClick={ () => imageClick(recips) }
        />
      </div>
    ))
  );

  return (
    <div>
      <Header />
      <div>
        {filterDrinkUnique.map((filter) => (
          <button
            key={ filter }
            type="submit"
            value={ filter }
            data-testid={ `${filter}-category-filter` }
            onClick={ toggle ? (e) => handleClick(e, filter)
              : (e) => handleInitialPage(e) }
          >
            { filter }
          </button>
        ))}
      </div>
      <button
        className="buttonFilter"
        value="All"
        data-testid="All-category-filter"
        onClick={ handleInitialPage }
      >
        All
      </button>
      <div className="imgMeals">
        {
          buttonDrinks.length > 0 ? (
            render(buttonDrinks)
          ) : (
            render(arrayDrink)
          )
        }
      </div>
      <Footer />
    </div>
  );
}
