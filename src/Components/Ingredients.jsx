/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classes from '../Pages/styles/RecipeInProgress.module.css';

export default function Ingredients({ pathname, detailedRecipe, category, recipeId }) {
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const intoArray = (recipe) => {
    const resultArray = [];
    const maxIngredients = 21;

    for (let i = 1; i < maxIngredients; i += 1) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient?.length >= 1) {
        resultArray.push([ingredient, measure]);
      }
    }

    return resultArray;
  };

  useEffect(() => {
    let previousCategory = localStorage.getItem('inProgressRecipes');
    if (previousCategory) {
      previousCategory = JSON.parse(previousCategory);
      setCheckedIngredients([...previousCategory[category][recipeId]]);
    }
  }, []);

  const handleIngredient = (ingredient) => {
    let previousCategory = localStorage.getItem('inProgressRecipes');
    if (previousCategory) {
      previousCategory = JSON.parse(previousCategory);

      const currentIngredient = previousCategory[category][recipeId].includes(ingredient);
      const newIngredients = currentIngredient ? [...previousCategory[category][recipeId]
        .filter((i) => i !== ingredient)]
        : [...previousCategory[category][recipeId], ingredient];
      setCheckedIngredients(newIngredients);
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify({
            ...previousCategory,
            [category]: {
              ...previousCategory[category],
              [recipeId]: newIngredients,
            } }));
      return;
    }
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify({ [category]: { [recipeId]: [ingredient] } }));
  };

  return (
    intoArray(detailedRecipe).map((el, i) => (
      pathname.includes('progress') ? (
        <li key={ i } className={ classes.item }>
          <label
            data-testid={ `${i}-ingredient-step` }
            htmlFor="test"
            className={ classes.instruction }
          >
            <input
              className={ classes.checkbox }
              type="checkbox"
              id="test"
              checked={ checkedIngredients
                .includes(`${el[0]}${el[1] ? ` --- ${el[1].trim()}` : ''}`) }
              name="test"
              onChange={
                () => handleIngredient(`${el[0]}${el[1] ? ` --- ${el[1].trim()}` : ''}`)
              }
            />
            {`${el[0]}${el[1] ? ` --- ${el[1].trim()}` : ''}`}
          </label>
        </li>
      )
        : (
          <li
            key={ i }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {`${el[0]}${el[1] ? ` --- ${el[1]}` : ''}`}
          </li>
        )
    ))
  );
}
