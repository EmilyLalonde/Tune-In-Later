import React, { Component } from 'react';
import '../FilterForm/FilterForm.css';

class FilterForm extends Component {
  constructor(props) {
    super(props)
  }

    render() {
      return (
        <form>
          <input id="all" type="radio" name="genre" value="all" onChange={() => this.props.filterByGenre('all')}/>
          <label for="all">All Favorites</label>
          <input id="rock" type="radio" name="genre" value="rock" onChange={() => this.props.filterByGenre('Rock')}/>
          <label for="rock">Rock</label>
          <input id="country" type="radio" name="genre" value="country" onChange={() => this.props.filterByGenre('Country')}/>
          <label for="country">Country</label>
          <input id="hip-hop" type="radio" name="genre" value="hip-hop" onChange={() => this.props.filterByGenre('Hip-Hop/Rap')}/>
          <label for="hip-hop">Hip-Hop/Rap</label>
        </form>
      )
    }
  }

export default FilterForm;