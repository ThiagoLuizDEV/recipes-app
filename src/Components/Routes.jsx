import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';
import Meals from '../Pages/Meals';
import Drink from '../Pages/Drinks';
import Donerecipes from './Done-recipes';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import DrinkDetails from '../Pages/DrinkDetails';
import MealDetails from '../Pages/MealDetails';
import DrinkInProgress from '../Pages/DrinkInProgress';
import MealInProgress from '../Pages/MealInProgress';

function Routes() {
  return (
    <Switch>
      <Route component={ Login } path="/" exact />
      <Route component={ Profile } path="/profile" />
      <Route component={ Meals } exact path="/meals" />
      <Route component={ MealDetails } exact path="/meals/:id" />
      <Route component={ MealInProgress } path="/meals/:id/in-progress" />
      <Route component={ Donerecipes } path="/done-recipes" />
      <Route component={ FavoriteRecipes } path="/favorite-recipes" />
      <Route component={ Drink } exact path="/drinks" />
      <Route component={ DrinkDetails } exact path="/drinks/:id" />
      <Route component={ DrinkInProgress } path="/drinks/:id/in-progress" />
    </Switch>
  );
}

export default withRouter(Routes);
