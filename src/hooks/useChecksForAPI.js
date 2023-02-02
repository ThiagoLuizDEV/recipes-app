import { useLocation } from 'react-router-dom';

export default function useChecksAPI() {
  const { pathname } = useLocation();

  const checkPathName = () => {
    switch (pathname) {
    case '/meals':
      return 'idMeal';
    case '/drinks':
      return 'idDrink';
    default:
      return null;
    }
  };

  const checkWebsite = () => {
    if (pathname.includes('/meals')) {
      return 'meal';
    }
    if (pathname.includes('/drinks')) {
      return 'cocktail';
    }
  };

  const checkWebsiteForRecomendations = () => {
    if (pathname.includes('/meals')) {
      return 'cocktail';
    }
    if (pathname.includes('/drinks')) {
      return 'meal';
    }
  };

  const checkSearchDataKey = () => {
    if (pathname.includes('/meals')) {
      return 'meals';
    }
    if (pathname.includes('/drinks')) {
      return 'drinks';
    }
  };

  const checkSearchType = (radio) => {
    switch (radio) {
    case 'name':
      return ['search', 's'];
    case 'firstLetter':
      return ['search', 'f'];
    case 'ingredient':
      return ['filter', 'i'];
    default:
      return null;
    }
  };

  return {
    checkPathName,
    checkWebsite,
    checkWebsiteForRecomendations,
    checkSearchDataKey,
    checkSearchType,
  };
}
