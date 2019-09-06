import React, { Component } from "react";
import {getArtistAlbums} from '../../apiCalls/apiCalls';
import './SearchForm.css';
import FavoritesContainer from '../FavoritesContainer/FavoritesContainer'

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
        artist: '',
        albums: [],
        error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit () {
    try {
        const albums = await getArtistAlbums(this.state.artist);
        this.setState({ albums });
      } catch ({ message }) {
        this.setState({ error: message });
      }
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Search for an Artist" name="artist" className='search' value={this.state.artist} onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Submit</button>
        {!!this.state.albums.length && <FavoritesContainer albums={this.state.albums}/>}
      </div>
    );
  }
}

export default SearchForm;