import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';

export default function DrinkDetails() {
  const { fetchDetailsRecipe, detailedRecipe } = useContext(SearchRecipesContext);

  const { pathname } = useLocation();
  const recipeId = pathname.split('/')[2];

  useEffect(() => {
    fetchDetailsRecipe(recipeId);
  }, []);

  const test = (e) => {
    e.preventDefault();
    console.log(detailedRecipe);
  };

  return (
    <>
      <div>drink details</div>
      <button
        type="button"
        onClick={ test }
      >
        test
      </button>

    </>
  );
}
