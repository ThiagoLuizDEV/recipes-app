/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const FetchApiByCategoryContext = createContext({});

function FetchApiByCategory({ children }) {
  const [buttonMeals, setButtonMeals] = useState([]);
  const [endPointMeals, setEndPointMeals] = useState('');
  const [buttonDrinks, setButtonDrinks] = useState([]);
  const [endPointDrinks, setEndPointDrinks] = useState('');

  const fetchMeals = async () => {
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${endPointMeals}`)
      .then((response) => response.json())
      .then((receivedMealsApi) => {
        const apiResult = receivedMealsApi.meals;
        setButtonMeals(apiResult);
      });
  };

  const fetchDrinks = async () => {
    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${endPointDrinks}`)
      .then((response) => response.json())
      .then((receivedDrinksApi) => {
        const apiResult = receivedDrinksApi.drinks;
        setButtonDrinks(apiResult);
      });
  };

  useEffect(() => {
    if (endPointMeals) fetchMeals();
  }, [endPointMeals]);

  useEffect(() => {
    if (endPointDrinks) fetchDrinks();
  }, [endPointDrinks]);

  const mealsMemo = useMemo(() => ({
    fetchMeals,
    setButtonMeals,
    buttonMeals,
    buttonDrinks,
    endPointMeals,
    setEndPointMeals,
    setEndPointDrinks,
    endPointDrinks,
    setButtonDrinks,
  }), [buttonMeals, endPointMeals, buttonDrinks, endPointDrinks]);

  return (
    <FetchApiByCategoryContext.Provider
      value={ mealsMemo }
    >
      {children}
    </FetchApiByCategoryContext.Provider>
  );
}

FetchApiByCategory.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FetchApiByCategory;
