import React, { Component } from "react";
import { getAlbums } from "../../apiCalls/apiCalls.js";
import { Route, NavLink } from 'react-router-dom';
import FavoritesContainer from "../FavoritesContainer/FavoritesContainer";
import WelcomeContainer from "../WelcomeContainer/WelcomeContainer";
import LoginForm from '../LoginForm/LoginForm';
import Nav from '../Nav/Nav'
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      country: [],
      rock: [],
      pop: [],
      error: ""
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

  render() {
    return (
      <div>
          {this.state.error && <p>{this.state.error}</p>}
        <Route exact path='/' render={() => 
          <div>
            <Nav />
            <h2>Doo-Wop</h2>
            <WelcomeContainer albums={this.state.country} />
            <h2>Hair Metal</h2>
            <WelcomeContainer albums={this.state.pop} />
            <h2>Gangsta Rap</h2>
            <WelcomeContainer albums={this.state.rock} />
          </div>
        } />
        <Route exact path='/login' render={() => <LoginForm />} />
      </div>
    );
  }
}

export default App;
