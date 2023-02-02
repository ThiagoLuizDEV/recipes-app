import React from 'react';
import Header from './Header';

export default function Donerecipes() {
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meal
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {/* <img data-testid="${index}-horizontal-image">
        $
        {image}
      </img>
      <h1 data-testid="${index}-horizontal-name">{name}</h1>
      <h2 data-testid="${index}-horizontal-top-text">
        $
        {nationality}
        {' '}
        - $
        {category}
      </h2> */}
      <button
        type="button"
        src="/images/shareIcon.svg"
      >
        ShareIcon
      </button>
    </div>
  );
}
