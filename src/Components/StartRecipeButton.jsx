// import { useContext } from 'react';
import { arrayOf, string } from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation, withRouter } from 'react-router-dom';
// import { SearchRecipesContext } from '../context/SearchRecipesProvider';
import useLocalStorage from '../hooks/useLocalStorage';

function StartRecipeButton({ status, ingredients }) {
  const history = useHistory();

  // const { setId } = useContext(SearchRecipesContext);

  const { pathname } = useLocation();
  const siteKey = pathname.split('/')[1];
  const recipeId = pathname.split('/')[2];

  const [
    wipRecipes,
    setWipRecipes,
  ] = useLocalStorage('inProgressRecipes');

  const handleStart = () => {
    history.replace(`${pathname}/in-progress`);
    const ingredientsList = ingredients.map((el) => [`${el[0]} --- ${el[1]}`, false]);

    setWipRecipes({
      ...wipRecipes,
      [siteKey]: {
        [recipeId]: ingredientsList,
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

export default withRouter(StartRecipeButton);
