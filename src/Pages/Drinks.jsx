import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import { FetchApiContext } from '../context/FetchsApi';

export default function Drinks() {
  const { drinkRecipeFetch,
    drinkRecipe, categoryDrink, drinkCategory } = useContext(FetchApiContext);

  useEffect(() => {
    drinkRecipeFetch();
    drinkCategory();
  }, []);

  const numberValid = 11;
  const secondNumberValid = 4;
  const arrayDrink = [];
  drinkRecipe.forEach((recips, i) => {
    if (i <= numberValid) {
      return arrayDrink.push(recips);
    }
  });

  const filterDrinkUnique = [];
  categoryDrink.forEach((cat, index) => {
    if (index <= secondNumberValid) {
      return filterDrinkUnique.push(cat.strCategory);
    }
    return true;
  });

  console.log(filterDrinkUnique);
  console.log(categoryDrink);
  // console.log(drinkRecipe);
  return (
    <div>
      <Header />
      <table>
        {filterDrinkUnique.map((filter) => (
          <button
            key={ filter }
            data-testid={ `${filter}-category-filter` }
          >
            { filter }
          </button>
        ))}
      </table>
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
