import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealsIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div data-testid="footer">
      <div className="fixarRodape">
        <Link to="/drinks">
          <button
            src={ drinkIcon }
            alt="Drink Icon "
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/meals">
          <button
            src={ mealsIcon }
            alt="Meals Icon "
            data-testid="meals-bottom-btn"
          />
        </Link>
      </div>
    </div>
  );
}
