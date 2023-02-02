import React, { useMemo, createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { oneOfType, arrayOf, node } from 'prop-types';
import useSearch from '../hooks/useSearch';

export const SearchRecipesContext = createContext();

export default function SearchRecipesProvider({ children }) {
  const {
    search,
    radio,
    setRadio,
    setSearch,
  } = useSearch();

  const { pathname } = useLocation();

  const [searchArray, setSearchArray] = useState([]);

  const [id, setId] = useState('');

  const [detailedRecipe, setDetailedRecipe] = useState([]);

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

  const checkSearchDataKey = () => {
    if (pathname.includes('/meals')) {
      return 'meals';
    }
    if (pathname.includes('/drinks')) {
      return 'drinks';
    }
  };

  const checkSearchType = () => {
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

  const fetchSearchRecipes = async () => {
    const siteName = checkWebsite();
    const dataKey = checkSearchDataKey();
    const [type, definition] = checkSearchType();

    const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/${type}.php?${definition}=${search}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    return data[dataKey];
  };

  const fetchDetailsRecipe = async (recipeId) => {
    const siteName = checkWebsite();
    const dataKey = checkSearchDataKey();

    const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    const [dataRecipe] = data[dataKey];
    setDetailedRecipe(dataRecipe);
  };

  const memo = useMemo(() => ({
    fetchSearchRecipes,
    search,
    radio,
    setRadio,
    setSearch,
    setSearchArray,
    searchArray,
    checkPathName,
    setId,
    id,
    fetchDetailsRecipe,
    detailedRecipe,
  }), [search, radio, searchArray, id, detailedRecipe]);

  return (
    <SearchRecipesContext.Provider value={ memo }>
      { children }
    </SearchRecipesContext.Provider>
  );
}

SearchRecipesProvider.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};
