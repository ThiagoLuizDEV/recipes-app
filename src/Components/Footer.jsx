import React from 'react';
import { Route } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealsIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div>
      <div>
        <Route
          render={ ({ history }) => (
            <button
              data-testid="drinks-bottom-btn"
              onClick={ () => { history.push('/drinks'); } }
            >
              <img src={ drinkIcon } alt="Drink Icon " />
            </button>
          ) }
        />
        <Route
          render={ ({ history }) => (
            <button
              data-testid="meals-bottom-btn"
              onClick={ () => { history.push('/meals'); } }
            >
              <img src={ mealsIcon } alt="Meals Icon " />
            </button>
          ) }
        />

      </div>
    </div>
  );
}
