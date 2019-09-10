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
import { Route, Redirect } from "react-router-dom";
import FavoritesContainer from "../FavoritesContainer/FavoritesContainer";
import WelcomeContainer from "../WelcomeContainer/WelcomeContainer";
import LoginForm from "../LoginForm/LoginForm";
import CreateUserForm from "../CreateUserForm/CreateUserForm";
import Nav from "../Nav/Nav";
import "./App.css";
import SearchForm from "../SearchForm/SearchForm.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: [],
      rock: [],
      pop: [],
      britpop: [],
      searched: [],
      error: "",
      currentUser: null
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
      .then(response => getFavorites(response.user))
      .then(response => this.props.getTheFavorites(response.favorites))
      .catch(err => this.setState({ error: err.message }));
  };

  loginTheUser = user => {
    loginUser(user)
    .then(user => this.props.loginTheUser(user))
    .then(response => getFavorites(response.user))
    .then(response => this.props.getTheFavorites(response.favorites))
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
    console.log('handleFave albumdata', albumData)
    !this.props.currentUser ? this.setState({ error: "You must sign in before favoriting" }) : this.setState({ error: "" });
    const albumIsFound = this.props.favorites.some(fave => fave.album_id === (albumData.collectionId || albumData.album_id))
    albumIsFound ? this.handleDelete(albumData) : this.handleAdd(albumData);
  }

  handleAdd = (albumData) => {
    console.log('handleADD album data', albumData)
        const favorite = {
        album_id: albumData.collectionId,
        artist_name: albumData.artistName,
        album_name: albumData.collectionName,
        artwork_url: albumData.artworkUrl100,
        release_date: albumData.releaseDate,
        content_advisory_rating: albumData.collectionExplicitness || "N/A",
        primary_genre_name: albumData.primaryGenreName
      };
      addToFavorites(favorite, this.props.currentUser.id)
        .then(() => getFavorites(this.props.currentUser))
        .then(res => this.props.getTheFavorites(res.favorites))
        .catch(err => this.setState({ error: err }));
  }

  handleDelete = (albumData) => {
    deleteFavorite((albumData.collectionId || albumData.album_id), this.props.currentUser.id)
    .then(() => getFavorites(this.props.currentUser))
    .then(res => this.props.getTheFavorites(res.favorites))
    .catch(err => this.setState({ error: err }));
  }

  setSearched = () => {
    console.log('maybe')
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <Nav
          currentUser={this.props.currentUser}
          handleLogout={this.logoutUser}
          setSearched={this.setSearched}
        />
        <Route
          exact
          path="/"
          render={() => (
            <section>
              <div>
                <SearchForm handleFavorite={this.handleFavorite}/>
              </div>
              <div className="welcome-container">
                <h2 className="welcome-h2">Doo-Wop</h2>
                <WelcomeContainer
                  albums={this.state.country}
                  handleFavorite={this.handleFavorite}
                  favorites={this.props.favorites}
                />
                <h2 className="welcome-h2">Hair Metal</h2>
                <WelcomeContainer
                  albums={this.state.pop}
                  handleFavorite={this.handleFavorite}
                  favorites={this.props.favorites}

                />
                <h2 className="welcome-h2">Gangsta Rap</h2>
                <WelcomeContainer
                  albums={this.state.rock}
                  handleFavorite={this.handleFavorite}
                  favorites={this.props.favorites}

                />
                <h2 className="welcome-h2">Britpop</h2>
                <WelcomeContainer
                  albums={this.state.britpop}
                  handleFavorite={this.handleFavorite}
                  favorites={this.state.favorites}

                />
              </div>
            </section>
          )}
        />
        {this.props.currentUser ? (
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
              favorites={this.props.favorites}
              handleFavorite={this.handleFavorite}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  currentUser: state.currentUser,
  favorites: state.favorites,
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
