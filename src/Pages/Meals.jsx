import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import { FetchApiContext } from '../context/FetchsApi';

export default function Meals() {
  const { mealsRecipeFetch,
    mealsRecipe } = useContext(FetchApiContext);

  useEffect(() => {
    mealsRecipeFetch();
  }, []);

  const numberValid = 11;
  const arrayMeal = [];
  mealsRecipe.forEach((recips, i) => {
    if (i <= numberValid) {
      return arrayMeal.push(recips);
    }
  });

  console.log(arrayMeal);
  console.log(mealsRecipe);
  return (
    <div>
      <Header />
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
