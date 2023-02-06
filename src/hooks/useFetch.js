import { useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchAPI = async (endpoint) => {
    setIsLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      return data;
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  return { fetchAPI, isLoading };
};

export default useFetch;
