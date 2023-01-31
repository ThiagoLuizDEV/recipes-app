/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import { FetchApiByCategoryContext } from '../context/FetchApiByCategory';
import { FetchApiContext } from '../context/FetchsApi';
import './Meals.css';

export default function Drinks() {
  const { drinkRecipeFetch,
    drinkRecipe, categoryDrink, drinkCategory } = useContext(FetchApiContext);

  const {
    buttonDrinks,
    setEndPointDrinks } = useContext(FetchApiByCategoryContext);

  useEffect(() => {
    drinkRecipeFetch();
    drinkCategory();
  }, []);

  const handleClick = (filter) => {
    setEndPointDrinks(filter);
  };

  const numberValid = 11;
  const secondNumberValid = 4;
  const arrayDrink = [];
  drinkRecipe.forEach((recips, i) => {
    if (i <= numberValid) {
      return arrayDrink.push(recips);
    }
  });

  // const handleInitialPage = () => {
  //   drinkRecipe.forEach((recips, i) => {
  //     if (i <= numberValid) {
  //       return arrayDrink.push(recips);
  //     }
  //   });
  // };

  const filterDrinkUnique = [];
  categoryDrink.forEach((cat, index) => {
    if (index <= secondNumberValid) {
      return filterDrinkUnique.push(cat.strCategory);
    }
    return true;
  });

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
        <img
          width="150px"
          height="150px"
          src={ recips.strDrinkThumb }
          alt={ recips.idDrink }
          data-testid={ `${index}-card-img` }
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
            onClick={ () => handleClick(filter) }
          >
            { filter }
          </button>
        ))}
      </div>
      <button
        className="buttonFilter"
        value="All"
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
    </div>
  );
}
