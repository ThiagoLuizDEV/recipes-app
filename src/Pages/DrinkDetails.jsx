import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';
import RecomendationsCarousel from '../Components/RecomendationsCarousel';
import StartRecipeButton from '../Components/StartRecipeButton';
import shareIcon from '../images/shareIcon.svg';
import isFavoriteIcon from '../images/blackHeartIcon.svg';
import isNotFavoriteIcon from '../images/whiteHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

export default function DrinkDetails() {
  const [favRecipes, setFavRecipes] = useLocalStorage('favoriteRecipes', []);

  const [doneRecipes] = useLocalStorage('favoriteRecipes', []);

  const [
    wipRecipes,
  ] = useLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });

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
    if (!inProgress) {
      setInProgress(true);
      history.push(`${pathname}/in-progress`);

  const handleShare = () => {
    const copy = require('clipboard-copy');
    copy(window.location.href);
    setIsCopied(true);
  };

  const findInFavorites = () => favRecipes.find((favRecipe) => favRecipe.id === id);

  // wip recipes é onjeto
  const findInWip = () => id in wipRecipes[localStorageKeyName];

  const findInDone = () => doneRecipes?.find((doneRecipe) => doneRecipe.id === id);

  const startButtonStatus = () => {
    if (findInWip()) {
      return 'wip';
    }
    if (findInDone()) {
      return 'done';
    }
    return 'start';
  };

  const handleFavorite = () => {
    const duplicateFav = findInFavorites();

    if (duplicateFav) {
      const newFavRecipes = favRecipes.filter((favRecipe) => favRecipe.id !== id);

      setFavRecipes(newFavRecipes);
    } else {
      setFavRecipes([
        ...favRecipes,
        {
          id,
          type: pageName,
          nationality: '',
          category,
          alcoholicOrNot: isAlcoholic,
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
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
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
              {
                `${el[0]} --- ${el[1]}`
              }
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">
        { instructions }
      </p>
      <RecomendationsCarousel />
      <StartRecipeButton
        status={ startButtonStatus() }
        recipeId={ id }
        ingredients={ intoArray(detailedRecipe) }
      />
    </div>
  );
}
