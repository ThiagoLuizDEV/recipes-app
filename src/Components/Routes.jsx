import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';
import Meals from '../Pages/Meals';
import Drink from '../Pages/Drinks';
import Donerecipes from '../Pages/Done-recipes';
import Favoritesrecipes from '../Pages/Favorites-recipes';
import Recipes from '../Pages/Recipes';

function Routes() {
  return (
    <Route>
      <Switch>
        <Route component={ Login } path="/" exact />
        <Route component={ Profile } path="/profile" />
        <Route component={ Meals } path="/meals" />
        <Route component={ Meals } path="/meals/:id-da-receita" />
        <Route component={ Meals } path="/meals/:id-da-receita/in-progress" />
        <Route component={ Recipes } path="/recipes" />
        <Route component={ Donerecipes } path="/done-recipes" />
        <Route component={ Favoritesrecipes } path="/favorites-recipes" />
        <Route component={ Drink } path="/drinks" />
        <Route component={ Drink } path="/drinks/:id-da-receita/" />
        <Route component={ Drink } path="/drinks/:id-da-receita/in-progress" />
      </Switch>
    </Route>
  );
}

export default Routes;
