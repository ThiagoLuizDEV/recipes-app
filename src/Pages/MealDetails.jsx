import require from 'clipboard-copy';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import YoutubeEmbed from '../Components/YoutubeEmbed';
import RecomendationsCarousel from '../Components/RecomendationsCarousel';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

export default function MealDetails() {
  const [favRecipes, setFavRecipes] = useLocalStorage('favoriteRecipes', []);

  const [isCopied, setIsCopied] = useState(false);

  const {
    fetchDetailsRecipe,
    detailedRecipe,
    fetchRecomendations,
  } = useContext(SearchRecipesContext);

  const history = useHistory();

  const { pathname } = useLocation();

  const lastCharacter = -1;
  const pageName = pathname.split('/')[1].slice(0, lastCharacter);

  const recipeId = pathname.split('/')[2];

  useEffect(() => {
    const callApi = async () => {
      await fetchRecomendations();
      await fetchDetailsRecipe(recipeId);
    };
    callApi();
  }, []);

  const {
    idMeal: id,
    strArea: nationality,
    strMealThumb: thumbnail,
    strMeal: title,
    strCategory: category,
    strYoutube: youtubeLink,
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

  const handleStart = () => {
    history.push(`${pathname}/in-progress`);
  };

  const handleShare = () => {
    const copy = require('clipboard-copy');
    copy(window.location.href);
    setIsCopied(true);
  };

  const handleFavorite = () => {
    const duplicateFav = favRecipes.find((favRecipe) => favRecipe.id === id);

    if (duplicateFav) {
      const newFavRecipes = favRecipes.filter((favRecipe) => favRecipe.id !== id);

      setFavRecipes(newFavRecipes);
    } else {
      setFavRecipes([
        ...favRecipes,
        {
          id,
          type: pageName,
          nationality,
          category,
          alcoholicOrNot: '',
          name: title,
          image: thumbnail,
        },
      ]);
    }
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
      <input
        type="image"
        src={ favoriteIcon }
        alt="favorite-btn"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
      />
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
      <YoutubeEmbed youtubeLink={ youtubeLink } />
      <RecomendationsCarousel />
      <button
        className="fixarBottun"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleStart }
      >
        Start Recipe
      </button>
    </div>
  );
}
