import require from 'clipboard-copy';
import { useState } from 'react';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import isFavoriteIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Favoritesrecipes() {
  const [favRecipes, setFavRecipes] = useLocalStorage('favoriteRecipes');

  const [isCopied, setIsCopied] = useState(false);

  const [filter, setFilter] = useState('all');

  const findInFavorites = (id) => favRecipes.find((favRecipe) => favRecipe.id === id);

  const handleShare = ({ target }) => {
    const copy = require('clipboard-copy');
    const link = window.location.href;
    const stringSlice = 16;
    const cleanLink = link.substring(0, link.length - stringSlice);
    const correctLink = `${cleanLink}${target.value}`;
    copy(correctLink);
    setIsCopied(true);
  };

  const handleFavorite = (e) => {
    e.preventDefault();

    const id = e.target.value;
    const duplicateFav = findInFavorites(id);

    if (duplicateFav) {
      const newFavRecipes = favRecipes.filter((favRecipe) => favRecipe.id !== id);

      setFavRecipes(newFavRecipes);
    }
  };

  const mealOrDrink = (recipe) => {
    if (recipe.type === 'meal') {
      return `${recipe.nationality} - ${recipe.category}`;
    }
    return `${recipe.alcoholicOrNot} - ${recipe.category}`;
  };

  const recipesToRender = () => {
    switch (filter) {
    case 'meal':
      return favRecipes?.filter((recipe) => recipe.type === 'meal');
    case 'drink':
      return favRecipes?.filter((recipe) => recipe.type === 'drink');
    default:
      return favRecipes;
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const { value } = e.target;

    setFilter(value);
  };

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ (e) => handleFilter(e) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ (e) => handleFilter(e) }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ (e) => handleFilter(e) }
      >
        Drinks
      </button>
      {
        recipesToRender()?.map((recipe, i) => (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${i}-horizontal-image` }
              style={ { width: 300 } }
            />
            <h1
              data-testid={ `${i}-horizontal-name` }
            >
              { recipe.name }
            </h1>
            <h2
              data-testid={ `${i}-horizontal-top-text` }
            >
              { mealOrDrink(recipe) }
            </h2>
            <input
              type="image"
              src={ shareIcon }
              alt="share-btn"
              data-testid={ `${i}-horizontal-share-btn` }
              value={ `${recipe.type}s/${recipe.id}` }
              onClick={ (e) => handleShare(e) }
            />
            { isCopied && <div>Link copied!</div> }
            <input
              type="image"
              src={ isFavoriteIcon }
              alt="favorite-btn"
              data-testid={ `${i}-horizontal-favorite-btn` }
              value={ recipe.id }
              onClick={ (e) => handleFavorite(e) }
            />
          </div>
        ))
      }
    </div>
  );
}
