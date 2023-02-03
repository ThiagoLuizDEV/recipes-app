import React from 'react';
import Meals from './Meals';
import Drinks from './Drinks';
import RecipeInProgress from '../Components/RecipeInProgress';

export default function Recipes() {
  return (
    <div>
      <Meals />
      <Drinks />
      <RecipeInProgress />
    </div>
  );
}
