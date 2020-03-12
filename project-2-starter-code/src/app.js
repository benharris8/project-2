import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './styles/style.scss'
import Drinks from './components/Drinks'
import Search from './components/Search'




//internal 
import Home from './components/Home'
import NavBar from './components/NavBar'
import SingleDrink from './components/SingleDrink'
import SearchResults from './components/SearchResults'


const App = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/drinks" component={Drinks} />
      <Route exact path="/search" component={Search} />
      <Route path="/drink/:id" component={SingleDrink} />
      <Route exact path="/searchResults" component={SearchResults} />



    </Switch>
  </BrowserRouter>

)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)