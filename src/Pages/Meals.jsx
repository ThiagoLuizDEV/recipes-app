import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import { FetchApiContext } from '../context/FetchsApi';

export default function Meals() {
  const { mealsRecipeFetch,
    mealsRecipe, categoryMeal, mealCategory } = useContext(FetchApiContext);

  useEffect(() => {
    mealsRecipeFetch();
    mealCategory();
  }, []);

  const numberValid = 11;
  const secondNumberValid = 4;
  const arrayMeal = [];
  mealsRecipe.forEach((recips, i) => {
    if (i <= numberValid) {
      return arrayMeal.push(recips);
    }
  });

  const filterMealUnique = [];

  categoryMeal.forEach((cat, index) => {
    if (index <= secondNumberValid) {
      return filterMealUnique.push(cat.strCategory);
    }
  });

  console.log(categoryMeal);
  console.log(filterMealUnique);
  return (
    <div>
      <Header />
      <table>
        {filterMealUnique.map((filter) => (
          <button
            key={ filter }
            data-testid={ `${filter}-category-filter` }
          >
            { filter }
          </button>
        ))}
      </table>
      { arrayMeal.map((recips, index) => (
        <card
          data-testid={ `${index}-recipe-card` }
          key={ recips.idMeal }
        >
          <h3
            data-testid={ `${index}-card-name` }
          >
            { recips.strMeal }
          </h3>
          <img
            src={ recips.strMealThumb }
            alt={ recips.idMeal }
            data-testid={ `${index}-card-img` }
          />

        </card>
      ))}
    </div>
  );
}
