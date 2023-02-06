import require from 'clipboard-copy';
import { useState } from 'react';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import isFavoriteIcon from '../images/blackHeartIcon.svg';
import isNotFavoriteIcon from '../images/whiteHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Favoritesrecipes() {
  const [favRecipes] = useLocalStorage('favoriteRecipes');

  const [isCopied, setIsCopied] = useState(false);

  const findInFavorites = () => favRecipes.find((favRecipe) => favRecipe.id === id);

  const handleShare = () => {
    const copy = require('clipboard-copy');
    copy(window.location.href);
    setIsCopied(true);
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
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        favRecipes.map((recipe, i) => (
          <>
            <img
              src="#"
              alt="#"
              data-testid={ `${i}-horizontal-image` }
            />
            <p
              data-testid={ `${i}-horizontal-top-text"` }
            >
              Texto
            </p>
            <p
              data-testid={ `${i}-horizontal-top-name"` }
            >
              Name
            </p>
            <input
              type="image"
              src={ shareIcon }
              alt="share-btn"
              data-testid={ `${i}-horizontal-share-btn` }
              onClick={ handleShare }
            />
            { isCopied && <div>Link copied!</div> }
            <input
              type="image"
              src={ !findInFavorites() ? isNotFavoriteIcon : isFavoriteIcon }
              alt="favorite-btn"
              data-testid={ `${i}-horizontal-favorite-btn` }
              onClick={ handleFavorite }
            />
          </>
        ))
      }
    </div>
  );
}
