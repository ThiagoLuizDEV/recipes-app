import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import YoutubeEmbed from '../Components/YoutubeEmbed';
import RecomendationsCarousel from '../Components/RecomendationsCarousel';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';

export default function MealDetails() {
  const {
    fetchDetailsRecipe,
    detailedRecipe,
    fetchRecomendations,
  } = useContext(SearchRecipesContext);

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
    </div>
  );
}
