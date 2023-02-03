import Carousel from 'react-bootstrap/Carousel';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';

function RecomendationsCarousel() {
  const { recomendations } = useContext(SearchRecipesContext);
  const { pathname } = useLocation();

  const maxNumberCarousel = 6;
  const renderRecomendations = recomendations.slice(0, maxNumberCarousel);

  const key = pathname.includes('/meals') ? 'Drink' : 'Meal';

  return (
    <Carousel variant="dark" style={ { marginBottom: '80px' } }>
      {
        renderRecomendations.map((el, i) => (
          <Carousel.Item
            key={ i }
            data-testid={ `${i}-recommendation-card` }
          >
            <Carousel.Caption
              data-testid={ `${i}-recommendation-title` }
            >
              { el[`str${key}`] }
            </Carousel.Caption>
            <img
              width="150px"
              height="150px"
              src={ el[`str${key}Thumb`] }
              alt={ el[`str${key}`] }
            />
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
}

export default RecomendationsCarousel;
