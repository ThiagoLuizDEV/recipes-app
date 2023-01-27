import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import { FetchApiContext } from '../context/FetchsApi';

export default function Drinks() {
  const { drinkRecipeFetch,
    drinkRecipe } = useContext(FetchApiContext);

  useEffect(() => {
    drinkRecipeFetch();
  }, []);

  const numberValid = 11;
  const arrayDrink = [];
  drinkRecipe.forEach((recips, i) => {
    if (i <= numberValid) {
      return arrayDrink.push(recips);
    }
  });

  console.log(arrayDrink);
  console.log(drinkRecipe);
  return (
    <div>
      <Header />
      { arrayDrink.map((recips, index) => (
        <card
          data-testid={ `${index}-recipe-card` }
          key={ recips.idDrink }
        >
          <h3
            data-testid={ `${index}-card-name` }
          >
            { recips.strDrink }
          </h3>
          <img
            src={ recips.strDrinkThumb }
            alt={ recips.idDrink }
            data-testid={ `${index}-card-img` }
          />

        </card>
      ))}
    </div>
  );
}
