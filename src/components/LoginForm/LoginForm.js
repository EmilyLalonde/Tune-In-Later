import React, { Component } from 'react'
import './LoginForm.css';
import { loginUser } from '../../apiCalls/apiCalls';

class LoginForm extends Component {
  constructor() {
    super()
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

    loginUser(user)
  }

  render() {
    return (
      <form>
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