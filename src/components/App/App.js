import React, { Component } from "react";
import {
  getAlbums,
  createUser,
  loginUser,
  addToFavorites,
  getFavorites,
  deleteFavorite
} from "../../apiCalls/apiCalls.js";
import {
  createTheUser,
  loginTheUser,
  logoutUser,
  handleAdd,
  getTheFavorites,
  handleDelete
} from '../../actions'
import { connect } from 'react-redux';
import { Route, NavLink, Redirect } from "react-router-dom";
import FavoritesContainer from "../FavoritesContainer/FavoritesContainer";
import WelcomeContainer from "../WelcomeContainer/WelcomeContainer";
import LoginForm from "../LoginForm/LoginForm";
import CreateUserForm from "../CreateUserForm/CreateUserForm";
import Nav from "../Nav/Nav";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: [],
      rock: [],
      pop: [],
      britpop: [],
      error: "",
      currentUser: null,
      favorites: [],
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

    try {
      const britpop = await getAlbums(1132);
      this.setState({ britpop });
    } catch ({ message }) {
      this.setState({ error: message });
    }
  }

  createTheUser = user => {
    createUser(user)
      .then(user => this.props.createTheUser(user))
      .then(() => this.props.getTheFavorites(this.state.currentUser))
      .catch(err => this.setState({ error: err.message }));
  };

  loginTheUser = user => {
    //async await?
    loginUser(user)
    .then(user => this.props.loginTheUser(user))
    .then(() => getFavorites(this.state.currentUser.id))
    .then(() => this.props.getTheFavorites(this.state.currentUser))
      // .then(allFavs => this.setState({ favorites: allFavs }))
      .catch(err => this.setState({ error: err.message }));
  };

  logoutUser = () => {
    this.setState({ 
      currentUser: null,
      favorites: [],
      error: "",
    });
  };

  handleFavorite = (albumData) => {
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

  render() {
    console.log(this.props)
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
            <div className="welcome-container">
              <h2 className="welcome-h2">Doo-Wop</h2>
              <WelcomeContainer
                albums={this.state.country}
                handleFavorite={this.handleFavorite}
                favorites={this.state.favorites}
              />
              <h2 className="welcome-h2">Hair Metal</h2>
              <WelcomeContainer
                albums={this.state.pop}
                handleFavorite={this.handleFavorite}
                favorites={this.state.favorites}

              />
              <h2 className="welcome-h2">Gangsta Rap</h2>
              <WelcomeContainer
                albums={this.state.rock}
                handleFavorite={this.handleFavorite}
                favorites={this.state.favorites}

              />
              <h2 className="welcome-h2">Britpop</h2>
              <WelcomeContainer
                albums={this.state.britpop}
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

const mapStateToProps = (state) => ({
  error: state.errorReducer,
  currentUser: state.currentUserReducer,
  favorites: state.favoriteReducer,
})

const mapDispatchToProps = (dispatch) => ({
  getTheFavorites: (user) => dispatch(getTheFavorites(user)),
  createTheUser: (user) => dispatch(createTheUser(user)),
  loginTheUser: (user) => dispatch(loginTheUser(user)),
  logoutUser: (user) => dispatch(logoutUser(user)),
  handleAdd: (albumData) => dispatch(handleAdd(albumData)),
  handleDelete: (albumData) => dispatch(handleDelete(albumData))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
