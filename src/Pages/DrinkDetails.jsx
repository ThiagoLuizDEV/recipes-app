import require from 'clipboard-copy';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';
import RecomendationsCarousel from '../Components/RecomendationsCarousel';
import shareIcon from '../images/shareIcon.svg';
import Button from '../Components/Button';
import Ingredients from '../Components/Ingredients';

export default function DrinkDetails() {
  const [isCopied, setIsCopied] = useState(false);

  const {
    fetchDetailsRecipe,
    detailedRecipe,
    fetchRecomendations,
  } = useContext(SearchRecipesContext);

  const { pathname } = useLocation();
  const recipeId = pathname.split('/')[2];

  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      await fetchRecomendations();
      await fetchDetailsRecipe(recipeId);
    };
    callApi();
    let recipesArray = localStorage.getItem('inProgressRecipes');
    if (recipesArray) {
      recipesArray = JSON.parse(recipesArray);
      const startedRecipes = recipesArray.drinks ? Object.keys(recipesArray.drinks) : [];
      setInProgress(startedRecipes.includes(recipeId));
    }
  }, []);

  const {
    strDrinkThumb: thumbnail,
    strDrink: title,
    strAlcoholic: category,
    strInstructions: instructions,
  } = detailedRecipe;

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
        <Ingredients
          pathname={ pathname }
          detailedRecipe={ detailedRecipe }
          category="drinks"
          recipeId={ recipeId }
        />
      </ul>
      <p data-testid="instructions">
        { instructions }
      </p>
      <RecomendationsCarousel />
      <Button
        inProgress={ inProgress }
        pathname={ pathname }
        recipeId={ recipeId }
        setInProgress={ setInProgress }
        category="drinks"
      />
    </div>
  );
}
