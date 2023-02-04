import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { bool, func, string } from 'prop-types';

export default function Button({
  inProgress, pathname, recipeId, setInProgress, category }) {
  const history = useHistory();
  const progress = () => (inProgress ? 'Continue Recipe' : 'Start Recipe');

  const handleClick = () => {
    if (!pathname.includes('progress')) {
      setInProgress(true);
      let previousRecipes = localStorage.getItem('inProgressRecipes');
      if (previousRecipes) {
        previousRecipes = JSON.parse(previousRecipes);
        localStorage
          .setItem('inProgressRecipes', JSON
            .stringify({ ...previousRecipes,
              [category]: {
                ...previousRecipes[category], [recipeId]: [] } }));
      } else {
        localStorage
          .setItem('inProgressRecipes', JSON
            .stringify({ [category]: { [recipeId]: [] } }));
      }
      history.push(`${pathname}/in-progress`);
    }
  };

  return (
    <button
      className="fixarBottun"
      type="button"
      data-testid={ pathname
        .includes('progress') ? 'finish-recipe-btn' : 'start-recipe-btn' }
      onClick={ handleClick }
    >
      {
        pathname
          .includes('progress') ? 'Finish Recipe' : progress()
      }
    </button>
  );
}

Button.propTypes = {
  category: string.isRequired,
  inProgress: bool.isRequired,
  pathname: string.isRequired,
  recipeId: string.isRequired,
  setInProgress: func.isRequired,
};
