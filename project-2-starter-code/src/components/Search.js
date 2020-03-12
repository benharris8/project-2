import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      searchName: null,
      ingredients: null,
      ingredient: null,
      isAlcoholic: false

    }
  }

  handleSubmit() {
    event.preventDefault()
    // axios.get
  }

  handleChange(event) {
    const { name, value } = event.target
    const state = { ...this.state, [name]: value } //uses the name of the field for the key of the state. Name here is referring to state key! 
    this.setState(state)
    this.SearchResultLink()

  }

  handleCheckboxChange(event) {
    this.setState({ isAlcoholic: event.target.checked })
  }

  SearchResultLink() {
    const { searchName, ingredient, isAlcoholic } = this.state
    let linkToFetch = 'https://www.thecocktaildb.com/api/json/v1/1/'
    const searchCheck = searchName === null
    const ingredientCheck = ingredient === null
    const alcoholicCheck = isAlcoholic === true

    //if alcholic box ticked
    if (searchCheck && ingredientCheck && alcoholicCheck) {//i want if they are both false
      linkToFetch += 'filter.php?a=Alcoholic'
      console.log(linkToFetch)
      return linkToFetch
    }

    //if user decides to use search field 
    if (!searchCheck && ingredientCheck && !alcoholicCheck) {
      linkToFetch += `search.php?s=${searchName}`
      console.log(linkToFetch)
      return linkToFetch
    }

    // if dropdown menu used 
    if (searchCheck && !ingredientCheck && !alcoholicCheck) {
      linkToFetch += `filter.php?i=${ingredient}`
      console.log(linkToFetch)
      return linkToFetch
    }
  }

  componentDidMount() {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then(res => {
        console.log(res)
        const array = res.data.drinks.sort((a, b) => (a.strIngredient1 > b.strIngredient1) ? 1 : -1)
        console.log(array)
        this.setState({ ingredients: array }) //res.data is an array of objects. each object is like this {strIngredient1: "Light rum"}
      })
      .catch(err => console.error(err))
  }

  render() {
    console.log(this.state)
    // console.log(this.state.ingredients) //to check that I succesfully set the ingredients
    if (!this.state.ingredients) return null
    return <section className="section">  <form
      className="form"
      onSubmit={(event) => this.handleSubmit(event)} //need to write a handleSubmit function that takes us to the search results component? 
    >
      {/* name of drink field  */}
      <div className="field">
        <label className="label"> Name of Drink </label>
        <div className="control">
          <input
            onChange={(event) => this.handleChange(event)}
            name="searchName"
            type="text"
            className="input"
            disabled={this.state.ingredient || this.state.isAlcoholic}
          />
        </div>
      </div>

      {/* name of ingredient field + ingredient dropdown */}
      <div className="field">
        <label className="label">Ingredient</label>
        <div className="control">
          <div className="select">
            <select
              onChange={(event) => this.handleChange(event)}
              name="ingredient"
              disabled={this.state.searchName || this.state.isAlcoholic}
            >
              <option value="">Select ingredient</option>
              {this.state.ingredients.map((ingredient, index) => {
                return <option key={index}> {ingredient.strIngredient1} </option>
              })}
            </select>
            {/* BUT WHERE TO STORE THE one the user chooses MAYBE A 'SELECTED INGREDIENT' in this.state */}
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              onChange={(event) => this.handleCheckboxChange(event)}
              type="checkbox"
              name="isAlcoholic"
              checked={this.state.isAlcoholic}
              disabled={this.state.searchName || this.state.ingredient}

            />
            Alcoholic ?
          </label>
        </div>
      </div>

      <div className="control">
        <Link
          to={{
            pathname: '/searchResults',
            url: this.SearchResultLink()
          }}
          className="button is-link">Search</Link>
      </div>
      <div className="control"></div>








    </form>
    </section>

  }

}

export default Search 