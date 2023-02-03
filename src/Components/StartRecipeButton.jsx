import { arrayOf, string } from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

export default function StartRecipeButton({ status, ingredients }) {
  const history = useHistory();

  const { pathname } = useLocation();
  const siteKey = pathname.split('/')[1];
  const recipeId = pathname.split('/')[2];

  const [
    wipRecipes,
    setWipRecipes,
  ] = useLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });

  const handleStart = () => {
    history.push(`${pathname}/in-progress`);
    setWipRecipes({
      ...wipRecipes,
      [siteKey]: {
        [recipeId]: ingredients,
      },
    });
  };

  switch (status) {
  case 'start':
    return (
      <button
        className="fixarBottun"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleStart }
      >
        Start Recipe
      </button>
    );
  case 'wip':
    return (
      <button
        className="fixarBottun"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleStart }
      >
        Continue Recipe
      </button>
    );
  case 'done':
    return null;
  default:
    return null;
  }
}

StartRecipeButton.propTypes = {
  status: string.isRequired,
  ingredients: arrayOf(arrayOf(string)).isRequired,
};
