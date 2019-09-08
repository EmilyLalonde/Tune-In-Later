import React, { Component } from "react";
import {
  getAlbums,
  createUser,
  loginUser,
  addToFavorites,
  getFavorites,
  deleteFavorite
} from "../../apiCalls/apiCalls.js";
import { Route, NavLink, Redirect } from "react-router-dom";
import FavoritesContainer from "../FavoritesContainer/FavoritesContainer";
import WelcomeContainer from "../WelcomeContainer/WelcomeContainer";
import LoginForm from "../LoginForm/LoginForm";
import CreateUserForm from "../CreateUserForm/CreateUserForm";
import Nav from "../Nav/Nav";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      country: [],
      rock: [],
      pop: [],
      error: "",
      currentUser: null,
      favorites: [],
      isFavorited: false
    };
  }
  async componentDidMount() {
    try {
      const country = await getAlbums(1138);
      this.setState({ country });
    } catch ({ message }) {
      this.setState({ error: message });
    }

    try {
      const pop = await getAlbums(1151);
      this.setState({ pop });
    } catch ({ message }) {
      this.setState({ error: message });
    }

    try {
      const rock = await getAlbums(1071);
      this.setState({ rock });
    } catch ({ message }) {
      this.setState({ error: message });
    }
  }

  createTheUser = user => {
    createUser(user)
      .then(data => this.setState({ currentUser: data }))
      .catch(err => this.setState({ error: err.message }));
  };

  loginTheUser = user => {
    loginUser(user)
      .then(data => this.setState({ currentUser: data }))
      .then(() => getFavorites(this.state.currentUser))
      .then(allFavs => this.setState({ favorites: allFavs }))
      .catch(err => this.setState({ error: err.message }));
  };

  logoutUser = () => {
    this.setState({ 
      currentUser: null,
      favorites: [],
      error: "",
    });
  };

  handleFavorite = (e, albumData) => {
    console.log('handleFave Albumdata', albumData)
    !this.state.currentUser ? this.setState({ error: "You must sign in before favoriting" }) : this.setState({ error: "" });
    const albumIsFound = this.state.favorites.favorites.some(fave => fave.album_id === (albumData.collectionId || albumData.album_id))
    albumIsFound ? this.handleDelete(albumData) : this.handleAdd(albumData);
  }

  handleAdd = (albumData) => {
    console.log(albumData)
        const favorite = {
        album_id: albumData.collectionId,
        artist_name: albumData.artistName,
        album_name: albumData.collectionName,
        artwork_url: albumData.artworkUrl100,
        release_date: albumData.releaseDate,
        content_advisory_rating: albumData.collectionExplicitness || "N/A",
        primary_genre_name: albumData.primaryGenreName
      };
      addToFavorites(favorite, this.state.currentUser.id)
        .then(() => getFavorites(this.state.currentUser))
        .then(favs => this.setState({ favorites: favs }))
        .catch(err => this.setState({ error: err }));
  }

  handleDelete = async (albumData) => {
    try {
      await deleteFavorite((albumData.collectionId || albumData.album_id), this.state.currentUser.id);
      const remainingFaves = await getFavorites(this.state.currentUser)
      this.setState({favorites: remainingFaves})
    } catch({message}) {
      this.setState({error: message})
    }
  }

  // handleFavorite = (e, albumData) => {
  //   if (!this.state.currentUser) {
  //     this.setState({ error: "You must sign in before favoriting" });
  //   } else {
  //     this.setState({ error: "" });
  //   }
  //   const foundAlbum = this.state.favorites.favorites.find(favorite => {
  //     return favorite.collectionId === albumData.album_id;
  //   });
  //   //to deletefavorite found album should be in the favorites array, therefore, not undefined
  //   console.log('this is the found alubm', foundAlbum)
  //   if (foundAlbum !== undefined) {
  //     console.log('in if', foundAlbum)
  //     deleteFavorite(albumData.collectionId, this.state.currentUser.id)
  //     getFavorites(this.state.currentUser)
  //       // .then(greg => console.log('greg3', greg))
  //       .then(data => this.setState({favorites: data.favorites}))
  //       .catch(err => this.setState({ error: err }));
  //   } else {
  //     console.log('in else', foundAlbum)
  //     const favoritesIds = [];
  //     this.state.favorites.favorites.forEach(fave => favoritesIds.push(fave.album_id))
  //     //if the array does not have found albums id, this should be posted as a favorite
  //     if (!favoritesIds.includes(foundAlbum.album_id)) {
  //       console.log('in delete if')
  //     const favorite = {
  //       album_id: albumData.collectionId,
  //       artist_name: albumData.artistName,
  //       album_name: albumData.collectionName,
  //       artwork_url: albumData.artworkUrl100,
  //       release_date: albumData.releaseDate,
  //       content_advisory_rating: albumData.collectionExplicitness || "N/A",
  //       primary_genre_name: albumData.primaryGenreName
  //     };
  //     addToFavorites(favorite, this.state.currentUser.id)
  //       .then(() => getFavorites(this.state.currentUser))
  //       .then(favs => this.setState({ favorites: favs }))
  //       .catch(err => this.setState({ error: err }));
  //     }
  //   } 
  //   // else {
  //   //   console.log('in the delete if')
  //   // }
  // };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <Nav
          currentUser={this.state.currentUser}
          handleLogout={this.logoutUser}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <h2>Doo-Wop</h2>
              <WelcomeContainer
                albums={this.state.country}
                handleFavorite={this.handleFavorite}
                favorites={this.state.favorites}
              />
              <h2>Hair Metal</h2>
              <WelcomeContainer
                albums={this.state.pop}
                handleFavorite={this.handleFavorite}
                favorites={this.state.favorites}

              />
              <h2>Gangsta Rap</h2>
              <WelcomeContainer
                albums={this.state.rock}
                handleFavorite={this.handleFavorite}
                favorites={this.state.favorites}

              />
            </div>
          )}
        />
        {this.state.currentUser ? (
          <Redirect to="/" />
        ) : (
          <Route
            exact
            path="/login"
            render={() => <LoginForm loginTheUser={this.loginTheUser} />}
          />
        )}
        <Route
          exact
          path="/create-user"
          render={() => <CreateUserForm createTheUser={this.createTheUser} />}
        />
        <Route
          exact
          path="/favorites"
          render={() => (
            <FavoritesContainer
              favorites={this.state.favorites}
              handleFavorite={this.handleFavorite}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
