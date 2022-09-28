import './App.css';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CreateRecipes from './components/CreateRecipe/CreatedRecipe.jsx';
import Detail from './components/Details/Detail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/home/create-recipes' component={CreateRecipes} />
        <Route exact path='/home/recipes/:id' component={Detail}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
