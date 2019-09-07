import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleTyping = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginTheUser(user)
  }

  render() {
    return (
      <form>
        {this.props.error && <p>{this.props.error}</p>}
        <input
          type='text'
          name='email'
          placeholder='Please enter email address'
          value={this.state.email}
          onChange={this.handleTyping}
          className='formInput'
        />
        <input 
          type='text'
          name='password'
          placeholder='Please enter password'
          value={this.state.password}
          onChange={this.handleTyping}
          className='formInput'
        />
        <button
          onClick={this.handleSubmit}
        >SUBMIT</button>
      </form>
    )
  }
}

export default LoginForm;