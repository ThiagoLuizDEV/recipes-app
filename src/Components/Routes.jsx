import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';
import Meals from '../Pages/Meals';
import Drink from '../Pages/Drinks';
import Donerecipes from '../Pages/Done-recipes';
import Favoritesrecipes from '../Pages/Favorites-recipes';
import DrinkDetails from '../Pages/DrinkDetails';
import MealDetails from '../Pages/MealDetails';
import { SearchRecipesContext } from '../context/SearchRecipesProvider';

function Routes() {
  const {
    id,
  } = useContext(SearchRecipesContext);

  return (
    <Route>
      <Switch>
        <Route component={ Login } path="/" exact />
        <Route component={ Profile } path="/profile" />
        <Route component={ Meals } exact path="/meals" />
        <Route component={ MealDetails } path={ `/meals/${id}` } />
        <Route component={ Meals } path="/meals/:id-da-receita/in-progress" />
        <Route component={ Donerecipes } path="/done-recipes" />
        <Route component={ Favoritesrecipes } path="/favorite-recipes" />
        <Route component={ Drink } exact path="/drinks" />
        <Route component={ DrinkDetails } path={ `/drinks/${id}` } />
        <Route component={ Drink } path="/drinks/:id-da-receita/in-progress" />
      </Switch>
    </Route>
  );
}

export default Routes;
