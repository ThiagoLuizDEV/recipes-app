import require from 'clipboard-copy';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import YoutubeEmbed from '../Components/YoutubeEmbed';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';
import classes from './styles/RecipeInProgress.module.css';
import shareIcon from '../images/shareIcon.svg';
import isFavoriteIcon from '../images/blackHeartIcon.svg';
import isNotFavoriteIcon from '../images/whiteHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

function MealInProgress() {
  const [checkedState, setCheckedState] = useState([]);
  const [favRecipes, setFavRecipes] = useLocalStorage('favoriteRecipes', []);
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);
  const [isCopied, setIsCopied] = useState(false);
  const { fetchDetailsRecipe, detailedRecipe } = useContext(SearchRecipesContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const lastCharacter = -1;
  const pageName = pathname.split('/')[1];
  const nameForFav = pathname.split('/')[1].slice(0, lastCharacter);
  const recipeId = pathname.split('/')[2];
  const [wipRecipes, setWipRecipes] = useLocalStorage('inProgressRecipes');

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

  useEffect(() => {
    const callApi = async () => {
      await fetchDetailsRecipe(recipeId);
    };
    callApi();
  }, []);

  useEffect(() => {
    const ingredientsList = intoArray(detailedRecipe).map(
      (el) => [`${el[0]} --- ${el[1]}`, false],
    );
    if (wipRecipes === 'undefined') {
      setWipRecipes({
        ...wipRecipes,
        [pageName]: {
          [recipeId]: ingredientsList,
        },
      });
    }
    const ingredientStatus = ingredientsList.map((el) => el[1]);
    setCheckedState(ingredientStatus);
  }, [detailedRecipe]);

  const {
    idMeal: id,
    strArea: nationality,
    strMealThumb: thumbnail,
    strCategory: category,
    strMeal: title,
    strYoutube: youtubeLink,
    strInstructions: instructions,
    strTags: tags,
  } = detailedRecipe;

  const handleShare = () => {
    const copy = require('clipboard-copy');
    const link = window.location.href;
    const stringSlice = 12;
    const correctLink = link.substring(0, link.length - stringSlice);
    copy(correctLink);
    setIsCopied(true);
  };
  const findInFavorites = () => favRecipes.find((favRecipe) => favRecipe.id === id);
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
          type: nameForFav,
          nationality,
          category,
          alcoholicOrNot: '',
          name: title,
          image: thumbnail,
        },
      ]);
    }
  };

  const handleFinish = () => {
    setDoneRecipes(
      [...doneRecipes, {
        id,
        nationality,
        name: title,
        category,
        image: thumbnail,
        tags: tags?.split(',') ?? [],
        alcoholicOrNot: '',
        type: nameForFav,
        doneDate: new Date().toISOString(),
      }],
    );
    history.push('/done-recipes');
  };

  const handleCheck = (e, position) => {
    const updatedCheckedState = checkedState.map(
      (check, i) => (i === position ? !check : check),
    );
    setCheckedState(updatedCheckedState);
    const ingredientLabel = e.target.value;
    if (wipRecipes) {
      const updatedIngredientsList = wipRecipes[pageName][recipeId].map(
        (status) => {
          const [ingredient, isDone] = status;
          if (ingredient === ingredientLabel) {
            return [ingredient, !isDone];
          }
          return [ingredient, isDone];
        },
      );
      setWipRecipes({
        ...wipRecipes,
        [pageName]: {
          [recipeId]: updatedIngredientsList,
        },
      });
    } else {
      const ingredientsList = intoArray(detailedRecipe).map(
        (el) => [`${el[0]} --- ${el[1]}`, false],
      );
      const updatedList = ingredientsList.map((status) => {
        const [ingredient, isDone] = status;
        if (ingredient === ingredientLabel) {
          return [ingredient, !isDone];
        }
        return [ingredient, isDone];
      });
      setWipRecipes({
        [pageName]: {
          [recipeId]: updatedList,
        },
      });
    }
  };

  const returnChecks = (array, position) => array[position][1];
  const isChecked = (position) => {
    let result = [];
    if (typeof wipRecipes !== 'undefined') {
      result = wipRecipes[pageName][recipeId];
    }
    if (result.length > 1) {
      return returnChecks(result, position);
    }
    return checkedState[position];
  };
  const isAllChecked = (array) => array?.every((check) => check === true);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ thumbnail }
        style={ { width: 300 } }
        alt="#"
      />
      <h1 data-testid="recipe-title">{ title }</h1>
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
        src={ !findInFavorites() ? isNotFavoriteIcon : isFavoriteIcon }
        alt="favorite-btn"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
      />
      <h2 data-testid="recipe-category">{ category }</h2>
      <ul>
        {
          intoArray(detailedRecipe).map((el, i) => (
            <div key={ i }>
              <label
                data-testid={ `${i}-ingredient-step` }
                id={ `${i}-ingredient-step` }
                htmlFor={ `ingredient-checkbox-${i}` }
                className={ classes.instruction }
              >
                <input
                  onChange={ (e) => handleCheck(e, i) }
                  checked={ isChecked(i) }
                  type="checkbox"
                  id={ `ingredient-checkbox-${i}` }
                  value={ `${el[0]} --- ${el[1]}` }
                />
                {`${el[0]} --- ${el[1]}`}
              </label>
              <br />
            </div>
          ))
        }
      </ul>
      <p data-testid="instructions">{ instructions }</p>
      <YoutubeEmbed youtubeLink={ youtubeLink } />
      <button
        className="fixarBottun"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleFinish }
        disabled={ !isAllChecked(checkedState) }
      >
        Finish recipe
      </button>
    </div>
  );
}

export default withRouter(MealInProgress);
