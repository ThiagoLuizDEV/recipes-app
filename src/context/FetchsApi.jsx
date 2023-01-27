import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const FetchApiContext = createContext();

function FetchsApi({ children }) {
  const [mealsRecipe, setMealsRecipe] = useState([]);
  const [drinkRecipe, setDrinkRecipe] = useState([]);

  const mealsRecipeFetch = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setMealsRecipe(data.meals);
  };

  const drinkRecipeFetch = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setDrinkRecipe(data.drinks);
  };

  const FetchContextMemo = useMemo(() => ({
    mealsRecipeFetch,
    drinkRecipeFetch,
    mealsRecipe,
    drinkRecipe,
  }), [mealsRecipeFetch, drinkRecipeFetch, mealsRecipe, drinkRecipe]);

  return (
    <FetchApiContext.Provider
      value={ FetchContextMemo }
    >
      { children }
    </FetchApiContext.Provider>
  );
}

FetchsApi.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FetchsApi;
