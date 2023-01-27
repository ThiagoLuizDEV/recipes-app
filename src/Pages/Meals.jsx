import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header';

export default function Meals() {
  const { mealsRecipeFetch, drinkRecipeFetch, mealsRecipe, drinkRecipe } = useContext();

  useEffect(() => {
    mealsRecipeFetch();
  }, [mealsRecipeFetch]);
  console.log(mealsRecipe);
  return (
    <div>
      <Header />
    </div>
  );
}
