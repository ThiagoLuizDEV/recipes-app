import React from 'react';
import { Route, Switch } from 'react-router-dom';

function Routes() {
  return (
    <Route>
      <Switch>
        <Route component={ Home } path="/" exact />
        <Route component={ Perfil } path="/profile" />
        <Route component={ Refeicoes } path="/refeições" />
        <Route component={ Refeicoes } path="/refeições/:id-da-receita" />
        <Route component={ Refeicoes } path="/refeições/:id-da-receita/in-progress" />
        <Route component={ Completo } path="/done-recipes" />
        <Route component={ Favoritas } path="/receitas-favoritas" />
        <Route component={ Drink } path="/drinks" />
        <Route component={ Drink } path="/drinks/:id-da-receita/" />
        <Route component={ Drink } path="/drinks/:id-da-receita/in-progress" />
      </Switch>
    </Route>
  );
}

export default Routes;
