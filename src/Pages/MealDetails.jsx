import require from 'clipboard-copy';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import YoutubeEmbed from '../Components/YoutubeEmbed';
import RecomendationsCarousel from '../Components/RecomendationsCarousel';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';
import shareIcon from '../images/shareIcon.svg';
import Button from '../Components/Button';
import Ingredients from '../Components/Ingredients';

export default function MealDetails() {
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
    console.log(recipesArray);
    if (recipesArray) {
      recipesArray = JSON.parse(recipesArray);
      const startedRecipes = recipesArray.meals ? Object.keys(recipesArray.meals) : [];
      setInProgress(startedRecipes.includes(recipeId));
    }
  }, []);

  const {
    strMealThumb: thumbnail,
    strMeal: title,
    strCategory: category,
    strYoutube: youtubeLink,
    strInstructions: instructions,
  } = detailedRecipe;

  const handleShare = () => {
    const copy = require('clipboard-copy');
    copy(window.location.href);
    setIsCopied(true);
  };
  const handleFavorite = () => {
    console.log(detailedRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: detailedRecipe.idMeal,
      type: 'meal',
      nationality: detailedRecipe.strArea,
      category: detailedRecipe.strCategory,
      alcoholicOrNot: '',
      name: detailedRecipe.strMeal,
      image: detailedRecipe.strMealThumb,

    }]));
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
        onClick={ handleFavorite }
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
          category="meals"
          recipeId={ recipeId }
        />
      </ul>
      <p data-testid="instructions">
        { instructions }
      </p>
      {
        pathname.includes('progress') ? null : (
          <>
            <YoutubeEmbed youtubeLink={ youtubeLink } />
            <RecomendationsCarousel />
          </>
        )
      }
      <Button
        inProgress={ inProgress }
        pathname={ pathname }
        recipeId={ recipeId }
        setInProgress={ setInProgress }
        category="meals"
      />
    </div>
  );
}
