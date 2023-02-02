import React, { useMemo, createContext, useState } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import useSearch from '../hooks/useSearch';
import useFetch from '../hooks/useFetch';
import useChecksAPI from '../hooks/useChecksForAPI';

export const SearchRecipesContext = createContext();

export default function SearchRecipesProvider({ children }) {
  const {
    search,
    radio,
    setRadio,
    setSearch,
  } = useSearch();

  const {
    fetchAPI,
  } = useFetch();

  const {
    checkPathName,
    checkWebsite,
    checkWebsiteForRecomendations,
    checkSearchDataKey,
    checkSearchRecomendationsDataKey,
    checkSearchType,
  } = useChecksAPI();

  const [searchArray, setSearchArray] = useState([]);

  const [id, setId] = useState('');

  const [detailedRecipe, setDetailedRecipe] = useState([]);

  const [recomendations, setRecomendations] = useState([]);

  const fetchSearchRecipes = async () => {
    const siteName = checkWebsite();
    const dataKey = checkSearchDataKey();
    const [type, definition] = checkSearchType(radio);

    const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/${type}.php?${definition}=${search}`;

    const data = await fetchAPI(endpoint);
    return data[dataKey];
  };

  const fetchDetailsRecipe = async (recipeId) => {
    const siteName = checkWebsite();
    const dataKey = checkSearchDataKey();

    const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    const data = await fetchAPI(endpoint);

    const [dataRecipe] = data[dataKey];
    setDetailedRecipe(dataRecipe);
  };

  const fetchRecomendations = async () => {
    const siteName = checkWebsiteForRecomendations();
    const dataKey = checkSearchRecomendationsDataKey();

    const endpoint = `https://www.the${siteName}db.com/api/json/v1/1/search.php?s=`;

    const data = await fetchAPI(endpoint);
    const recipesList = data[dataKey];

    setRecomendations(recipesList);
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
    fetchRecomendations,
    recomendations,
  }), [search, radio, searchArray, id, detailedRecipe, recomendations]);

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
