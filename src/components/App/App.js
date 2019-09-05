import React, { Component } from "react";
import { getAlbums } from "../../apiCalls/apiCalls.js";
import FavoritesContainer from "../FavoritesContainer/FavoritesContainer";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      error: ""
    };
  }
  async componentDidMount() {
    try {
      const albums = await getAlbums();
      this.setState({ albums });
    } catch ({ message }) {
      this.setState({ error: message });
    }
  }

  render() {
    // console.log('albums', this.state.albums)
    // console.log('art', this.state.albums.results)
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <FavoritesContainer albums={this.state.albums} />
        {/* {this.state.albums.length && <p>hey</p>}
        {this.state.albums.length && <img src={this.state.albums[0].artworkUrl60} alt=''/>} */}
      </div>
    );
  }
}

export default App;
