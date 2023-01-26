import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealsIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div>
      <div>
        <button data-testid="drinks-bottom-btn">
          <img src={ drinkIcon } alt="Drink Icon " />
        </button>
        <button data-testid="meals-bottom-btn">
          <img src={ mealsIcon } alt="eals Icon " />
        </button>
        <h1 data-testid="page-title">Menu Inferior</h1>

      </div>
    </div>
  );
}
