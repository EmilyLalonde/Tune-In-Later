import React, { Component } from "react";
import "./CreateUserForm.css";
import PropTypes from 'prop-types'

class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    };
  }

  handleTyping = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    this.props.createTheUser(user) 
  }

  render() {
    console.log(this.props)
    return (
      <form className="create-user-form">
        {this.props.error && <p className="error">{this.props.error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Please enter your awesome name"
          value={this.state.name}
          onChange={this.handleTyping}
          className="formInput"
        />
        <input
          type="text"
          name="email"
          placeholder="Please enter email address"
          value={this.state.email}
          onChange={this.handleTyping}
          className="formInput"
        />
        <input
          type="text"
          name="password"
          placeholder="Please enter password"
          value={this.state.password}
          onChange={this.handleTyping}
          className="formInput"
        />
        <button className="create-user-button" onClick={this.handleSubmit}>SUBMIT</button>
      </form>
    );
  }
}

export default CreateUserForm;

CreateUserForm.propTypes = {
  createTheUser: PropTypes.func
}