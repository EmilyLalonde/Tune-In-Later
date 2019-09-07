import React, { Component } from "react";
import { getAlbums, createUser, loginUser } from "../../apiCalls/apiCalls.js";
import { Route, NavLink, Redirect } from 'react-router-dom';
import FavoritesContainer from "../FavoritesContainer/FavoritesContainer";
import WelcomeContainer from "../WelcomeContainer/WelcomeContainer";
import LoginForm from '../LoginForm/LoginForm';
import CreateUserForm from '../CreateUserForm/CreateUserForm'
import Nav from '../Nav/Nav'
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
      favorites: [{artistName:'blah' , releaseDate: 'blah',  collectionName: 'blah', artworkUrl100: 'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/98/b4/f8/98b4f834-1b2d-e5a9-fe3d-ce9ef8fa0114/source/100x100bb.jpg'}]
    };
  }
  async componentDidMount() {
    try {
      const country = await getAlbums(1138);
      this.setState({ country });
    } catch ({ message }) {
      this.setState({ error: message });
    }

    try {const pop = await getAlbums(1151);
    this.setState({ pop });
    } catch ({ message }) {
      this.setState({ error: message})
    }

    try {const rock = await getAlbums(1071);
      this.setState({ rock });
      } catch ({ message }) {
        this.setState({ error: message})
      }
  }

  createTheUser = (user) => {
    createUser(user)
    .then(data => this.setState({currentUser: data}))
    .catch(err => this.setState({error: err.message}))
  }

  loginTheUser = (user) => {
    loginUser(user)
    .then(data => this.setState({currentUser: data}))
    .catch(err => this.setState({error: err.message}))
  }

  logoutUser = () => {
    this.setState({currentUser: null});
    console.log(this.state.currentUser)
  }

  handleFavorite = () => {
    if(!this.state.currentUser) {
      this.setState({error: 'You must sign in before favoriting'})
    } else {
      this.setState({error: ''})
    }

  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <Nav currentUser={this.state.currentUser} handleLogout={this.logoutUser}/>
        <Route exact path='/' render={() => 
          <div>
            <h2>Doo-Wop</h2>
            <WelcomeContainer albums={this.state.country} handleFavorite={this.handleFavorite} />
            <h2>Hair Metal</h2>
            <WelcomeContainer albums={this.state.pop} handleFavorite={this.handleFavorite} />
            <h2>Gangsta Rap</h2>
            <WelcomeContainer albums={this.state.rock} handleFavorite={this.handleFavorite} />
          </div>
        }/>
        {this.state.currentUser ? <Redirect  to='/'/> : <Route exact path='/login' render={() => <LoginForm loginTheUser={this.loginTheUser}/>} />}
        <Route exact path='/create-user' render={() => <CreateUserForm createTheUser={this.createTheUser}/>} />
        <Route exact path='/favorites' render={() => <FavoritesContainer favorites={this.state.favorites} handleFavorite={this.handleFavorite} />} /> 
      </div>
    );
  }
}

export default App;
