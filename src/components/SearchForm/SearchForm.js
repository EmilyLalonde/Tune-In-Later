import React, { Component } from "react";
import {getArtistAlbums} from '../../apiCalls/apiCalls';
import './SearchForm.css';
import WelcomeContainer from '../WelcomeContainer/WelcomeContainer'

class SearchForm extends Component {
  constructor(props) {
    super(props);
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
    this.setState({albums: []})
    this.setState({artist:''})
    try {
        const albums = await getArtistAlbums(this.state.artist);
        this.setState({ albums });
      } catch ({ message }) {
        this.setState({ error: message });
      }
  }

  render() {
    return (
      <section>
        <div className="search-bar">
          <input type="text" placeholder="Search for an Artist..." name="artist" className='search' value={this.state.artist} onChange={this.handleChange}/>
          <button className="search-button" onClick={this.handleSubmit}>Submit</button>
        </div>
        {!!this.state.albums.length && <h2 className="artist-h2">{this.state.artist}</h2>}
        {!!this.state.albums.length && <WelcomeContainer albums={this.state.albums} handleFavorite={this.props.handleFavorite}/>}
      </section>
    );
  }
}

export default SearchForm;