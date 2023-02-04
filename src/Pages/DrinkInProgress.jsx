import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';
import RecomendationsCarousel from '../Components/RecomendationsCarousel';
import classes from './styles/RecipeDetails.module.css';

export default function DrinkInProgress() {
  const [inProgress, setInProgress] = useState(false);
  const {
    fetchDetailsRecipe,
    detailedRecipe,
    fetchRecomendations,
  } = useContext(SearchRecipesContext);
  const history = useHistory();

  const { pathname } = useLocation();
  const recipeId = pathname.split('/')[2];

  useEffect(() => {
    const callApi = async () => {
      await fetchRecomendations();
      await fetchDetailsRecipe(recipeId);
    };
    setInProgress(pathname.includes('progress'));
    callApi();
  }, [pathname]);

  const {
    strDrinkThumb: thumbnail,
    strDrink: title,
    strAlcoholic: category,
    strInstructions: instructions,
  } = detailedRecipe;

  const intoArray = (recipe) => {
    const resultArray = [];
    const maxIngredients = 21;

    for (let i = 1; i < maxIngredients; i += 1) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient?.length >= 1) {
        resultArray.push([ingredient, measure]);
      }
    }

    return resultArray;
  };

  const handleClick = () => {
    // if (!inProgress) {
    //   setInProgress(true);
    //   console.log(pathname);
    //   history.push(`${pathname}/in-progress`);
    // }
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ thumbnail }
        style={ { width: 300 } }
        alt="#"
      />
      <h1 data-testid="recipe-title">
        { title }
      </h1>
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <h2 data-testid="recipe-category">
        { category }
      </h2>
      <ul>
        {
          intoArray(detailedRecipe).map((el, i) => (
            inProgress ? (
              <label
                key={ i }
                data-testid={ `${i}-ingredient-step` }
                htmlFor="test"
                className={ classes.instruction }
              >
                {`${el[0]} --- ${el[1]}`}
                <input
                  type="checkbox"
                  id="test"
                  name="test"
                />
              </label>
            )
              : (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {
                    `${el[0]} --- ${el[1]}`
                  }
                </li>
              )
          ))
        }
      </ul>
      <p data-testid="instructions">
        { instructions }
      </p>
      { inProgress ? null : (
        <RecomendationsCarousel />
      ) }
      <button
        className="fixarBottun"
        type="button"
        data-testid={ inProgress ? 'finish-recipe-btn' : 'start-recipe-btn' }
        onClick={ handleClick }
      >
        { inProgress ? 'Finish Recipe' : 'Start Recipe' }
      </button>
    </div>
  );
}
