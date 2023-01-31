/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import { FetchApiByCategoryContext } from '../context/FetchApiByCategory';
import { FetchApiContext } from '../context/FetchsApi';
import './Meals.css';

export default function Meals() {
  const { mealsRecipeFetch,
    mealsRecipe,
    categoryMeal,
    mealCategory,
  } = useContext(FetchApiContext);

  const {
    buttonMeals,
    setEndPointMeals, setButtonMeals } = useContext(FetchApiByCategoryContext);

  useEffect(() => {
    mealsRecipeFetch();
    mealCategory();
  }, []);

  const handleClick = (filter) => {
    setEndPointMeals(filter);
  };

  const numberValid = 11;
  const secondNumberValid = 4;

  const arrayMeal = [];

  mealsRecipe.forEach((recips, i) => {
    if (i <= numberValid) {
      return arrayMeal.push(recips);
    }
  });

  const handleInitialPage = () => {
    // drinkRecipe.forEach((recips, i) => {
    //   if (i <= numberValid) {
    //     return arrayDrink.push(recips);
    //   }
    // });
    setButtonMeals([]);
  };

  const filterMealUnique = [];

  categoryMeal.forEach((cat, index) => {
    if (index <= secondNumberValid) {
      return filterMealUnique.push(cat.strCategory);
    }
  });

  const maxNumberOfRecipes = 12;
  const render = (recipes) => (
    recipes.slice(0, maxNumberOfRecipes).map((recips, index) => (
      <div
        data-testid={ `${index}-recipe-card` }
        key={ recips.idMeal }
      >
        <p
          data-testid={ `${index}-card-name` }
          className="mealsTitle"
        >
          {recips.strMeal}
        </p>
        <img
          width="150px"
          height="150px"
          src={ recips.strMealThumb }
          alt={ recips.idMeal }
          data-testid={ `${index}-card-img` }
        />
      </div>
    ))
  );
  return (
    <div>
      <Header />
      <div>
        {filterMealUnique.map((filter) => (
          <button
            type="submit"
            key={ filter }
            value={ filter }
            data-testid={ `${filter}-category-filter` }
            onClick={ () => handleClick(filter) }
          >
            {filter}
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
          buttonMeals.length > 0 ? (
            render(buttonMeals)
          ) : (
            render(arrayMeal)
          )
        }
      </div>
    </div>
  );
}
