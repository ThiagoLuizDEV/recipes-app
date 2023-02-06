import require from 'clipboard-copy';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';
import classes from './styles/RecipeInProgress.module.css';
import shareIcon from '../images/shareIcon.svg';
import isFavoriteIcon from '../images/blackHeartIcon.svg';
import isNotFavoriteIcon from '../images/whiteHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

export default function DrinkInProgress() {
  const [checkedState, setCheckedState] = useState([]);

  const [favRecipes, setFavRecipes] = useLocalStorage('favoriteRecipes', []);

  const [wipRecipes, setWipRecipes] = useLocalStorage('inProgressRecipes');

  const [isCopied, setIsCopied] = useState(false);

  const {
    fetchDetailsRecipe,
    detailedRecipe,
  } = useContext(SearchRecipesContext);

  const history = useHistory();

  const { pathname } = useLocation();

  const lastCharacter = -1;
  const pageName = pathname.split('/')[1].slice(0, lastCharacter);

  const recipeId = pathname.split('/')[2];

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

    setCheckedState(wipRecipes[pageName][recipeId].map((ingredient) => ingredient[1]));
  }, []);

  const {
    idDrink: id,
    strDrinkThumb: thumbnail,
    strCategory: category,
    strDrink: title,
    strAlcoholic: isAlcoholic,
    strInstructions: instructions,
  } = detailedRecipe;

  const handleShare = () => {
    const copy = require('clipboard-copy');
    copy(window.location.href);
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

  const handleFinish = () => {
    // TODO: salvar receita feita no localStorage - doneRecipes
    // [{
    //   id: id-da-receita,
    //   type: meal-ou-drink,
    //   nationality: nacionalidade-da-receita-ou-texto-vazio,
    //   category: categoria-da-receita-ou-texto-vazio,
    //   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    //   name: nome-da-receita,
    //   image: imagem-da-receita,
    //   doneDate: quando-a-receita-foi-concluida,
    //   tags: array-de-tags-da-receita-ou-array-vazio
    // }]
    history.push('/done-recipes');
  };

  const handleCheck = (e, position) => {
    const updatedCheckedState = checkedState.map(
      (check, i) => (i === position ? !check : check),
    );

    setCheckedState(updatedCheckedState);

    const ingredientLabel = e.target.value;

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
  };

  const isChecked = (position) => {
    const status = wipRecipes[pageName][recipeId][position];
    return status[1];
  };

  const isAllChecked = (array) => array.every((check) => check === true);

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
        src={ !findInFavorites() ? isNotFavoriteIcon : isFavoriteIcon }
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
      <p data-testid="instructions">
        { instructions }
      </p>
      { isAllChecked(checkedState) && (
        <button
          className="fixarBottun"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ handleFinish }
        >
          Finish recipe
        </button>
      ) }
    </div>
  );
}
