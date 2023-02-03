import require from 'clipboard-copy';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';
import RecomendationsCarousel from '../Components/RecomendationsCarousel';
import shareIcon from '../images/shareIcon.svg';

export default function DrinkDetails() {
  const [isCopied, setIsCopied] = useState(false);

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
    callApi();
  }, []);

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
    history.push(`${pathname}/in-progress`);
  };

  const handleShare = () => {
    const copy = require('clipboard-copy');
    copy(window.location.href);
    setIsCopied(true);
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
      <input
        type="image"
        src={ shareIcon }
        alt="share-btn"
        data-testid="share-btn"
        onClick={ handleShare }
      />
      { isCopied && <div>Link copied!</div> }
      <button
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <h2 data-testid="recipe-category">
        { category }
      </h2>
      <ul>
        {
          intoArray(detailedRecipe).map((el, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {`${el[0]} --- ${el[1]}`}
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">
        { instructions }
      </p>
      <RecomendationsCarousel />
      <button
        className="fixarBottun"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        Start Recipe
      </button>
    </div>
  );
}
