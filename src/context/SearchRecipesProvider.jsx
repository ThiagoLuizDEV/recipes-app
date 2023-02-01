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

  const checkPath = () => {
    if (pathname === '/meals') {
      // [siteName, dataKey]
      return ['meal', 'meals'];
    }
    if (pathname === '/drinks') {
      return ['cocktail', 'drinks'];
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

  const fetchRecipes = async () => {
    const [siteName, dataKey] = checkPath();
    const [type, definition] = checkSearchType();

    const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/${type}.php?${definition}=${search}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    return data[dataKey];
  };

  const memo = useMemo(() => ({
    fetchRecipes,
    search,
    radio,
    setRadio,
    setSearch,
    setSearchArray,
    searchArray,
  }), [search, radio, searchArray]);

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
